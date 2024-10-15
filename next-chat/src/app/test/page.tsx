"use client";
import { io } from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import ChatPage from "../../../components/test";

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [userName, setUserName] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [roomId, setroomId] = useState("");

  // Используем useRef для хранения экземпляра socket, чтобы избежать его пересоздания
  const socketRef = useRef<any>(null);

  useEffect(() => {
    // Создаем новое соединение только при монтировании компонента
    socketRef.current = io("http://89.179.242.42:3001");

    // Отключаем сокет при размонтировании компонента
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []); // Пустой массив зависимостей, чтобы useEffect выполнялся только один раз

  const handleJoin = () => {
    if (userName !== "" && roomId !== "") {
      console.log(userName, "userName", roomId, "roomId");
      socketRef.current.emit("join_room", roomId);
      setShowSpinner(true);
      setTimeout(() => {
        setShowChat(true);
        setShowSpinner(false);
      }, 4000);
    } else {
      alert("Please fill in Username and Room Id");
    }
  };

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
        <button onClick={handleJoin}>
          {!showSpinner ? "Join" : <div></div>}
        </button>
      </div>
      <div>
        {showChat && (
          <ChatPage
            socket={socketRef.current}
            roomId={roomId}
            username={userName}
          />
        )}
      </div>
    </div>
  );
}
