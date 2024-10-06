import IUserCompact from "../models/IUserCompact";
import prisma from "./prisma";

const checkUserExistById = async (user: IUserCompact): Promise<boolean> => {
  const checkUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });
  return !!checkUser;
};

export { checkUserExistById };
