import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChat } from "../../models/IChat";
import { ChatsWithLastMessage } from "../../models/ChatsWithLastMessage";
import { MessageWithSender } from "../../models/MessegaWithUserSender";

interface CurrentChatState {
  messages: MessageWithSender[];
}

const initialState: CurrentChatState = {
  messages: [],
};

export const currentChatSlice = createSlice({
  name: "currentChat",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<MessageWithSender[]>) => {
      state.messages = action.payload;
    },
    appendMessage: (state, action: PayloadAction<MessageWithSender>) => {
      state.messages.push(action.payload);
    },
  },
});

export default currentChatSlice.reducer;
