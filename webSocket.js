const { Server } = require("socket.io");
const { isEqual } = require("lodash");

const Document = require("./models/Document");

const webSocket = (server) => {
  const io = new Server(server, {
    path: "/socket.io",
    cors: {
      origin: process.env.CLIENT_URL,
    },
  });

  io.on("connection", (socket) => {
    socket.on("get_document", async (documentId, username) => {
      try {
        const document = await Document.findById(documentId).populate("creator");

        socket.nickname = username;

        socket.join(documentId);

        socket.emit("load_document", document.body, document.creator.googleId);

        socket.broadcast.to(documentId).emit(
          "show_my_cursor", { id: socket.id, nickname: socket.nickname }
        );

        const connectedUsers = [];
        const sockets = await io.in(documentId).fetchSockets();

        sockets.forEach((userSocket) => {
          if (userSocket.id !== socket.id) {
            connectedUsers.push({
              id: userSocket.id,
              nickname: userSocket.nickname,
            });
          }
        })

        socket.emit("show_other_cursors", connectedUsers);

        socket.on("send_changes", (delta) => {
          socket.broadcast.to(documentId).emit("receive_changes", delta, documentId);
        });

        socket.on("send_selection", function (data) {
          socket.broadcast.to(documentId).emit("receive_selection", data);
        });

        socket.on("save_document", async (body) => {
          const previousState = await Document.findById(documentId);

          if (!isEqual(previousState.body, body)) {
            await Document.findByIdAndUpdate(documentId, { body });
          }
        });
      } catch (err) {
        console.error(err);
      }
    });
  });
};

module.exports = webSocket;
