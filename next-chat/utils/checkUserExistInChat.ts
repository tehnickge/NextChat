import { IChatCompact } from "../models/IChatCompact";
import IUserCompact from "../models/IUserCompact";
import prisma from "./prisma";

const checkUserExistInChat = async (chat: IChatCompact, user: IUserCompact) => {
  const isUserInChat = await prisma.chat.findFirst({
    where: {
      id: chat.id, // Указанный ID чата
      users: {
        some: {
          id: user.id, // Указанный ID пользователя
        },
      },
    },
  });

  return !!isUserInChat;
};

export { checkUserExistInChat };
