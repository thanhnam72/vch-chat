var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server, {
  cors: {
    origin: 'http://localhost:3000',
  }
});

io.on("connection", function(socket) {
  console.log('a user connected');
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('join', (msg) => {
    console.log(msg);
  });
});

app.get("/", (req, res) => {
  res.send("Game on!!!");
});

module.exports = server;