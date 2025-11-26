setInterval(() => {
  console.log(
    `I am async callback programmed to say "Hello once every 2 seconds`
  );
}, 2000);

console.log(
  `I will run first eventhough - I appear later in the app, becoz I am a synchronous piece of code`
);

// bcoz of the interval process will stay alive indefinitely unless
  // User kills process CTRL + C
  // OR any unexpected error happens
// i.e. setInterval will keep pushing new instances of the callback at every interval(here 2 secs)
// and each of that callback will be executed 