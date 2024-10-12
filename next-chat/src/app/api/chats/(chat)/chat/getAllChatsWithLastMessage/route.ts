/* eslint-disable */
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../utils/prisma";
import { IUserJWT } from "../../../../../../../models/IUserJWT";
import { HTTP_STATUS } from "../../../../../../../models/httpConstants";
import { ChatsWithLastMessage } from "../../../../../../../models/ChatsWithLastMessage";

const getChatsByIdOrName = async (username: string, userId?: number) => {
  if (!userId && !username) {
    return [];
  }

  const orConditions: any[] = [];

  if (userId) {
    orConditions.push({ id: userId });
  }

  if (username) {
    orConditions.push({ username });
  }

  const chats = await prisma.chat.findMany({
    where: {
      users: {
        some: {
          OR: orConditions,
        },
      },
    },
    include: {
      users: {
        select: {
          id: true,
          username: true,
          photo: true,
        },
      },
      messages: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1, // Возьмем только последнее сообщение, если оно есть
        include: {
          sender: {
            select: {
              id: true,
              username: true,
              createdAt: true,
              photo: true,
            },
          },
        },
      },
    },
  });

  const result = chats.map((chat) => ({
    id: chat.id,
    isGroup: chat.isGroup,
    name: chat.name,
    createdAt: chat.createdAt,
    photo: chat.photo,
    users: chat.users.map((user) => ({
      id: user.id,
      username: user.username,
      photo: user.photo,
    })),
    messages:
      chat.messages.length > 0
        ? chat.messages.map((message) => ({
            id: message.id, // Добавьте id
            content: message.content || "", // Добавьте content
            image: message.image || null, // Добавьте image
            senderId: message.senderId, // Добавьте senderId
            chatId: message.chatId, // Добавьте chatId
            sender: {
              id: message.sender.id,
              username: message.sender.username,
              createdAt: message.sender.createdAt,
              photo: message.sender.photo,
            },
          }))
        : [],
  }));

  return result;
};

export const getAllchatOfUser = async (req: NextRequest) => {
  try {
    const token =
      req.cookies.get("jwt_token")?.value ||
      req.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const { id, username } = (await jwt.verify(
      token,
      process.env.NEXT_PUBLIC_JWT_SECRET || ""
    )) as IUserJWT;

    const chats: ChatsWithLastMessage[] = await getChatsByIdOrName(
      username || "",
      id
    );

    return NextResponse.json(chats);
  } catch (error) {
    return NextResponse.json(error, { status: HTTP_STATUS.SERVER_ERROR });
  }
};

export { getAllchatOfUser as GET };
