"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Button, TextField } from "@mui/material";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  margin-top: 10px;
`;

export default function UploadImage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");

  // Обработка изменения файла
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);

    // Если файл выбран, создаем ссылку для предварительного просмотра
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    } else {
      setPreview(null);
    }
  };

  // Обработка отправки формы
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("content", content);

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Ошибка при отправке сообщения");
      }

      alert("Сообщение отправлено");

      // Очищаем форму после успешной отправки
      setFile(null);
      setPreview(null);
      setContent("");
    } catch (error) {
      console.error(error);
      alert("Ошибка: " + (error as Error).message);
    }
  };

  return (
    <FormContainer>
      <TextField
        label="Текст сообщения"
        variant="outlined"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        margin="normal"
      />
      <input type="file" onChange={handleFileChange} />
      {preview && <ImagePreview src={preview} alt="Предварительный просмотр" />}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!file}
      >
        Отправить сообщение
      </Button>
    </FormContainer>
  );
}
