import { Server } from "socket.io";
let io;
export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });
  io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id}`);
    //user join their own room
    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined room`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
export const getIo = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};
