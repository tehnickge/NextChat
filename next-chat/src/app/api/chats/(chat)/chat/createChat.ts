/* eslint-disable */
import { NextRequest, NextResponse } from "next/server";
import { IChat } from "../../../../../../models/IChat";
import prisma from "../../../../../../utils/prisma";
import * as Yup from "yup";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
} from "../../../../../../models/httpConstants";
import { handleValidationError } from "../../../../../../utils/handleValidationError";
import { checkUserExistById } from "../../../../../../utils/cheackUserExist";
import IUserCompact from "../../../../../../models/IUserCompact";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../../lib/authOptions";

interface PropsChatWithUser {
  chatData: IChat;
  userData: IUserCompact;
}
const makeChat = async (chat: IChat, user: IUserCompact) => {
  const newChat = await prisma.chat.create({
    data: {
      isGroup: chat.isGroup,
      name: chat.name,
      photo: chat.photo,
      users: {
        connect: {
          id: user.id,
        },
      },
    },
  });
  return newChat;
};

const bufferSchema = Yup.mixed().test(
  "is-buffer",
  "Invalid photo format",
  (value) => {
    return value === null || value instanceof Buffer;
  }
);

const chatSchema: Yup.Schema<IChat> = Yup.object().shape({
  id: Yup.number().optional(),
  isGroup: Yup.boolean().required("isGroup required"),
  name: Yup.string()
    .min(3, "name min len 3")
    .max(15, "name max len 15")
    .optional(),
  photo: Yup.mixed(bufferSchema),
  createdAt: Yup.date().optional(),
});

export const createChat = async (req: NextRequest, res: NextResponse) => {
  try {
    const { userData, chatData }: PropsChatWithUser = await req.json();
    const session = await getServerSession(authOptions);
    console.log(session);
    const chat: IChat = await chatSchema.validate(chatData, {
      abortEarly: false,
    });

    if (!(await checkUserExistById(userData))) {
      return NextResponse.json(
        {
          ERROR_MESSAGES: ERROR_MESSAGES.BAD_ARGUMENTS + ` id:${userData.id}`,
        },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    const newChat = await makeChat(chat, userData);
    return NextResponse.json({ newChat }, { status: HTTP_STATUS.OK });
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      return handleValidationError(error);
    }
    console.error("Ошибка при создании пользователя:", await error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.UNEXPECTED_ERROR },
      { status: HTTP_STATUS.SERVER_ERROR }
    );
  }
};
