import { Container, Grid2, List } from "@mui/material";
import styled from "styled-components";
import BarInput from "./components/BarInput/BarInput";
import Field from "./components/Field/Field";

import { DefaultEventsMap } from "socket.io";
import { Socket } from "socket.io-client";

interface ChatProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

const Chat = ({ socket }: ChatProps) => {
  // useEffect(() => {
  //   socket.emit("get-chat", selectedChat);
  // }, [socket]);

  // useEffect(() => {
  //   setMsgInChat(messagesData);
  // }, [messagesData]);

  return (
    <StyledContainer>
      <StyledFieldContainer>
        <Field socket={socket}></Field>
      </StyledFieldContainer>
      <StyledBarInputContainer>
        <BarInput socket={socket}></BarInput>
      </StyledBarInputContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled(Grid2)`
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden; /* Отключаем прокрутку на уровне контейнера */
`;
const StyledFieldContainer = styled(Grid2)`
  flex-grow: 1; /* Растягиваем по высоте */
  padding: 0;
  margin: 0;
  width: 100%;
  overflow-y: auto; /* Добавляем прокрутку, если нужно */
  box-sizing: border-box;
`;
const StyledBarInputContainer = styled(Grid2)`
  height: 60px; /* Фиксированная высота */
  width: 100%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
`;
export default Chat;
