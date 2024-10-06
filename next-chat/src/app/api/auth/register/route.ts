/* eslint-disable */
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "../../../../../utils/prisma";
import * as Yup from "yup";
import IUser from "../../../../../models/IUser";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
} from "../../../../../models/httpConstants";
import { handleValidationError } from "../../../../../utils/handleValidationError";

// Схема валидации пользователя
const userSchema: Yup.Schema<IUser> = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(4, "Name must be at least 4 characters")
    .max(15, "Name must be less than 16 characters"),
  email: Yup.string().required("Email is required").email("Invalid email"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters")
    .max(15, "Password must be less than 16 characters"),
});

// Проверка наличия пользователя в базе данных
const checkUsernameAndEmailExists = async (
  username: string,
  email: string
): Promise<boolean> => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  });
  return !!user; // возвращает true, если найден хотя бы один пользователь с таким username или email
};

// Основная функция обработки запроса
export async function POST(req: Request) {
  try {
    const user: IUser = await req.json();

    // Валидация входящих данных
    const validatedUser = await userSchema.validate(user, {
      abortEarly: false,
    });

    // Проверка существования имени пользователя и почты
    if (
      await checkUsernameAndEmailExists(validatedUser.name, validatedUser.email)
    ) {
      return NextResponse.json(
        {
          error:
            ERROR_MESSAGES.NAME_EXISTS + " or " + ERROR_MESSAGES.EMAIL_EXISTS,
        },
        { status: HTTP_STATUS.FORBIDDEN }
      );
    }

    // Хэширование пароля
    const hashedPassword = await bcrypt.hash(validatedUser.password, 10);

    // Создание нового пользователя
    const createdUser = await prisma.user.create({
      data: {
        username: validatedUser.name,
        password: hashedPassword,
        email: validatedUser.email,
      },
    });
    return NextResponse.json(createdUser, { status: HTTP_STATUS.OK });
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      return handleValidationError(error);
    }
    console.error("Ошибка при создании пользователя:", error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.UNEXPECTED_ERROR },
      { status: HTTP_STATUS.SERVER_ERROR }
    );
  }
}
