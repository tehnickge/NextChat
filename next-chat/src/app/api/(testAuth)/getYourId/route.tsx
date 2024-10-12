import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { IUserJWT } from "../../../../../models/IUserJWT";
import { HTTP_STATUS } from "../../../../../models/httpConstants";
const getYourId = async (req: NextRequest) => {
  try {
    const token =
      req.cookies.get("jwt_token")?.value ||
      req.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const { id, username } = (await jwt.verify(
      token,
      process.env.NEXT_PUBLIC_JWT_SECRET || ""
    )) as IUserJWT;

    return NextResponse.json(id, { status: HTTP_STATUS.OK });
  } catch (error) {
    return NextResponse.json(error, { status: HTTP_STATUS.SERVER_ERROR });
  }
};

export { getYourId as GET };
