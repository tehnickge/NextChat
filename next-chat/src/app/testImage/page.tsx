"use client";
import { useState } from "react";
import styled from "styled-components";
import imageCompression from "browser-image-compression";

const ImageUploader = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [username, setUsername] = useState("");

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        console.log("Исходный размер файла:", file.size / 1024, "KB");

        // Настройки для сжатия изображения
        const options = {
          maxSizeMB: 0.2, // Максимальный размер файла в MB (300 KB)
          maxWidthOrHeight: 200, // Максимальная ширина или высота изображения
          useWebWorker: true, // Использовать WebWorker для ускорения процесса
        };

        // Сжимаем изображение
        const compressedFile = await imageCompression(file, options);

        console.log("Размер сжатого файла:", compressedFile.size / 1024, "KB");

        setSelectedFile(compressedFile);

        // Создаем превью сжатого изображения
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(compressedFile); // Читаем сжатый файл как Data URL
      } catch (error) {
        console.error("Ошибка при сжатии изображения:", error);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Пожалуйста, выберите файл для загрузки.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", selectedFile); // Добавляем файл изображения в FormData

    try {
      const response = await fetch("/api/users/user", {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      const result = await response.json();
      console.log(result);
      // Дополнительная обработка после успешной загрузки, например, уведомление пользователя
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
        {imagePreview && <Image src={imagePreview} alt="Image preview" />}
        <Button type="submit">Обновить данные</Button>
      </form>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin-bottom: 20px;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
  }
`;

export default ImageUploader;
