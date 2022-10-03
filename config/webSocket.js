const { Server } = require("socket.io");

const webSocket = (server) => {
  const io = new Server(server, {
    path: "/socket.io",
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    socket.on("get_document", async (documentId, username) => {

    });
  });
};

module.exports = webSocket;
