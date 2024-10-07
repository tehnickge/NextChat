/* eslint-disable */
import { NextApiRequest, NextApiResponse } from "next";

export function GET(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query; // Получаем параметр id из запроса

  // Теперь вы можете использовать параметр id
  res.status(200).json({ message: `User ID: ${id}` });
}
