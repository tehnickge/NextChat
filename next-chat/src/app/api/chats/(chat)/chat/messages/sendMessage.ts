import { NextRequest, NextResponse } from "next/server";
import { IUserJWT } from "../../../../../../../models/IUserJWT";
import jwt from "jsonwebtoken";
import prisma from "../../../../../../../utils/prisma";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
} from "../../../../../../../models/httpConstants";
import { IMessage } from "../../../../../../../models/IMessage";
import { checkChatExist } from "../../../../../../../utils/checkChatExists";
import { checkUserExistInChat } from "../../../../../../../utils/checkUserExistInChat";

const createMessege = async (message: IMessage) => {
  try {
    if (!message.senderId) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.BAD_ARGUMENTS },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }
    const newMessage = await prisma.message.create({
      data: {
        content: message.content || null, // Текст сообщения
        image: message.image || null, // Это может быть изображение или null
        senderId: message.senderId, // ID отправителя
        chatId: message.chatId, // ID чата, в котором отправляется сообщение
      },
    });

    return newMessage;
  } catch (error) {
    return NextResponse.json(error, { status: HTTP_STATUS.BAD_REQUEST });
  }
};

const sendMessage = async (req: NextRequest) => {
  try {
    const token =
      req.cookies.get("jwt_token")?.value ||
      req.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const { id: userId, username } = (await jwt.verify(
      token,
      process.env.NEXT_PUBLIC_JWT_SECRET || ""
    )) as IUserJWT;

    const messageData: IMessage = await req.json();

    if (!(await checkChatExist({ id: messageData.chatId, isGroup: false }))) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.BAD_ARGUMENTS + " messageData.chatId" },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }
    if (
      !(await checkUserExistInChat(
        { id: messageData.chatId, isGroup: false },
        { id: userId }
      ))
    ) {
      return NextResponse.json(
        {
          error: ERROR_MESSAGES.BAD_ARGUMENTS + " you not exitst in this chat",
        },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    const newMessage = await createMessege({
      senderId: userId,
      content: messageData.content,
      image: messageData.image,
      chatId: messageData.chatId,
    });
    return NextResponse.json(newMessage, { status: HTTP_STATUS.OK });
  } catch (error) {
    return NextResponse.json(error, { status: HTTP_STATUS.SERVER_ERROR });
  }
};

export { sendMessage };
