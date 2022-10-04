const app = require("../app");
const http = require("http");
const webSocket = require("../webSocket");

const port = process.env.PORT || 8001;

app.set("port", port);

const server = http.createServer(app);

server.listen(port, () => console.log(`✅ Server listening on http://localhost:${port}`));

webSocket(server);
