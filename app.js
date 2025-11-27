// THIS FILE is PLACEHOLDER for the current/latest topic/functionality we are learning
// ONCE we finish learning any individual/current topics we move that code to the --
// Numbered/Indexed files here with the name of the topic
// Then we clear this file & the latest/current topic code will be started here

const http = require("http");
const fs = require("fs");

const server = http.createServer();

server.on("request", (req, res) => {
  // // If we read the bigFile synchronously & sent content of the whole file
  // // we end up transmitting the whole file at one shot
  // // which is not great for user experience
  //   const textStream = fs.readFileSync('./content/bigFile.txt')
  //   res.end(textStream)

  // A better approach would be to use streams to transmit file data as multiple chunks
  const fileStream = fs.createReadStream("./content/bigFile.txt", "utf8");

  fileStream.on("open", () => {
    console.log(`Have received a new request`);

    // fileStream instance here is of type ReadStream as you know
    // And it transmits a continuous stream of data chunks
    // these data chunks can be piped/channeled using the pipe operator below as
    // a Writeable stream
    // i.e. the pipe operator converts the ReadStream into a WritableStream
    // and it then passess the WritableStream to the res
    // Looks & behaves very similar to RxJS - conceptually & syntactically ??
    // What are the similarities & differences
    fileStream.pipe(res);
  });

  fileStream.on("error", (err) => {
    res.end(err);
  });
});

server.listen(5000, () => {
  console.log(`Have started listening for requests on port 5000 . . .`);
});