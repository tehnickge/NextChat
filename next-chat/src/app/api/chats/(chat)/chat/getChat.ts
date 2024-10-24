import { usersInChat } from "@/app/api/chats/(chat)/chat/getUsersInChat/route";
/* eslint-disable */
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { IUserJWT } from "../../../../../../models/IUserJWT";
import prisma from "../../../../../../utils/prisma";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
} from "../../../../../../models/httpConstants";
import { checkUserExistInChat } from "../../../../../../utils/checkUserExistInChat";
import { MessageWithSender } from "../../../../../../models/MessegaWithUserSender";
import { ChatUser } from "../../../../../../store/reducers/CurrentChatSlice";

const getMessagesByChatId = async (chatId: number, take = 5, skip = 0) => {
  if (!chatId) {
    return [];
  }

  const messages: MessageWithSender[] = await prisma.message.findMany({
    where: {
      chatId: chatId,
    },
    include: {
      sender: {
        select: {
          id: true,
          username: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take, // Ограничение количества сообщений
    skip, // Пропуск уже загруженных сообщений
  });

  return messages;
};

export const getChat = async (req: NextRequest) => {
  try {
    const token =
      req.cookies.get("jwt_token")?.value ||
      req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    const { id: userID, username: userName } = jwt.verify(
      token,
      process.env.NEXT_PUBLIC_JWT_SECRET || ""
    ) as IUserJWT;

    const { searchParams, pathname } = req.nextUrl;
    const idChat = Number(searchParams.get("_id"));
    const take = Number(searchParams.get("_take"));
    const skip = Number(searchParams.get("_skip"));

    if (
      !(await checkUserExistInChat(
        { id: idChat, isGroup: false },
        { id: userID }
      ))
    ) {
      return NextResponse.json({
        error: ERROR_MESSAGES.BAD_ARGUMENTS + " you not exist in this chat",
      });
    }

    const chat = (await getMessagesByChatId(idChat, take, skip)).reverse();

    return NextResponse.json(chat, {
      status: HTTP_STATUS.OK,
    });
  } catch (error) {
    return NextResponse.json(error, { status: HTTP_STATUS.SERVER_ERROR });
  }
};
