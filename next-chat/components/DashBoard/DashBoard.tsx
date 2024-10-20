"use client";
import styled from "styled-components";
import MenuBar from "./components/menuBar/MenuBar";
import CreateChatDialog from "./components/createChatDialog/createChatDialog";
import React, { useEffect } from "react";
import ContainerWithChats from "./components/ContainerWithChats/ContainerWithChats";
import { chatAPI } from "../../services/ChatSirvice";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io";

interface DashBoardPros {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

const DashBoard = ({ socket }: DashBoardPros) => {
  return (
    <Container>
      <ContainerWithChats socket={socket}></ContainerWithChats>
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
