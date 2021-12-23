const http = require("http");
const fs = require("fs");

//instatiate server
const httpServer = http.createServer();
httpServer.on("listening", () => console.log("Listening..."));
//when a request comes in...
httpServer.on("request", (req, res) => {
  if (req.url === "/") {
    //read html file and return immidiately
    res.end(fs.readFileSync("index.html"));
    return;
  }
  //idempotency
  if (req.url === "/upload") {
    const fileName = req.headers["file-name"];
    req.on("data", (chunk) => {
      fs.appendFileSync(fileName, chunk);
      console.log(`recieved chunk! ${chunk.length}`);
    });
    res.end("upload successful");
  }
});

httpServer.listen(7070);
