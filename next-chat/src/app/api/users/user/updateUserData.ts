import { NextRequest, NextResponse } from "next/server";
import IUser from "../../../../../models/IUser";
import jwt from "jsonwebtoken";
import { IUserJWT } from "../../../../../models/IUserJWT";
import prisma from "../../../../../utils/prisma";

export const updateUserData = async (req: NextRequest) => {
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

    const formData = await req.formData();
    const userData = Object.fromEntries(formData.entries());
    const photoFile = formData.get("photo");

    console.log("formData", formData);
    console.log("userData", userData);
    console.log("photoFile", photoFile);

    let photo: Buffer | null = null;
    if (photoFile && photoFile instanceof Blob) {
      // Конвертируем Blob в Buffer
      const arrayBuffer = await photoFile.arrayBuffer();
      photo = Buffer.from(arrayBuffer);
    }

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: {
        ...userData,
        photo: photo || undefined, // Устанавливаем поле photo, если файл есть
      },
    });

    return NextResponse.json(
      {
        message: "Данные пользователя успешно обновлены",
        updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
