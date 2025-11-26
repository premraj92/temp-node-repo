const http = require("http");

const server = http.createServer((req, res) => {
  console.log(`req url `, req.url);

  if (req.url === "/") {
    res.end(`<h1 style="font-size: 24px;font-family:cursive ">Welcome to our First App's home page made with Node</h1>`);
    return;
  }

  if (req.url === "/about") {
    res.end(`<h1 style="font-size: 24px;font-family:cursive ">We are a small entity intrested in creating apps with node</h1>`);
    return;
  }

  res.end(`
      <h1>Oops !!!</h1>
      <p style="font-size: 24px;font-family:cursive ">We can't seem to find the page you are looking for !</p>
      <a href="/" style="color:#3d0ecd; font-size: 16px; font-family: sans-serif ">Go Back Home</a>
    `);
});

server.listen(5000);
