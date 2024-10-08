import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions"; // Путь к вашему файлу next-auth
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    // Если пользователь не авторизован, можно перенаправить его на страницу логина или обработать это иначе
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // Если пользователь авторизован, передаем данные дальше
  return {
    props: {
      session,
    },
  };
}
