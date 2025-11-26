const { readFileSync, writeFileSync } = require("fs");
console.log("Started reading files . .")
const firstFile = readFileSync("./content/first.txt", "utf8");
const secondFile = readFileSync("./content/second.txt", "utf8");

console.log(firstFile, "\n", secondFile);

// fs method to create a new file OR
// update an existing file(BY default it always replace the file's entire content)
writeFileSync(
  "./content/result-sync.txt",
  `This new file combines contents of two files \n ${firstFile}, \n ${secondFile} \n\n`
);

// If you want to APPEND the new content to an existing component use
writeFileSync(
  "./content/result-sync.txt",
  `APPENDED TEXT \n This new file combines contents of two files \n ${firstFile}, \n ${secondFile} \n\n`,
  { flag: "a" }
);

console.log("Done with synchronous 'read' & 'write' operations of files")
console.log('Will Continue executing pending code')
