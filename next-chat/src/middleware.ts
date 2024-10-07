import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  id: string; // Предполагаем, что id всегда будет строкой
}

export async function middleware(req: NextRequest) {
  // Получаем токен из куки (или из заголовка авторизации)
  const token =
    req.cookies.get("jwt_token")?.value ||
    req.headers.get("Authorization")?.split(" ")[1];

  // Если токена нет, перенаправляем на страницу логина
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Верификация JWT
    const secret = process.env.NEXT_PUBLIC_JWT_SECRET || "your-secret-key";
    const decoded = jwt.verify(token, secret) as DecodedToken;

    // Добавляем декодированные данные в запрос, если нужно
    req.nextUrl.searchParams.set("id", decoded.id);

    // Продолжаем запрос
    return NextResponse.next();
  } catch (error) {
    // Если токен недействителен или просрочен, перенаправляем на страницу логина
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Указываем, какие маршруты должны использовать эту middleware
export const config = {
  matcher: ["/api/chats/:path*", "/chats/:path*"],
}; // Пример защищённого маршрута
