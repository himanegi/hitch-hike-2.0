import socketIo from "socket.io";

let io;

export const init = (httpServer) => {
  io = socketIo(httpServer);
  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};
