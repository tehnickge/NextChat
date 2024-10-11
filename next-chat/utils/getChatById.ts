import { IChatCompact } from "./../models/IChatCompact";
import prisma from "./prisma";
const getChatById = async ({ id }: IChatCompact) => {
  const chat = await prisma.chat.findUnique({
    where: {
      id: id,
    },
    include: {
      users: true, // Включаем пользователей чата
    },
  });

  const userLen = chat?.users.length;
  return { chat, userLen };
};

export { getChatById };
