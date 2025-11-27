// // APPROACH FOUR - using async await && INBUILT require("fs").promises
// //   BUT NO INBUILT - utils => util.promisify(writeFile) required
// // the simplest && most recommended Approach - VERY LITTLE BoilerPLATE

// // As you can expect in this approach - all methods from => require("fs").promises => returns their results wrapped in promises
// // so you can just directly just call this versions of readFile/writeFile with an await keyword
// // You can do further operations on these results if required
const { readFile, writeFile } = require("fs").promises;

const start = async () => {
  try {
    const first = await readFile("../content/first.txt", "utf8");
    const second = await readFile("../content/second.txt", "utf-8");
    console.log(`First file result `, first);
    console.log(`Second file result `, second);
    await writeFile(
      "../content/result-mind-grenade.txt",
      `THIS is AWESOME : ${first} && ${second} \n \n`,
      { flag: "a" }
    );
  } catch (error) {
    console.log(`Read/Write operation errored out`, error);
  }
};

start();

// APPROACH FOUR - code ENDS

// // // APPROACH THREE - using async await && INBUILT utils => util.promisify(writeFile)
// // //  BUT NO INBUILT - require("fs").promises
// const { readFile, writeFile } = require("fs");
// const util = require("util");

// const readFilePromise = util.promisify(readFile);
// const writeFilePromise = util.promisify(writeFile);

// const start = async () => {
//   try {
//     const first = await readFilePromise("./content/first.txt", "utf8");
//     const second = await readFilePromise("./content/second.txt", "utf-8");
//     console.log(`First file result `, first);
//     console.log(`Second file result `, second);
//     await writeFilePromise(
//       "./content/result-mind-grenade.txt",
//       `THIS is AWESOME : ${first} && ${second}`
//     );
//   } catch (error) {
//     console.log(`Read/Write operation errored out`, error);
//   }
// };

// start();

// // APPROACH THREE - code ENDS

// // // APPROACH TWO - using Both PROMISES && async await, but
// // //    NO INBUILT utils => util.promisify(writeFile)
// // //    NO INBUILT - require("fs").promises

// const { readFile, writeFile } = require("fs");

// const getFileContentFromPath = (path, encoding = "utf8") => {
//   return new Promise((resolve, reject) => {
//     readFile(path, { encoding }, (error, fileContent) => {
//       if (error) {
//         reject(error);
//       }
//       resolve(fileContent);

//       // code after resolve will be excuted irrespective of if a promise is resolved OR rejected
//       console.log(
//         `I DON'T care whether the promise is successful or NOT I will be executed EITHER WAY`
//       );
//       // console.log(`Successfully read the first file Completed !`, fileContent);
//     });
//   });
// };

// // YOU have to write another method to implement PROMISE && async await based write operation using a method like createUpdateFileInPath()

// const start = async () => {
//   try {
//     const first = await getFileContentFromPath("./content/first.txt", "utf8");
//     const second = await getFileContentFromPath("./content/second.txt", "utf-8");
//     console.log(`First file result `, first);
//     console.log(`Second file result `, second);
//   } catch (error) {
//     console.log(`Read/Write operation errored out`, error);
//   }
// };

// start();

// // APPROACH TWO - code ENDS

// // APPROACH ONE - using JUST PROMISE -
// //    NO async await,
// //    NO INBUILT utils => util.promisify(writeFile)
// //    NO INBUILT - require("fs").promises

// const { readFile, writeFile } = require("fs");

// // getFileContentFromPath method below acts as a generic function that ASYNCHRONOUSLY read the --
// // -- file in a specified path && once the callback of the readFile is executed either successfully or it errors out then
// // It emits/returns a promise
// // This promise will either be resolved if file is read successfully with result
// // Otherwise promise will be rejected with error
// const getFileContentFromPath = (path, encoding = "utf8") => {
//   return new Promise((resolve, reject) => {
//     readFile(path, { encoding }, (error, fileContent) => {
//       if (error) {
//         reject(error);
//       }
//       resolve(fileContent);

//       // code after resolve will be excuted irrespective of if a promise is resolved OR rejected
//       console.log(
//         `I DON'T care whether the promise is successful or NOT I will be executed EITHER WAY`
//       );
//       // console.log(`Successfully read the first file Completed !`, fileContent);
//     });
//   });
// };

// // Promise subscription with then && catch - instead of using async await
// getFileContentFromPath("./content/first.txt")
//   .then((result) => console.log(result))
//   .catch((err) => console.error(err));
// getFileContentFromPath("./content/second.txt")
//   .then((result) => console.log(result))
//   .catch((err) => console.error(err));

// // YOU have to write another method to implement PROMISE based write operation like createUpdateFileInPath()
