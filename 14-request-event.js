const http = require("http");
const fs = require("fs");
const path = require("path");

const faviconPath = path.join(__dirname, "content", "favicon.ico");

console.log(`faiconpath `, faviconPath);

// const server = http.createServer((req, res) => {
//   res.end(`Welcome to our app`)
// })

// Instead of the "http.createServer" above we will use the EventEmitter API

const server = http.createServer();

// server instance above will emit an request event, every time user requests something
// we can subscribe to it & respond to the user
server.on("request", (req, res) => {
  if (req.url === "/") {
    res.end(
      `<h1 style="font-size: 32px; font-family: cursive">Welcome to our awesome app</h1>`
    );
    return;
  }

  if (req.url === "/favicon.ico") {
    fs.readFile(faviconPath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end();
        return;
      }

      res.writeHead(200, { "Content-Type": "image/x-icon" });
      res.end(data);
    });
    return;
  }
});

server.listen(5000);
