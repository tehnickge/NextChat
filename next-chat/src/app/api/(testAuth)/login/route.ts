/* eslint-disable */
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import IUser from "../../../../../models/IUser";
import prisma from "../../../../../utils/prisma";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
} from "../../../../../models/httpConstants";
import jwt from "jsonwebtoken";

const validUser = async (user: IUser): Promise<boolean> => {
  const chekcuser = await prisma.user.findUnique({
    where: {
      username: user.username,
    },
  });

  if (chekcuser) {
    return (
      (await bcrypt.compare(user.password, chekcuser?.password)) &&
      user.username === chekcuser.username
    );
  }
  return false;
};

const getUser = async (user: IUser) => {
  const curUser = await prisma.user.findUnique({
    where: {
      username: user.username,
    },
  });
  return curUser;
};

const login = async (req: NextRequest, res: NextResponse) => {
  try {
    const userData: IUser = await req.json();
    if (!(await validUser(userData))) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.BAD_ARGUMENTS },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    const curUser = await getUser(userData);

    if (!curUser) {
      return NextResponse.json({ error: ERROR_MESSAGES.UNEXPECTED_ERROR });
    }
    const userJWT = {
      username: curUser.username,
      id: curUser.id,
    };

    const token = jwt.sign(userJWT, process.env.NEXT_PUBLIC_JWT_SECRET || "", {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      { test: userData, token: token },
      { status: HTTP_STATUS.OK }
    );

    response.cookies.set("jwt_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: HTTP_STATUS.SERVER_ERROR }
    );
  }
};

export { login as POST };
function NextCors(
  req: NextRequest,
  res: NextResponse<unknown>,
  arg2: {
    // Укажите разрешённые домены
    origin: string;
    methods: string[];
    optionsSuccessStatus: number;
  }
) {
  throw new Error("Function not implemented.");
}
