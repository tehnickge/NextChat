import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChat } from "../../models/IChat";

interface ChatState {
  chats: IChat[];
  isLoading: boolean;
  error: string;
}

const initalState: ChatState = {
  chats: [],
  isLoading: false,
  error: "",
};

export const chatSlice = createSlice({
  name: "chats",
  initialState: initalState,
  reducers: {
    setChats: (state, action: PayloadAction<IChat[]>) => {
      state.chats = action.payload;
    },
    chatsFetching(state) {
      state.isLoading = true;
    },
    chatsFetchingSucces(state, action: PayloadAction<IChat[]>) {
      state.isLoading = false;
      state.error = "";
      state.chats = action.payload;
    },
    chatsFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default chatSlice.reducer;
