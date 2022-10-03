const { Server } = require("socket.io");
const { isEqual } = require("lodash");

const Document = require("../models/Document");

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

        socket.join(documentId);

        socket.broadcast.to(documentId).emit("user_join", { id: socket.id, nickname: username });

        const users = Array.from(io.sockets.adapter.rooms.get(documentId)).filter((item) => item !== socket.id);

        const usersWithInfo = users.map((user) => ({ id: user, nickname: io.sockets.sockets.get(user).nickname }));

        socket.emit("inform_collaborator", usersWithInfo);

        socket.emit("load_document", document.body, document.creator.googleId);

        socket.on("send_changes", (delta) => {
          socket.broadcast.to(documentId).emit("receive_changes", delta);
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
