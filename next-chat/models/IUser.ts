export default interface IUser {
  id?: number;
  name: string;
  password: string;
  email: string;
  createdAt?: Date;
  photo?: Buffer;
}
