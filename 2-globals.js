// GLOBALs - No WINDOW Object in NODE

// So what built-in global variables are available ??

// __dirname - path to current directory
console.log(`Name of the current directory is `, __dirname)

// __filename - file name
console.log(`\n \nName of the current FILE is `, __filename)

// require - function to use modules(CommonJS)

// module - info about current module (file)

// process - info about env where the program is executed

// Similar to Vaniila JS YOU Also have access to the "console" object as you see above :)

// Similar to Vaniila JS YOU also have timer functions like setInterval() && setTimeout also available globally
setInterval(() => {
  console.log(`Hello World !!`)
}, 1000)