const http = require("http");
let userCount = 0;
const server = http.createServer((req, res) => {
  userCount++;
  console.log(`A New Request reached server from user ${userCount}`);
  res.end(`Hello User ${userCount}`);
});

server.listen(5000, () => {
  console.log(
    `Am Listening at port 5000 & eager to serve our esteemed users !!!`
  );
});
