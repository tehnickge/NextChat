import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { IUserJWT } from "../../../../models/IUserJWT";
import prisma from "../../../../utils/prisma";

const searchAllUsers = async (user: IUserJWT) => {
  const users = await prisma.user.findMany({
    where: {
      id: {
        not: user.id,
      },
    },
    select: {
      id: true,
      username: true,
      createdAt: true,
      photo: true,
    },
  });
  return users;
};
const getAllUsers = async (req: NextRequest) => {
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

    const users = await searchAllUsers({ id: id, username: username });

    return NextResponse.json(users);
  } catch (error) {
    NextResponse.json(error);
  }
};

export default getAllUsers;
