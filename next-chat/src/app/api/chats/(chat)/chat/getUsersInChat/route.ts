/* eslint-disable */
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { IUserJWT } from "../../../../../../../models/IUserJWT";
import { checkUserExistInChat } from "../../../../../../../utils/checkUserExistInChat";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
} from "../../../../../../../models/httpConstants";
import prisma from "../../../../../../../utils/prisma";

export interface usersInChat {
  id: number;
  photo: Buffer<ArrayBufferLike> | null | string;
  username: string;
}

const getAllusersInChat = async (chatId: number) => {
  if (!chatId) {
    return [];
  }

  const chatWithUsers = await prisma.chat.findUnique({
    where: { id: chatId },
    include: {
      users: {
        select: {
          id: true,
          username: true,
          photo: true,
        },
      },
    },
  });
  if (chatWithUsers) {
    return chatWithUsers.users as usersInChat[];
  }
  return [];
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

    const usersInChat = await getAllusersInChat(idChat);

    const convertedImageUsersInChat = usersInChat.map((user) => ({
      ...user,
      photo: user.photo ? user.photo.toString("base64") : null,
    }));

    return NextResponse.json(convertedImageUsersInChat, {
      status: HTTP_STATUS.OK,
    });
  } catch (error) {
    return NextResponse.json(error, { status: HTTP_STATUS.SERVER_ERROR });
  }
};

export { getChat as GET };
