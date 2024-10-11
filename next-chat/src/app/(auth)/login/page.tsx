"use client";
import { useState } from "react";
import { TextField, Button, Box, Typography, Alert, Link } from "@mui/material";
import styled from "styled-components";
import { chatAPI } from "../../../../services/ChatSirvice";
import IUser from "../../../../models/IUser";
import { useRouter } from "next/navigation";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  const [loginUser, { isLoading, error, isSuccess, data: userData }] =
    chatAPI.useLoginNewUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreate = async () => {
    const { username, email, password } = formData;
    await loginUser({
      username: username,
      email: email,
      password: password,
    } as IUser);
  };

  {
    isSuccess && router.push("/");
  }

  return (
    <StyldedBox
      onSubmit={() => {}}
      sx={{
        width: "100%",
        maxWidth: 400,
        mx: "auto",
        mt: 5,
        p: 3,
        boxShadow: 3,
      }}
    >
      <TitleTypography variant="h5" gutterBottom>
        Вход
      </TitleTypography>
      {error && (
        <Alert severity="error">
          {error && "data" in error && error.data.error
            ? error.data.error
            : "Произошла ошибка при входе"}
        </Alert>
      )}

      {isSuccess && userData && (
        <Alert severity="success">
          Имя пользователя: {JSON.stringify(userData)}
        </Alert>
      )}

      <StyledTextField
        label="Имя пользователя"
        name="username"
        value={formData.username}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <StyledTextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <StyledTextField
        label="Пароль"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      <StyledButton
        type="submit"
        variant="contained"
        fullWidth
        disabled={isSuccess}
        sx={{ mt: 2 }}
        onClick={handleCreate}
      >
        {isSuccess ? "Вход..." : "Войти"}
      </StyledButton>
      <StyledLink href="/register">или зарегистрироваться</StyledLink>
    </StyldedBox>
  );
};

const TitleTypography = styled(Typography)`
  color: ${({ theme }) => theme.colors.textHover};
`;
const StyldedBox = styled(Box)`
  background-color: ${({ theme }) => theme.colors.backgroundDatk};
`;
const StyledTextField = styled(TextField)`
  & .MuiInputBase-root {
    color: ${({ theme }) => theme.colors.textHover}; /* Цвет текста */
  }

  & .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) =>
      theme.colors.textSamy}; /* Цвет рамки при неактивном состоянии */
  }

  & .MuiInputLabel-root {
    color: ${({ theme }) => theme.colors.textHover}; /* Цвет метки */
  }

  &:hover .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) =>
      theme.colors.secondary}; /* Цвет рамки при наведении */
  }

  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) =>
      theme.colors.primary}; /* Цвет рамки при фокусе */
  }

  & .MuiFormHelperText-root {
    color: red; /* Цвет текста ошибок */
  }
`;
const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  text-transform: none;
  border-radius: 8px;
  transition: 1s;
  &:hover {
    transition: 1s;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const StyledLink = styled(Link)`
  display: block; /* Делает ссылку блочным элементом, чтобы работало центрирование */
  text-align: center; /* Центрирует ссылку по горизонтали */
  margin-top: 20px; /* Отступ сверху, можно настроить по необходимости */
  color: ${({ theme }) => theme.colors.primary}; /* Цвет ссылки */
  text-decoration: none; /* Убирает подчеркивание */
`;
export default LoginForm;
