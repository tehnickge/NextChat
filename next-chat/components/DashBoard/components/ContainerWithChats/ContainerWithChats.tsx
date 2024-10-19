import styled from "styled-components";
import { chatAPI } from "../../../../services/ChatSirvice";
import { Alert, CircularProgress, List, Typography } from "@mui/material";
import DashboardChats from "../chats/DashboardChats";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { chatSlice } from "../../../../store/reducers/ChatsSlice";
import { ChatsWithLastMessage } from "../../../../models/ChatsWithLastMessage";
import { useEffect } from "react";
import { dashboardSlice } from "../../../../store/reducers/DashboardSlice";

import React from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io";

interface ContainerWithCatsProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

const ContainerWithChats: React.FC<ContainerWithCatsProps> = ({ socket }) => {
  const {
    data: chats,
    error,
    isLoading,
    refetch,
  } = chatAPI.useGetChatsWithLastMessageQuery(null);

  useEffect(() => {
    refetch();
  }, [socket]);

  const dispatch = useAppDispatch();
  const { selectedChat, userWhoSandLasMessage, lastMessegeInchat } =
    useAppSelector((state) => state.chatsReducer);

  const { setLastMessegeSet, setSelectedChat, setUserWhoSandLasMessage } =
    chatSlice.actions;

  const hendlerChatSelect = (chat: ChatsWithLastMessage) => {
    dispatch(setSelectedChat(chat.id));
    if (chat.messages.length > 0 && chat.messages[0].sender) {
      dispatch(setLastMessegeSet(chat.messages[0].content || "1"));
      dispatch(
        setUserWhoSandLasMessage(chat.messages[0].sender.username || "1")
      );
    } else {
      dispatch(setLastMessegeSet(""));
      dispatch(setUserWhoSandLasMessage(""));
    }
  };

  return (
    <StyledList>
      {error && <Typography>ошибка</Typography>}
      {isLoading && <CircularProgress color="secondary" />}
      {chats &&
        chats.map((chat) => (
          <DashboardChats
            key={chat.id}
            chat={chat}
            onClick={() => {
              hendlerChatSelect(chat);
            }}
          ></DashboardChats>
        ))}
      {chats && chats?.length < 1 && (
        <StyledAlert severity="info">созданйте ваш первый чат</StyledAlert>
      )}
    </StyledList>
  );
};

const StyledList = styled(List)`
  padding: 0;
  margin: 0;
  flex: 1; /* Занимает оставшееся пространство */
  background-color: ${({ theme }) => theme.colors.backgroundDatk};
  * {
    transition: 0.4s;
    background-color: ${({ theme }) => theme.colors.backgroundDatk};
  }
  overflow-y: auto;
`;

const StyledAlert = styled(Alert)`
  display: flex;
  justify-content: center; /* Центрирует содержимое */
  margin-right: 100px;
`;

export default ContainerWithChats;
