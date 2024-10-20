import styled from "styled-components";
import { chatAPI } from "../../../../services/ChatSirvice";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { CircularProgress } from "@mui/material";
import Message from "../Message/Messege";
import { currentChatSlice } from "../../../../store/reducers/CurrentChatSlice";
import { useEffect } from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io";

interface FieldProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

const Field = ({ socket }: FieldProps) => {
  const dispatch = useAppDispatch();
  const { selectedChat } = useAppSelector((state) => state.chatsReducer);
  const {
    refetch,
    data: messagesData,
    error,
    isLoading,
  } = chatAPI.useGetChatQuery(selectedChat || 0);

  const { data: userId } = chatAPI.useGetYourIdQuery(null);
  const { appendMessage, setMessages } = currentChatSlice.actions;
  const { messages } = useAppSelector((state) => state.currentChatReducer);

  useEffect(() => {
    if (messagesData) dispatch(setMessages(messagesData));
  }, [messagesData]);

  useEffect(() => {
    const handleReceiveMessage = (data: any) => {
      dispatch(appendMessage(data));
    };

    socket.on("receive_message", handleReceiveMessage);

    // Возвращаем функцию для удаления предыдущего слушателя при размонтировании компонента или перед новым вызовом
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket]);

  return (
    <Container>
      {isLoading && <CircularProgress color="secondary" />}
      {error && <CircularProgress color="secondary" />}
      {messages &&
        messages.length > 0 &&
        messages.map((msg) => (
          <Message
            key={msg.id}
            username={msg.sender.username}
            avatarImage={msg.sender.photo}
            isSender={(userId === msg.sender.id ? true : false) || false}
            messege={msg.content}
            timestamp={msg.createdAt}
          />
        ))}
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

export default Field;
