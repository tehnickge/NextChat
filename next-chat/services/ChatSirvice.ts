import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IChat } from "../models/IChat";
import IUser from "../models/IUser";
import { AddUserToChatProps } from "@/app/api/chats/(chat)/chat/adduser/addUserToChat";
import { ChatsWithLastMessage } from "../models/ChatsWithLastMessage";
import { MessageWithSender } from "../models/MessegaWithUserSender";
import { usersInChat } from "@/app/api/chats/(chat)/chat/getUsersInChat/route";
import { IMessage } from "../models/IMessage";

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
        url: "/chats/chat",
        method: "POST",
        body: chat,
      }),
    }),
    addUserToChat: build.mutation<IChat, AddUserToChatProps>({
      query: (data: AddUserToChatProps) => ({
        url: "/chats/chat/adduser",
        method: "PUT",
        body: data,
      }),
    }),
    getChatsWithLastMessage: build.query<ChatsWithLastMessage[], null>({
      query: () => ({
        url: "/chats/chat/getAllChatsWithLastMessage",
        method: "GET",
      }),
    }),
    getAllUsersInChat: build.query<usersInChat[], number>({
      query: (id: number) => ({
        url: "/chats/chat/getUsersInChat",
        params: {
          _id: id,
        },
      }),
    }),
    getChat: build.query<MessageWithSender[], number>({
      query: (id: number) => ({
        url: "/chats/chat",
        params: {
          _id: id,
        },
      }),
    }),
    getYourId: build.query<number, null>({
      query: () => ({
        url: "/getYourId",
      }),
    }),
    sendMessage: build.mutation<IMessage, IMessage>({
      query: (mes: IMessage) => ({
        url: "/chats/chat/messages",
        method: "POST",
        body: mes,
      }),
    }),
  }),
});
