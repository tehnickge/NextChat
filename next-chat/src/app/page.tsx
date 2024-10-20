"use client";

import styled, { ThemeProvider } from "styled-components";
import { Grid2 } from "@mui/material";
import DashBoard from "../../components/DashBoard/DashBoard";
import Chat from "../../components/Chat/Chat";
import { chatAPI } from "../../services/ChatSirvice";
import socket from "../../utils/socket";
import { useEffect, useState } from "react";

export default function Home() {
  const [isConnect, setIsConnect] = useState<boolean>(false);
  const { data } = chatAPI.useGetYourIdQuery(null);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnect(true);
    });
    socket.on("socket", () => {});
    if (data) {
      socket.emit("join_your_chats", data);
    }
    socket.on("disconnect", () => {
      setIsConnect(false);
    });

    return () => {
      socket.off("connect", () => {
        console.log("disconnect");
      });
      socket.off("disconnect", () => {
        console.log("disconnect");
      });
    };
  }, [data]);
  return (
    <Main>
      <DevData>data:{isConnect ? "connect" : "unconnect"}</DevData>
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

const DevData = styled.div`
  background: linear-gradient(to right, #a54b0f7f, #69088661, #3314a536);
  text-align: center;
  width: 100%;
  z-index: 100;
  color: red;
  position: absolute;
  margin: 0 auto;
  padding: 0;
  display: block;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  align-content: center;
  justify-items: center;
`;
