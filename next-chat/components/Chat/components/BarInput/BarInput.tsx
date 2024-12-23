import { Alert, IconButton, TextField } from "@mui/material";
import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";
import { chatAPI } from "../../../../services/ChatSirvice";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { chatSlice } from "../../../../store/reducers/ChatsSlice";
import { ChangeEvent, useEffect } from "react";
import { IMessage } from "../../../../models/IMessage";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io";

interface BarInputProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}
const BarInput = ({ socket }: BarInputProps) => {
  const sendMessege = async (chatId: number, messageContent: string) => {
    try {
      const message: IMessage = {
        chatId: chatId,
        content: messageContent,
        image: null,
      };
      const res = await newMsg(message);
      socket.emit("send_message_chat", res.data);
      return res.data;
    } catch (e) {
      return e;
    }
  };

  const [newMsg, { error, isLoading, isSuccess }] =
    chatAPI.useSendMessageMutation();

  const { setMessage } = chatSlice.actions;
  const { selectedChat, messege } = useAppSelector(
    (state) => state.chatsReducer
  );

  const dispatch = useAppDispatch();

  const handlerSendMessage = () => {
    if (selectedChat && messege) {
      sendMessege(selectedChat, messege);
    }

    dispatch(setMessage(""));
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handlerSendMessage();
    }
  };

  return (
    <Container>
      {error && <Alert severity="error">{}</Alert>}
      <StyledTextField
        id="filled-search"
        label="Enter message"
        type="search"
        variant="filled"
        value={messege || ""}
        onChange={(e) => dispatch(setMessage(e.target.value))}
        onKeyDown={handleKeyDown}
      />
      <input type="file"></input>
      <StyledIconButton disableRipple onClick={handlerSendMessage}>
        <SendIcon />
      </StyledIconButton>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.background};
`;
const StyledTextField = styled(TextField)`
  flex-grow: 1; /* Растягиваем по ширине */
  margin-right: 10px; /* Отступ между TextField и кнопкой */

  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: #ffffff; /* Цвет рамки */
    }
    &:hover fieldset {
      border-color: #ffffff; /* Цвет рамки при наведении */
    }
    &.Mui-focused fieldset {
      border-color: #ffffff; /* Цвет рамки при фокусе */
    }
  }

  & .MuiInputLabel-root {
    color: #ffffff; /* Цвет label */
  }

  & .MuiInputLabel-root.Mui-focused {
    color: rgba(53, 53, 53, 0); /* Цвет label при фокусе */
  }

  /* Стиль для текста ввода */
  & .MuiInputBase-input {
    color: #ffffff; /* Цвет текста */
    font-size: 16px; /* Размер текста */
    padding: 10px; /* Внутренние отступы */
  }

  /* Дополнительно: Placeholder (подсказка внутри поля) */
  & .MuiInputBase-input::placeholder {
    color: #cccccc; /* Цвет текста placeholder */
    opacity: 1; /* Для некоторых браузеров, чтобы placeholder был видимым */
  }
`;

const StyledIconButton = styled(IconButton)`
  justify-content: center;
  align-items: center;
  align-items: center;
  padding: 0px 20px;
  background-color: #4c00ff; /* Цвет кнопки */
  color: white; /* Цвет иконки */
  &:hover {
    background-color: #1100ff; /* Цвет при наведении */
  }
  * {
    background-color: #4400ff;
  }
`;

export default BarInput;
