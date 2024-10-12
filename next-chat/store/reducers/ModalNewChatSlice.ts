import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useRef } from "react";

interface modalNewChatState {
  open: boolean;
  selectedUserId: number[];
  isPrivateChat: boolean;
  chatName: string;
  isNameSeted: boolean;
  isComplite: boolean;
}

const initialState: modalNewChatState = {
  open: false,
  selectedUserId: [],
  isPrivateChat: false,
  chatName: "",
  isNameSeted: false,
  isComplite: false,
};

export const modalNewChatSlice = createSlice({
  name: "modal:newChat",
  initialState: initialState,
  reducers: {
    open: (state) => {
      state.open = !state.open;
    },
    close: (state) => {
      state.open = false;
    },
    addSelectedAddUser: (state, action: PayloadAction<number>) => {
      if (!state.selectedUserId.includes(action.payload)) {
        state.selectedUserId.push(action.payload);
      }
    },
    removeSelectedAddUser: (state, action: PayloadAction<number>) => {
      state.selectedUserId = state.selectedUserId.filter(
        (id) => id !== action.payload
      );
    },
    clearSelectedAddUser: (state) => {
      state.selectedUserId = [];
    },
    setChatName: (state, action: PayloadAction<string>) => {
      state.chatName = action.payload;
      state.chatName.length > 2
        ? (state.isNameSeted = true)
        : (state.isNameSeted = false);
    },
    setIsPrivateChat: (state, action: PayloadAction<boolean>) => {
      state.isPrivateChat = action.payload;
    },
    setIsNameSeted: (state, action: PayloadAction<boolean>) => {
      state.isNameSeted = action.payload;
    },
    setIsComplite: (state, action: PayloadAction<boolean>) => {
      state.isComplite = action.payload;
    },
  },
});

export default modalNewChatSlice.reducer;
