export interface IChat {
  id?: number;
  isGroup: boolean;
  name?: string;
  createdAt?: Date;
  photo?: Buffer;
}
