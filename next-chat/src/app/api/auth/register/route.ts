/* eslint-disable */
import { error } from "console";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const { email, password } = await req.json();

    const bcrypt = require("bcrypt");

    const hashedPassword = await bcrypt.hash(password, 10);
  } catch (error: any) {}
  console.log(error);
}
