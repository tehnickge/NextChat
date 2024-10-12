export type ChatsWithLastMessage = {
  id: number;
  isGroup: boolean;
  name: string | null; // Разрешаем значение null
  createdAt: Date;
  photo: Buffer | null; // Также может быть null
  users: {
    id: number;
    photo: Buffer<ArrayBufferLike> | null;
    username: string;
  }[];
  messages: {
    id: number;
    content: string;
    image: Buffer<ArrayBufferLike> | null; // Позволяем быть null
    senderId: number;
    chatId: number;
    sender: {
      id: number;
      createdAt: Date;
      photo: Buffer<ArrayBufferLike> | null;
      username: string;
    };
  }[];
};