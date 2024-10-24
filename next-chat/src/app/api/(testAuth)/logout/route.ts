import { NextRequest, NextResponse } from "next/server";
import { HTTP_STATUS } from "../../../../../models/httpConstants";

export const GET = async (req: NextRequest) => {
  try {
    const response = NextResponse.json(
      { info: "logout" },
      { status: HTTP_STATUS.OK }
    );

    response.cookies.delete("jwt_token").delete("userId").delete("userName");

    return await response;
  } catch (err) {
    return err;
  }
};
