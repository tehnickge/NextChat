import { IChat } from "../models/IChat";
import prisma from "./prisma";

const checkChatExist = async (chat: IChat): Promise<boolean> => {
  const checkUser = await prisma.chat.findUnique({
    where: {
      id: chat.id,
    },
  });
  return !!checkUser;
};

export { checkChatExist };
