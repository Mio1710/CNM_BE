const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()
const port = 8000
const route = require('./app/routes')

const httpServer = require('http').createServer();
const { Server } = require("socket.io")
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000"
  }
})


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(cors({
  origin: 'http://localhost:3000'
}));

// config auth middleware
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

route(app);

const jwt = require('jsonwebtoken');
httpServer.listen(8080)
io.on('connection', (socket) => {
  console.log('a user connected', socket);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('send', (msg) => {
    // verify auth
    const token = socket.handshake.auth.token;
    const accessTokenSecret = process.env.TOKEN_SECRET;

		const verified = jwt.verify(token, accessTokenSecret);
    if (verified) {
      // handle message

      console.log('auth', socket.handshake.auth, verified.maso);
      console.log('Nhận được msg rồi nèeeeeeeeeeeeee', msg);
      const data = {
        sender: verified,
        msg
      }
      socket.broadcast.emit('receive', data);
    }
  }
  );
});

app.listen(port, function () {
  console.log('Node.js listening on port ' + port);
})