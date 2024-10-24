// Тип для отправителя сообщения
export type Sender = {
  id: number;
  username: string;
};

// Тип для сообщения
export type MessageWithSender = {
  id: number; // Предполагается, что у сообщения есть поле id (если его нет, уберите эту строку)
  content: string | null; // Содержимое сообщения, может быть null
  createdAt: Date; // Дата создания сообщения
  sender: Sender; // Отправитель сообщения
};
