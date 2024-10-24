import { Avatar, Box, Typography } from "@mui/material";
import { IMessage } from "../../../../models/IMessage";
import styled from "styled-components";
import Image from "next/image";

interface MassegeProps {
  avatarImage: Buffer<ArrayBufferLike> | null | string;
  isSender: boolean;
  messege: string | null;
  timestamp: Date;
  username?: string;
}

const Message = ({
  avatarImage,
  isSender,
  messege,
  timestamp,
  username,
}: MassegeProps) => {
  const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;

  // Проверка на корректность объекта Date
  const formattedDate =
    date instanceof Date && !isNaN(date.getTime())
      ? date.toLocaleString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : "Неверная дата";

  return (
    <MessageContainer isSender={isSender}>
      {!isSender && avatarImage && (
        <AvatarContainer>
          <Image
            alt={username || ""}
            src={`data:image/jpeg;base64,${avatarImage}`}
            quality={1}
            width={30}
            height={30}
          ></Image>
        </AvatarContainer>
      )}
      <MessageContent isSender={isSender}>
        {!isSender && <Username>{username}</Username>}
        <MessageText>{messege}</MessageText>
        <MessageTimestamp>{formattedDate}</MessageTimestamp>
      </MessageContent>
    </MessageContainer>
  );
};

const MessageContainer = styled(Box)<{ isSender: boolean }>`
  box-sizing: border-box;
  display: flex;
  align-items: flex-end;
  justify-content: ${(props) => (props.isSender ? "flex-end" : "flex-start")};
  padding: 10px;
  margin-bottom: 10px;
`;

const AvatarContainer = styled(Box)`
  background-color: red;
  margin-right: 10px;
  width: 20px;
  height: 20px;
  border-radius: 100%;
`;

const MessageContent = styled(Box)<{ isSender: boolean }>`
position: relative;
  padding: 10px 15px;
  max-width: 60%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  border-radius: 12px;
  z-index: 1;
  background-color: transparent; /* Основной фон для чётких рамок */
  overflow: hidden; /* Чтобы псевдоэлемент не выходил за границы */

  // Добавляем размытие градиента через псевдоэлемент
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    z-index: -1;
    background: ${(props) =>
      props.isSender
        ? "linear-gradient(135deg, #b46c00, #860092)" // Градиент для отправителя
        : "linear-gradient(135deg, #2abec9, #20148f)"}; // Градиент для получателя
    filter: blur(15px); /* Размытие градиента */
    border-radius: 20px; /* Более плавные края */
  }

  // Чёткие рамки
  border-top-${(props) => (props.isSender ? "right" : "left")}-radius: 0;
  border: 2px solid transparent; /* Добавляем чёткую рамку */

`;

const Username = styled(Typography)`
  font-size: 0.85rem;
  font-weight: bold;
  margin-bottom: 5px;
  color: #c2c2c2;
`;

const MessageText = styled(Typography)`
  overflow-wrap: break-word;
  font-size: 0.95rem;
  color: #ffffff;
`;

const MessageTimestamp = styled(Typography)`
  font-size: 0.75rem;
  color: #999;
  text-align: right;
  margin-top: 5px;
`;

export default Message;
