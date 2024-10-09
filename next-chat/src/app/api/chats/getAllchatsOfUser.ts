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
    const { searchParams } = await req.nextUrl;

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

    const paramsId = searchParams.get("id");
    const ParamsName = searchParams.get("username");

    if (
      !id ||
      id !== Number(paramsId) ||
      !username ||
      username !== ParamsName
    ) {
      return NextResponse.json({ error: ERROR_MESSAGES.BAD_ARGUMENTS });
    }

    const chats = await getChatsByIdOrName(ParamsName || "", id);

    return NextResponse.json({ data: chats });
  } catch (error) {}
};