"use client";

import styled, { ThemeProvider } from "styled-components";
import { Grid2 } from "@mui/material";
import DashBoard from "../../components/DashBoard/DashBoard";
import Chat from "../../components/Chat/Chat";
import { chatAPI } from "../../services/ChatSirvice";
import socket from "../../utils/socket";
import { useEffect } from "react";

export default function Home() {
  const { data } = chatAPI.useGetYourIdQuery(null);

  useEffect(() => {
    localStorage.debug = "*";
    socket.on("connect", () => {
      console.log("Connected to Socket.io server", socket.id);
    });
    if (data) {
      socket.emit("join_your_chats", data);
    }
    }, [data]);
  return (
    <Main>
      <StyledGrid2 container>
        <StyledGrid2 size={3}>
          <DashBoard socket={socket}></DashBoard>
        </StyledGrid2>
        <StyledGrid2 size={9}>
          <Chat socket={socket}></Chat>
        </StyledGrid2>
      </StyledGrid2>
    </Main>
  );
}

const StyledGrid2 = styled(Grid2)`
  padding: 0;
  margin: 0;
  height: 100vh;
`;
const Main = styled.div`
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
`;
