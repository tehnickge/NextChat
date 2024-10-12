import {
  Alert,
  CircularProgress,
  List,
  modalClasses,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import DashboardChats from "./components/chats/DashboardChats";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { chatAPI } from "../../services/ChatSirvice";
import MenuBar from "./components/menuBar/MenuBar";
import CreateChatDialog from "./components/createChatDialog/createChatDialog";
import React from "react";
import ContainerWithChats from "./components/ContainerWithChats/ContainerWithChats";

const DashBoard = () => {
  const dispatch = useAppDispatch();

  return (
    <Container>
      <ContainerWithChats></ContainerWithChats>
      <MenuBarStyled />
      <CreateChatDialog />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* Занимает всю высоту окна */
`;

const MenuBarStyled = styled(MenuBar)`
  height: 60px;
`;

export default DashBoard;
