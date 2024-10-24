import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { chatAPI } from "../../../../services/ChatSirvice";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { CircularProgress } from "@mui/material";
import Message from "../Message/Messege";
import { currentChatSlice } from "../../../../store/reducers/CurrentChatSlice";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io";

interface FieldProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

const Field = ({ socket }: FieldProps) => {
  const dispatch = useAppDispatch();
  const { selectedChat } = useAppSelector((state) => state.chatsReducer);
  const { appendMessage, prependMessages, setMessages } =
    currentChatSlice.actions;
  const { messages } = useAppSelector((state) => state.currentChatReducer);

  const [skip, setSkip] = useState(0); // Счетчик для пропуска сообщений
  const [loadingMore, setLoadingMore] = useState(false); // Флаг загрузки

  useEffect(() => {
    setSkip(0);
    setLoadingMore(false);
    dispatch(setMessages([]));
  }, [selectedChat]);

  // Загружаем по 50 сообщений за раз
  const {
    refetch,
    data: messagesData,
    error,
    isLoading,
  } = chatAPI.useGetChatQuery(
    { id: selectedChat || 0, take: 10, skip }, // берем по 50 сообщений
    { skip: !selectedChat }
  );

  const { data: usersInChat } = chatAPI.useGetAllUsersInChatQuery(
    selectedChat || 0
  );

  const { data: userId } = chatAPI.useGetYourIdQuery(null);

  // Рефы для контейнера сообщений
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Функция для прокрутки к последнему сообщению
  const scrollToBottom = (smooth = true) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
      });
    }
  };

  // Загрузка сообщений при изменении данных
  useEffect(() => {
    if (messagesData) {
      if (skip === 0) {
        // Первая загрузка (добавляем в конец)
        dispatch(prependMessages(messagesData));
        scrollToBottom(true); // Прокрутка вниз при первой загрузке без анимации
      } else {
        // Пагинация - добавляем новые сообщения сверху
        dispatch(prependMessages(messagesData));
      }
      setLoadingMore(false);
    }
  }, [messagesData]);

  // Подгрузка сообщений по скроллу вверх
  const handleScroll = () => {
    const scrollTop = scrollContainerRef.current?.scrollTop;

    if (scrollTop === 0 && !loadingMore) {
      setLoadingMore(true);
      setSkip(skip + 10); // Увеличиваем `skip` для следующей подгрузки
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [loadingMore]);

  useEffect(() => {
    const handleReceiveMessage = (data: any) => {
      dispatch(appendMessage(data));
      scrollToBottom(true); // Прокрутка вниз при получении нового сообщения
    };

    socket.on("receive_message", handleReceiveMessage);
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket]);

  const findAvatarUser = (idUser: number) => {
    if (usersInChat && usersInChat?.length > 0) {
      return usersInChat.find((user) => user.id === idUser)?.photo;
    }
    return null;
  };
  return (
    <Container ref={scrollContainerRef}>
      {isLoading && <StyledCircularProgress color="secondary" />}
      {error && <StyledCircularProgress color="secondary" />}
      {loadingMore && <StyledCircularProgress color="primary" />}
      {messages &&
        messages.length > 0 &&
        messages.map((msg) => (
          <Message
            key={msg.id}
            username={msg.sender.username}
            avatarImage={findAvatarUser(msg.sender.id) || null}
            isSender={userId === msg.sender.id}
            messege={msg.content}
            timestamp={msg.createdAt}
          />
        ))}
      <div ref={messagesEndRef}></div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
`;
const StyledCircularProgress = styled(CircularProgress)`
  position: relative;
  justify-content: center;
  text-align: center;
  align-items: center;
  width: 100%;
`;

export default Field;
