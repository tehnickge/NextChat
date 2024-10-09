import { IChat } from "../../models/IChat";
import { AppDispatch } from "../store";
import axios from "axios";
import { chatSlice } from "./ChatsSlice";

export const fetchChats = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(chatSlice.actions.chatsFetching());
    const response = await axios.get<IChat[]>("/api/chats");

    dispatch(chatSlice.actions.chatsFetchingSucces(response.data));
  } catch (e: unknown) {
    if (e instanceof Error) {
      dispatch(chatSlice.actions.chatsFetchingError(e.message));
    } else {
      dispatch(chatSlice.actions.chatsFetchingError("Unknown error"));
    }
  }
};
