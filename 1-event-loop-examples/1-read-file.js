// fs module's Methods to READ/WRITE data Asynchronously
const { readFile, writeFile } = require("fs");

console.log(`Started first task`);

readFile("../content/first.txt", "utf-8", (err, res) => {
  if (err) {
    console.log(`File Read operation errored out`, err);
    return null;
  }

  console.log(`File Read operation success`, res);
});

console.log(`Started second task`);
