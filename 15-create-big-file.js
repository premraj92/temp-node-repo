const { writeFileSync } = require("fs");

const noOfLinesOfTextToBeAdded = 100000;

for (let lineNumber = 1; lineNumber <= noOfLinesOfTextToBeAdded; lineNumber++) {
  writeFileSync("./content/bigFile.txt", `Hello User ${lineNumber} \n`, {
    flag: "a",
  });
}
