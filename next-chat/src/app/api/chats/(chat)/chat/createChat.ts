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
import jwt from "jsonwebtoken";
import { IUserJWT } from "../../../../../../models/IUserJWT";

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

export const createChat = async (req: NextRequest) => {
  try {
    const chatData: IChat = await req.json();
    const chat: IChat = await chatSchema.validate(chatData, {
      abortEarly: false,
    });
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

    if (!(await checkUserExistById({ id: userID }))) {
      return NextResponse.json(
        {
          error: ERROR_MESSAGES.BAD_ARGUMENTS + ` id:${userID}`,
        },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    const newChat = await makeChat(chat, { id: userID });

    return NextResponse.json(newChat, { status: HTTP_STATUS.OK });
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      return handleValidationError(error);
    }
    console.error("Ошибка при создании чата:", await error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.UNEXPECTED_ERROR },
      { status: HTTP_STATUS.SERVER_ERROR }
    );
  }
};
