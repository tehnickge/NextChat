import { NextRequest, NextResponse } from "next/server";
import { IUserJWT } from "../../../../../../../models/IUserJWT";
import jwt from "jsonwebtoken";
import prisma from "../../../../../../../utils/prisma";
import IUserCompact from "../../../../../../../models/IUserCompact";
import { IChat } from "../../../../../../../models/IChat";
import { checkChatExist } from "../../../../../../../utils/checkChatExists";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
} from "../../../../../../../models/httpConstants";
import { IChatCompact } from "../../../../../../../models/IChatCompact";
import { checkUserExistInChat } from "../../../../../../../utils/checkUserExistInChat";
import { checkUserExistById } from "../../../../../../../utils/cheackUserExist";
import { getChatById } from "../../../../../../../utils/getChatById";

export interface AddUserToChatProps {
  user: IUserCompact;
  chat: IChatCompact;
}

const updateChat = async (chat: IChatCompact, user: IUserCompact) => {
  const updatedChat = await prisma.chat.update({
    where: {
      id: chat.id, // ID чата
    },
    data: {
      users: {
        connect: {
          id: user.id, // ID пользователя, которого нужно добавить
        },
      },
    },
  });

  return updatedChat;
};

export const addUserToChat = async (req: NextRequest) => {
  try {
    const token =
      req.cookies.get("jwt_token")?.value ||
      req.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const { id: ckeckError } = jwt.verify(
      token,
      process.env.NEXT_PUBLIC_JWT_SECRET || ""
    ) as IUserJWT;

    const { chat, user }: AddUserToChatProps = await req.json();

    if (user.id === ckeckError) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.BAD_ARGUMENTS + " is you -_-" },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    if (!(await checkUserExistById(user))) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.BAD_ARGUMENTS + " user not exist" },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    if (!(await checkChatExist(chat))) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.BAD_ARGUMENTS + " chat not exist" },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }
    const { chat: currentChat, userLen } = await getChatById(chat);

    if (currentChat?.isGroup === false && userLen && userLen >= 2) {
      return NextResponse.json(
        {
          error: ERROR_MESSAGES.BAD_ARGUMENTS + " chat is private and full",
        },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }
    console.log("chat", currentChat);

    if (await checkUserExistInChat(chat, user)) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.BAD_ARGUMENTS + " user in chat exist" },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    return NextResponse.json(await updateChat(chat, user));
  } catch (error) {
    return NextResponse.json(error);
  }
};
