import { Avatar, Box, Typography } from "@mui/material";
import { IMessage } from "../../../../models/IMessage";
import styled from "styled-components";

interface MassegeProps {
  avatarImage: Buffer<ArrayBufferLike> | null;
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
          <Avatar alt={username} />
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
  display: flex;
  align-items: flex-end;
  justify-content: ${(props) => (props.isSender ? "flex-end" : "flex-start")};
  padding: 10px;
  margin-bottom: 10px;
`;

const AvatarContainer = styled(Box)`
  margin-right: 10px;
`;

const MessageContent = styled(Box)<{ isSender: boolean }>`
  background-color: ${(props) => (props.isSender ? "#dcf8c6" : "#ffffff")};
  border-radius: 16px;
  padding: 10px 15px;
  max-width: 60%;
  position: relative;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  border-top-${(props) => (props.isSender ? "right" : "left")}-radius: 0;
`;

const Username = styled(Typography)`
  font-size: 0.85rem;
  font-weight: bold;
  margin-bottom: 5px;
  color: #4a4a4a;
`;

const MessageText = styled(Typography)`
  font-size: 0.95rem;
  color: #333;
`;

const MessageTimestamp = styled(Typography)`
  font-size: 0.75rem;
  color: #999;
  text-align: right;
  margin-top: 5px;
`;

export default Message;
