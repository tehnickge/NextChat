import * as React from "react";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { modalNewChatSlice } from "../../../../store/reducers/ModalNewChatSlice";
import { chatAPI } from "../../../../services/ChatSirvice";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  TextField,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import { IChat } from "../../../../models/IChat";

export default function CreateChatDialog() {
  const CreateNewChatAndAddUsers = async ({
    chat,
    users,
  }: {
    users: number[];
    chat: IChat;
  }) => {
    try {
      const { data: newChat } = await createChat(chat);
      if (!newChat) {
        return "error";
      }

      for (const id of users) {
        if (newChat && newChat.id) {
          const userAdded = await addUser({
            user: { id: id },
            chat: { id: newChat.id, isGroup: newChat.isGroup },
          });
        }
      }
      dispatch(setIsComplite(true));
    } catch (error) {
      alert(error);
    }
  };

  const [addUser, { error: addUserError }] = chatAPI.useAddUserToChatMutation();
  const [createChat, { error: createChatError }] =
    chatAPI.useCreateNewChatMutation();

  const dispatch = useAppDispatch();

  const {
    open,
    selectedUserId,
    isPrivateChat,
    chatName,
    isNameSeted,
    isComplite,
  } = useAppSelector((state) => state.newChatModalReducer);

  const {
    close: setClose,
    addSelectedAddUser,
    removeSelectedAddUser,
    setChatName,
    setIsPrivateChat,
    clearSelectedAddUser,
    setIsComplite,
  } = modalNewChatSlice.actions;

  const { data: users, error, isLoading } = chatAPI.useGetAllUsersQuery(null);

  const dialogRef = useRef<HTMLDivElement | null>(null);

  const handleSetIsPrivateChat = () => {
    dispatch(setIsPrivateChat(!isPrivateChat));
    dispatch(clearSelectedAddUser());
  };

  const handleSelectUser = (id: number) => {
    if (selectedUserId.includes(id)) {
      dispatch(removeSelectedAddUser(id));
    } else {
      if (!isPrivateChat && selectedUserId.length >= 1) {
      } else {
        dispatch(addSelectedAddUser(id));
      }
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dialogRef.current &&
      !dialogRef.current.contains(event.target as Node)
    ) {
      dispatch(setClose()); // Закрываем диалог через Redux
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const reloaded = () => {
    setTimeout(() => {
      window.location.reload();
    }, 4000);
  };
  isComplite ? reloaded() : null;

  return (
    <Dialog
      open={open}
      onClose={() => dispatch(setClose())}
      ref={dialogRef}
      sx={{
        maxHeight: "70vh",
        overflow: "hidden",
      }}
    >
      <DialogTitle>
        {createChatError && (
          <Alert severity="error">{JSON.stringify(createChatError)}</Alert>
        )}
        {addUserError && (
          <Alert severity="error">{JSON.stringify(addUserError)}</Alert>
        )}
        {isComplite && <Alert severity="success">Успешно создан !</Alert>}
        {!isComplite && (
          <Alert severity="info">
            Нужно выбрать пользователя для вашего диалога/группы
          </Alert>
        )}
      </DialogTitle>
      <StyledBox>
        <Typography>задайте имя вашему чату</Typography>
        <TextField
          onChange={(e) => dispatch(setChatName(e.target.value))}
          id="name_input"
          variant="standard"
        />
        <PrivateChatDiv onClick={handleSetIsPrivateChat}>
          <Typography>Group chat</Typography>
          <Checkbox id="chat" checked={isPrivateChat} />
        </PrivateChatDiv>
      </StyledBox>
      <StyledListWithUsers>
        {users &&
          users.map((usr) => (
            <ListItem disableGutters key={usr.id}>
              <ListItemButton
                onClick={() => {
                  usr.id && handleSelectUser(usr.id);
                }}
              >
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText> {usr.username} </ListItemText>
                {usr.id && selectedUserId.includes(usr.id) && (
                  <StyledCheckCircleOutlineRoundedIcon />
                )}
              </ListItemButton>
            </ListItem>
          ))}
      </StyledListWithUsers>
      <Button
        disabled={!isNameSeted || selectedUserId.length < 1 || isComplite}
        onClick={() => {
          CreateNewChatAndAddUsers({
            users: selectedUserId,
            chat: { isGroup: isPrivateChat, name: chatName },
          });
        }}
      >
        Create and Add
      </Button>
    </Dialog>
  );
}

const StyledBox = styled(Box)`
  margin: 0;
  padding: 0;
  justify-content: center;
  align-items: center;
  text-align: center;
  align-content: center;
`;

const PrivateChatDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-left: 35%;
  margin-right: 35%;
  cursor: pointer;
`;

const StyledCheckCircleOutlineRoundedIcon = styled(
  CheckCircleOutlineRoundedIcon
)`
  color: #08db08;
`;

const StyledListWithUsers = styled(List)`
  max-height: 50vh;
  overflow-y: auto;
`;
