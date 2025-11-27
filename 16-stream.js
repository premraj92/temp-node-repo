const { createReadStream } = require("fs");

// const dataStream = createReadStream('./content/bigFile.txt')

const dataStream = createReadStream("./content/bigFile.txt", {
  encoding: "utf8",
  highWaterMark: 100000, //(this prop controls how many bytes are read in each iteration - default is 64kb)
});

dataStream.on("open", () => {
  console.log(`Stream has started`);
});

dataStream.on("data", (fileContent) => {
  console.log(fileContent);
});

dataStream.on("error", (err) => {
  console.log(`Readstream has errored out `, err);
});

dataStream.on("close", () => {
  console.log(`Stream has ended`);
});
