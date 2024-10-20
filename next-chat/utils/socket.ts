import { DefaultEventsMap } from "socket.io";
import { io, Socket } from "socket.io-client";

const socket: Socket<DefaultEventsMap, DefaultEventsMap> = io(
  "http://89.179.242.42:3001"
);

export default socket;
