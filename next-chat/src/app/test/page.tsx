"use client";
import { io } from "socket.io-client";
import { use, useEffect, useState } from "react";
import ChatPage from "../../../components/test";
import { chatAPI } from "../../../services/ChatSirvice";
import { Box } from "@mui/material";
import { IChat } from "../../../models/IChat";

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [userName, setUserName] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [roomId, setroomId] = useState("");
  const [chats, setChats] = useState();
  const [msg, setMsg] = useState("");

  const { data } = chatAPI.useGetYourIdQuery(null);

  var socket: any;
  socket = io("http://89.179.242.42:3001");

  const handleJoin = () => {
    if (userName !== "" && roomId !== "") {
      console.log(userName, "userName", roomId, "roomId");
      socket.emit("join_room", roomId);
      socket.emit("test", data);
      setShowSpinner(true);
      // You can remove this setTimeout and add your own logic
      setTimeout(() => {
        setShowChat(true);
        setShowSpinner(false);
      }, 4000);
    } else {
      alert("Please fill in Username and Room Id");
    }
  };

  const handleSendMsg = () => {
    socket.emit("send_msg_test", { message: msg, roomId: 40 });
  };

  useEffect(() => {
    socket.on("yourchats", (userData: any) => {
      setChats(userData);
    });
    socket.on("recive_msg_test", (data: any) => {
      console.log(data);
    });
  }, [socket]);
  return (
    <div>
      <div style={{ display: showChat ? "none" : "" }}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
          disabled={showSpinner}
        />
        <input
          type="text"
          placeholder="room id"
          onChange={(e) => setroomId(e.target.value)}
          disabled={showSpinner}
        />
        <button onClick={() => handleJoin()}>
          {!showSpinner ? "Join" : <div></div>}
        </button>
      </div>
      <div>
        <ChatPage socket={socket} roomId={roomId} username={userName} />
      </div>
      <div>
        <input
          onChange={(e) => {
            setMsg(e.target.value);
          }}
        />
        <button onClick={handleSendMsg} />
        <Box>
          {chats &&
            chats.chats &&
            chats.chats.map((chat: IChat) => (
              <div key={chat.id}>{chat.name}</div>
            ))}
        </Box>
      </div>
    </div>
  );
}
