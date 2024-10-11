export default interface IUser {
  id?: number;
  username: string;
  password: string;
  email: string;
  createdAt?: Date;
  photo?: Buffer;
}
