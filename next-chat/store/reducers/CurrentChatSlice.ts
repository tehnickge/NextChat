import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChat } from "../../models/IChat";
import { ChatsWithLastMessage } from "../../models/ChatsWithLastMessage";
import { MessageWithSender } from "../../models/MessegaWithUserSender";

export interface ChatUser {
  id: number;
  username: string;
  photo: Buffer | null;
}
interface CurrentChatState {
  messages: MessageWithSender[];
  users: ChatUser[];
}

const initialState: CurrentChatState = {
  messages: [],
  users: [],
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
    prependMessages: (state, action: PayloadAction<MessageWithSender[]>) => {
      state.messages = [...action.payload, ...state.messages]; // Добавляем новые сообщения в начало
    },
  },
});

export default currentChatSlice.reducer;
