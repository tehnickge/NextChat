import { Button, ButtonGroup } from "@mui/material";
import styled from "styled-components";
import { chatAPI } from "../../../../services/ChatSirvice";
import { modalNewChatSlice } from "../../../../store/reducers/ModalNewChatSlice";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";

const MenuBar = () => {
  const [createChat, { error, isSuccess, data: newChatData }] =
    chatAPI.useCreateNewChatOfUserMutation();

  const { open: setOpen } = modalNewChatSlice.actions;
  const { open } = useAppSelector((state) => state.newChatModalReducer);
  const dispatch = useAppDispatch();
  const addNewChat = () => dispatch(setOpen());
  return (
    <StyledButtonGroup variant="text" aria-label="Basic button group">
      <StyledButton>profile</StyledButton>
      <StyledButton>about</StyledButton>
      <StyledButton onClick={addNewChat}>+</StyledButton>
    </StyledButtonGroup>
  );
};

const StyledButtonGroup = styled(ButtonGroup)`
  display: flex;
  justify-content: flex-end; /* Выравнивание по правому краю */
  margin-right: 100px; /* Отступы, при необходимости */
  height: 60px;
`;

const StyledButton = styled(Button)``;
export default MenuBar;
