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

export default function CreateChatDialog() {
  const { open } = useAppSelector((state) => state.newChatModalReducer);
  const dispatch = useAppDispatch();
  const { close: setClose } = modalNewChatSlice.actions;

  const { data: users, error, isLoading } = chatAPI.useGetAllUsersQuery(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dialogRef.current &&
      !dialogRef.current.contains(event.target as Node)
    ) {
      dispatch(setClose()); // Закрываем диалог через Redux
    }
  };

  const handleSelectUser = (id?: number) => {
    console.log(id);
  };
  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={() => dispatch(setClose())}
      ref={dialogRef}
      sx={{
        maxHeight: "70vh",
      }}
    >
      <DialogTitle>
        Нужно выбрать пользователя для вашего диалога/группы
      </DialogTitle>
      <List>
        {users &&
          users.map((usr) => (
            <ListItem disableGutters key={usr.id}>
              <ListItemButton
                onClick={() => {
                  handleSelectUser(usr.id);
                }}
              >
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText> {usr.username} </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Dialog>
  );
}
