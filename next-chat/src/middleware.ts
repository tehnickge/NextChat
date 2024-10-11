import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWTPayload, jwtVerify } from "jose";

interface DecodedToken extends JWTPayload {
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
    const secret = new TextEncoder().encode(
      process.env.NEXT_PUBLIC_JWT_SECRET || "your-secret-key"
    );
    const { payload } = await jwtVerify(token, secret);

    const decodedPayload = payload as DecodedToken;

    // Добавляем декодированные данные в запрос, если нужно
    await req.nextUrl.searchParams.set("id", decodedPayload.id);

    // Продолжаем запрос
    return NextResponse.next();
  } catch (error) {
    // Если токен недействителен или просрочен, перенаправляем на страницу логина
    console.log(error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Указываем, какие маршруты должны использовать эту middleware
export const config = {
  matcher: ["/api/chats/:path*", "/chats/:path*", "/user/:path*"],
}; // Пример защищённого маршрута
