/* eslint-disable */
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import IUser from "../../../../models/IUser";
import prisma from "../../../../utils/prisma";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../../models/httpConstants";
import { IUserJWT } from "../../../../models/IUserJWT";

const getChatsByIdOrName = async (username: string, userId?: number) => {
  if (!userId && !username) {
    return [];
  }

  const orConditions: any = [];

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
          OR: orConditions, // Условия для пользователя по id или username
        },
      },
    },
    include: {
      users: true,
      messages: true,
    },
  });
  return chats;
};

export const getAllchatOfUser = async (req: NextRequest) => {
  try {
    const token =
      req.cookies.get("jwt_token")?.value ||
      req.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const { id, username } = jwt.verify(
      token,
      process.env.NEXT_PUBLIC_JWT_SECRET || ""
    ) as IUserJWT;

    // отладочная информация !!!!!!!!!!!!!!!!!!!
    console.log("token", id, username);

    const chats = await getChatsByIdOrName(username || "", id);

    return NextResponse.json(chats);
  } catch (error) {
    return NextResponse.json(error, { status: HTTP_STATUS.SERVER_ERROR });
  }
};
