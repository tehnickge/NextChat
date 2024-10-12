import styled from "styled-components";
import { chatAPI } from "../../../../services/ChatSirvice";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { CircularProgress } from "@mui/material";
import Message from "../Message/Messege";

const Field = () => {
  const dispatch = useAppDispatch();
  const { selectedChat } = useAppSelector((state) => state.chatsReducer);
  const {
    data: messagesData,
    error,
    isLoading,
  } = chatAPI.useGetChatQuery(selectedChat || 0, {
    pollingInterval: 1000,
  });

  const { data: userId } = chatAPI.useGetYourIdQuery(null);

  return (
    <Container>
      {isLoading && <CircularProgress color="secondary" />}

      {error && <CircularProgress color="secondary" />}
      {messagesData &&
        messagesData.length > 0 &&
        messagesData.map((msg) => (
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
