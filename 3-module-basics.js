// CommonJS - every file is a module(by default)
// Modules - Encapsulated code (only share minimum)
// [i.e. only properties, variables, functions exported EXPLICTLY is available in require]
const { sathish, dhivya } = require("./4-names");
const sayHi = require("./5-utils");
const data = require("./6-module-export-alrernative-syntax");

// Mindgrenade OR a CURVEBALL in this case, if you INVOKE a function inside another file or module --
// -- where its defined & then required that module - eventhough you didn't export that function --
// -- explictly it will still be executed
// -- this COUNTERINTUTIVE behaviour is helpful in some cases when working with 3rd PARTY/EXTERNAL modules.
// MY Current Understanding is when we require some files - all the content of the required file is wrapped in a function --
// --  && this function is executed once to release the contents to the importing file
// -- Is it because node's module system is based on CommonJS & before ES6,--
// -- the only way to create scope in javascript is by wrapping any variables, method in a function ?? i.e. no module or block scope
// -- does CommonJS uses IIFE internally ??

const sum = require(`./7-mind-grenade`);

console.log(`data from alternative exports`, data);

// ALSO understand that Mindgrenade OR a CURVEBALL DOESN'T MEAN the FUNCTION sum itself is exposed --
// JUST that THE FUNCTION IS Executed once - when require calls a file the file is executed once
// -- the below console statement will print an empty object bcoz
console.log(`Sum definition is `, sum);

// Exports vs side effects:
// If ./7-mind-grenade does not assign to module.exports or exports,
// require('./7-mind-grenade') will give an empty object {}
// (or whatever was assigned), but its side effects
// (e.g. a console.log or a function call at top level) still happen once.

sayHi(sathish);
sayHi(dhivya);
sayHi("Baby");
