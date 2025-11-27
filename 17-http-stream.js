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

    // fileStream instance here is of type ReadStream (Readable stream)
    // And it transmits a continuous stream of data chunks
    // The pipe operator does NOT convert ReadStream to WritableStream
    // Instead, pipe() CONNECTS the Readable stream (fileStream) to a Writable stream (res)
    // - fileStream remains a Readable stream
    // - res is already a Writable stream (HTTP response object)
    // - pipe() reads chunks from fileStream and automatically writes them to res

    // - It also handles backpressure (pausing reads when write buffer is full) i.e.
    // What does backpressure means in this context
    // ReadStream reads chunks from the file at a certain rate
    // WritableStream (res) writes chunks to the HTTP response at a certain rate
    // If writing is slower than reading (e.g., slow network connection, client consuming data slowly), the write buffer fills up
    // pipe() detects this and temporarily pauses the ReadStream
    // Once the write buffer drains (previous chunks are sent), pipe() resumes the ReadStream
    // Unhandled backpressure causes - data loss, memory overflow or system crash
    // If we don't use pipe() we have to do this backpressure handling manually by 
    // listening to appropriate events


    // Similarities of Streams with RxJS:
    // - Both use push-based, event-driven patterns
    // - Both have pipe composition for chaining operations
    // - Both handle backpressure/flow control

    // Key Differences:
    // - Node Streams: Binary/buffer focused, optimized for I/O (files, network)
    // - RxJS Observables: Value focused, optimized for transforming discrete values/events
    // - Streams have 4 types: Readable/Writable/Duplex/Transform
    // - RxJS has rich operators (map, filter, reduce); Streams have simpler transform API

    fileStream.pipe(res);
  });

  fileStream.on("error", (err) => {
    res.end(err);
  });
});

server.listen(5000, () => {
  console.log(`Have started listening for requests on port 5000 . . .`);
});
