import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  selectedChat: number | null;
  lastMessegeInchat: string | null;
  userWhoSandLasMessage: string | null;
  messege: string | null;
}

const initalState: ChatState = {
  selectedChat: null,
  lastMessegeInchat: null,
  userWhoSandLasMessage: null,
  messege: null,
};

export const chatSlice = createSlice({
  name: "chats",
  initialState: initalState,
  reducers: {
    setSelectedChat: (state, action: PayloadAction<number>) => {
      state.selectedChat = action.payload;
    },
    setLastMessegeSet: (state, action: PayloadAction<string>) => {
      state.lastMessegeInchat = action.payload;
    },
    setUserWhoSandLasMessage: (state, action: PayloadAction<string>) => {
      state.userWhoSandLasMessage = action.payload;
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.messege = action.payload;
    },
  },
});

export default chatSlice.reducer;
