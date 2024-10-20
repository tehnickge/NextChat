import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChat } from "../../models/IChat";
import { ChatsWithLastMessage } from "../../models/ChatsWithLastMessage";

interface dashboardSliceState {
  chats: ChatsWithLastMessage[];
}

const initialState: dashboardSliceState = {
  chats: [],
};

export const dashboardSlice = createSlice({
  name: "dashboardChat",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<ChatsWithLastMessage[]>) => {
      state.chats = action.payload;
    },
    append: (state, action: PayloadAction<ChatsWithLastMessage>) => {
      state.chats.push(action.payload);
    },
  },
});

export default dashboardSlice.reducer;
