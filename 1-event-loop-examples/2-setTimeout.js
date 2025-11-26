// Started operating system process
console.log(`First task`);

setTimeout(() => {
  console.log(`Second task`);
});

setTimeout(() => {
  console.log(`Third task`);
}, 0);

console.log(`Fourth task`);

// Completed and exited operating system process
