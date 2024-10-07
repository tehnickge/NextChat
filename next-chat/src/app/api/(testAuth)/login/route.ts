/* eslint-disable */
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import IUser from "../../../../../models/IUser";
import * as Yup from "yup";
import prisma from "../../../../../utils/prisma";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
} from "../../../../../models/httpConstants";
import jwt from "jsonwebtoken";

const validUser = async (user: IUser): Promise<boolean> => {
  const chekcuser = await prisma.user.findUnique({
    where: {
      username: user.name,
    },
  });
  if (chekcuser) {
   return await bcrypt.compare(user.password, chekcuser?.password) && user.name === chekcuser.username;
  }
  return false;
};

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

const login = async (req: NextRequest, res: NextResponse) => {
  try {
    const userData: IUser = await req.json();

    if (!(await validUser(userData))) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.BAD_ARGUMENTS },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    const userJWT = {
      username: userData.name,
      id: userData.id,
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
