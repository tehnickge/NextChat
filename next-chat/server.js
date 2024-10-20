const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "http://89.179.242.42:3000", // Replace with your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", async (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("send_message_chat", async (data) => {
    console.log("newMsg", data);
    console.log(socket.id);
    const user = await prisma.user.findUnique({
      where: {
        id: data.senderId,
      },
      select: {
        username: true, // Выбираем только поле username
      },
    });
    data.sender = {};
    data.sender.id = data.senderId;
    data.sender.username = user.username;
    io.in(data.chatId).emit("receive_message", data);
  });

  socket.on("sends-dashboard-chats", async (newChats) => {
    socket.emit("recive_dashboard-chats", newChats);
  });

  socket.on("join_your_chats", async (userId) => {
    try {
      const userWithChats = await prisma.user.findUnique({
        where: {
          id: userId, // Условие поиска по userId
        },
        include: {
          chats: true, // Включаем связанные чаты
        },
      });
      for (const chat of userWithChats.chats) {
        console.log(await userId, "coonetct to ", chat.id, socket.id);
        await socket.join(chat.id);
      }
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("join_chat", async (roomId) => {
    socket.join(roomId);
    console.log(`user with id-${socket.id} joined room - ${roomId}`);
  });

  socket.on("send_msg", async (msg) => {
    console.log(data, "DATA");
    //This will send a message to a specific room ID
    socket.to(data.roomId).emit("receive_msg", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
