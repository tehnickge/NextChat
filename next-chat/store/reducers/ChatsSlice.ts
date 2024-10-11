import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChat } from "../../models/IChat";

interface ChatState {
  isLoading: boolean;
  error: string;
  selectedChat?: number;
}

const initalState: ChatState = {
  isLoading: false,
  error: "",
};

export const chatSlice = createSlice({
  name: "chats",
  initialState: initalState,
  reducers: {
    Select: (state, action: PayloadAction<number>) => {
      state.selectedChat = action.payload;
    },
  },
});

export default chatSlice.reducer;
