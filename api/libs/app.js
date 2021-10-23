const express       = require("express");
const app           = express();
const server        = require("http").Server(app);
const cors          = require('cors');
const session       = require('cookie-session');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');

var whitelist = [
  'http://localhost:3000',
  'https://vch-chat-app.herokuapp.com'
]

var corsOptions = {
  origin: function (origin, callback) {
    if (process.env.NODE_ENV !== 'production' || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

const roomController = require('./controllers/roomController');
const roomService = require('./services/roomService');

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: '@a#b$c%d^e&f*',
  resave: true,
  saveUninitialized: true
}));

const io = require("socket.io")(server, {
  cors: {
    origin: whitelist,
  }
});

io.on("connection", function(socket) {
  console.log('a user connected');
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('join_room', async (msg) => {
    const result = await roomService.joinRoom(msg.userName, msg.roomId);

    if(result.status) {
      socket.join(msg.roomId);
    }
    socket.emit('join_room_response', result);
  });

  socket.on("rejoin_room", (msg) => {
    socket.join(msg.roomId);
  })

  socket.on('exit_room', async (msg) => {
    const result = await roomService.removeUserFromRoom(msg.userName, msg.roomId);

    if(result) {
      socket.leave(msg.roomId);
    }
    socket.emit('exit_room_response', result);
  });

  socket.on('message', async (msg) => {
    const result = await roomService.addMessage(msg.userName, msg.roomId, msg.message);
    socket.emit('message_response', result);

    if(result) {
      socket.broadcast.to(msg.roomId).emit('onMessage', {
        userName: msg.userName,
        message: msg.message
      })
    }
  });
});

app.get("/", (req, res) => {
  res.send("server is running");
});

app.use('/api/room', roomController);

module.exports = server;