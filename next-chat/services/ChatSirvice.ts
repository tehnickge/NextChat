import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IChat } from "../models/IChat";
import IUser from "../models/IUser";

export const chatAPI = createApi({
  reducerPath: "chatsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://89.179.242.42:3000/api" }),
  endpoints: (build) => ({
    fetchAllChatsOfUser: build.query<IChat[], null>({
      query: () => ({
        url: "/chats",
      }),
    }),
    сreateNewUser: build.mutation<IUser, IUser>({
      query: (user: IUser) => ({
        url: "/register",
        method: "POST",
        body: user,
      }),
    }),
    loginNewUser: build.mutation<IUser, IUser>({
      query: (user: IUser) => ({
        url: "/login",
        method: "POST",
        body: user,
      }),
    }),
    createNewChatOfUser: build.mutation<IChat, IChat>({
      query: (user: IChat) => ({
        url: "/chats/chat",
        method: "POST",
        body: user,
      }),
    }),
    getAllUsers: build.query<IUser[], null>({
      query: () => ({
        url: "/users",
      }),
    }),
    createNewChat: build.mutation<IChat, IChat>({
      query: (chat: IChat) => ({
        url: "/chats",
        method: "POST",
        body: chat,
      }),
    }),
    // addUserToChat: build.mutation()
  }),
});
