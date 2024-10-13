import { Alert, IconButton, TextField } from "@mui/material";
import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";
import { chatAPI } from "../../../../services/ChatSirvice";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { chatSlice } from "../../../../store/reducers/ChatsSlice";
import { ChangeEvent } from "react";
import { IMessage } from "../../../../models/IMessage";

const BarInput = () => {
  const sendMessege = async (chatId: number, messageContent: string) => {
    try {
      const message: IMessage = {
        chatId: chatId,
        content: messageContent,
        image: null,
      };
      const res = await newMsg(message);
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

  return (
    <Container>
      {error && <Alert severity="error">{}</Alert>}
      <StyledTextField
        id="filled-search"
        label="Enter message"
        type="search"
        variant="filled"
        value={messege}
        onChange={(e) => dispatch(setMessage(e.target.value))}
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
    color: #ffffff; /* Цвет label при фокусе */
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
