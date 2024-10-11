import { createSlice } from "@reduxjs/toolkit";
import { IChat } from "../../models/IChat";

interface newChatState {
  chat: IChat;
  readyToMake: boolean;
}

const initialState: newChatState = {
  chat: {
    isGroup: false,
  },
  readyToMake: false,
};

export const newChatSlice = createSlice({
  name: "newChat",
  initialState,
  reducers: {},
});
