"use client";
import { Button } from "@mui/material";
import { use, useEffect } from "react";
async function loginUser() {
  const url = "/api/login";
  const body = {
    name: "Krot",
    email: "test@mail.ru",
    password: "krot",
  };

  try {
    const response = await fetch(url, {
      method: "POST", // Указываем метод запроса
      headers: {
        "Content-Type": "application/json", // Указываем тип данных, которые отправляем
      },
      body: JSON.stringify(body), // Преобразуем объект в строку JSON
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json(); // Обрабатываем JSON-ответ от сервера
    console.log(data); // Например, можно вывести ответ в консоль
  } catch (error) {
    console.error("Error logging in:", error);
  }
}

const Login = () => {
  useEffect(() => {
    loginUser();
  }, []);
  const buttonHandler = () => {
    loginUser();
  };

  return (
    <div>
      Login page<Button onClick={buttonHandler}>test</Button>
    </div>
  );
};

export default Login;
