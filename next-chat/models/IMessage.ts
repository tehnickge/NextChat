export interface IMessage {
  id?: number;
  content: string | null;
  image: Buffer | null;
  senderId?: number;
  chatId: number;
  createdAt?: Date;
}
