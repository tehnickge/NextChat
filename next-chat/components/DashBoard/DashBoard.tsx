import { CircularProgress, List, Typography } from "@mui/material";
import styled from "styled-components";
import DashboardChats from "./components/chats/DashboardChats";
import { useEffect, useState } from "react";
import { IChat } from "../../models/IChat";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { chatSlice } from "../../store/reducers/ChatsSlice";
import { fetchChats } from "../../store/reducers/ActionCreators";

const DashBoard = () => {
  const { chats, isLoading, error } = useAppSelector(
    (state) => state.chatsReducer
  );
  const { setChats } = chatSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchChats())
  }, []);
  return (
    <StyledList>
      {error.length > 1 && <Typography>{error}</Typography>}
      {isLoading && <CircularProgress color="secondary" />}
      {chats &&
        chats.map((chat) => (
          <DashboardChats key={chat.id} chat={chat}></DashboardChats>
        ))}
    </StyledList>
  );
};

const StyledList = styled(List)`
  padding: 0;
  margin: 0;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.backgroundDatk};
  * {
    transition: 0.4s;
    background-color: ${({ theme }) => theme.colors.backgroundDatk};
  }
  overflow-y: auto;
`;

export default DashBoard;
