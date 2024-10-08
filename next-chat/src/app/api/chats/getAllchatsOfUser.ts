import { NextRequest, NextResponse } from "next/server";
import IUser from "../../../../models/IUser";
import prisma from "../../../../utils/prisma";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../../models/httpConstants";

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

    const id = searchParams.get("id");
    const name = searchParams.get("username");
    const cookieUserId = Number(await req.cookies.get("userId")?.value);
    const cookieUsername = await req.cookies.get("userName")?.value;

    if (
      !cookieUserId ||
      cookieUserId !== Number(id) ||
      !cookieUsername ||
      cookieUsername !== name
    ) {
      return NextResponse.json({ error: ERROR_MESSAGES.BAD_ARGUMENTS });
    }

    const chats = await getChatsByIdOrName(name || "", Number(id));

    return NextResponse.json({ data: chats });
  } catch (error) {}
};
