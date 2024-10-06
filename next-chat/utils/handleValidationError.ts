import { NextResponse } from "next/server";
import * as Yup from "yup";
import { HTTP_STATUS } from "../models/httpConstants";

export const handleValidationError = (error: Yup.ValidationError) => {
  return NextResponse.json(
    { error: error.errors },
    { status: HTTP_STATUS.BAD_REQUEST }
  );
};
