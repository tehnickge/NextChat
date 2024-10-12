// Тип для отправителя сообщения
export type Sender = {
    id: number;
    username: string;
    photo: Buffer | null; // Предположим, что photo может быть либо Buffer, либо null
  };
  
  // Тип для сообщения
  export type MessageWithSender = {
    id: number; // Предполагается, что у сообщения есть поле id (если его нет, уберите эту строку)
    content: string | null; // Содержимое сообщения, может быть null
    createdAt: Date; // Дата создания сообщения
    sender: Sender; // Отправитель сообщения
  };