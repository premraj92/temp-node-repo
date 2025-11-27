// An EXAMPLE where some block BLOCKING LOGIC is HANDLED SYNCHRONOUSLY & What happens

// When user hits /about page - they will be blocked for a few secs & its not just the USER WHO TRIGGERS THIS COMPLICATED
// BLOCKING LOGIC _ BUT EVERY OTHER USER who ASKED FOR SIMPLE THINGS will ALSO be BLOCKED
// If you increase the counterEnd from 1000 to 10000 or 100000 - USERS will end up waitning for minutes on end & the request may timeout
const blockingMethod = () => {
  for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 1000; j++) {
      console.log(`I am member ${j} from team ${i}`);
    }
  }
};

const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end(
      `<h1 style="font-size: 24px;font-family:cursive ">Welcome to our First App's home page made with Node</h1>`
    );
    return;
  }

  if (req.url === "/about") {
    // SOME BLOCKING CODE
    blockingMethod();
    res.end(
      `<h1 style="font-size: 24px;font-family:cursive ">We are a small entity intrested in creating apps with node</h1>`
    );
    return;
  }

  res.end(`
      <h1>Oops !!!</h1>
      <p style="font-size: 24px;font-family:cursive ">We can't seem to find the page you are looking for !</p>
      <a href="/" style="color:#3d0ecd; font-size: 16px; font-family: sans-serif ">Go Back Home</a>
    `);
});

server.listen(5000, () => {
  console.log("Started lisrening on port 5000 . . .");
});
