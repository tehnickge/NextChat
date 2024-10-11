import { IChat } from "./IChat";
import IUserCompact from "./IUserCompact";

export interface ChatWithUser {
  chatData: IChat;
  userData: IUserCompact;
}
