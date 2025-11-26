const { readFile, writeFile } = require("fs");

console.log("Started reading files . .");
readFile("./content/first.txt", { encoding: "utf8" }, (err, res) => {
  if (err) {
    console.log(`Error happend on first file read`);
    return null;
  }

  const first = res;
  console.log(res);

  readFile("./content/second.txt", { encoding: "utf8" }, (err, res) => {
    if (err) {
      console.log(`Error happend on second file read `);
      return null;
    }

    const second = res;
    console.log(res);

    writeFile(
      "./content/result-sync.txt",
      `\n This content is written via an "async" | "writeFile" method . .\n\n Here is the final result from the text files \n ${first} \n ${second} \n`,
      (err, res) => {
        if (err) {
          console.log(`Error happend on new file write `);
          return null;
        }

        console.log("Done writing to the result-sync.txt file");
      }
    );
  });
});

console.log("Will Continue executing pending code");
