const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);  // websocket server,  listening events,   comunicate server-client
var users = new Users();

app.use(express.static(publicPath));   //with USE you register a middleware

//register an even listener
io.on('connection', (socket) => {
  console.log('New user connected');

//socket emit an event to a single connection
  // socket.emit('newMessage', {
  //   from: 'Sebas',
  //   text: 'See you then',
  //   createAt: 124123
  // });




   socket.on('join', (params, callback) => {
     if (!isRealString(params.name) || !isRealString(params.room)) {
       return callback('Name and room name are required');
     }

     socket.join(params.room);
     //remove user from previous room
     users.removeUser(socket.id);
     users.addUser(socket.id, params.name, params.room);

     io.to(params.room).emit('updateUserList', users.getUserList(params.room));
     // socket.leave('name of room');

     //io.emit --> io.to('Name of room').emit
     // socket.boradcast.emit --> socket.broadcast.to('name of room').emit

     //socket emit from Admin text  welcome to the chat app
       socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));

       //socket broadcast emit from Admin text New user joined
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

     callback();
   });

   socket.on('createMessage', (message, callback) => {
     var user = users.getUser(socket.id);

     if (user && isRealString(message.text)) {
       //emit an event to every connection in the room
       io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));

     }
     //emit an event to every connection
     //io.emit('newMessage', generateMessage(message.from, message.text));
    callback('');  //this callback call the function from socket.emit at index.js
  //broadcast.emit send message to eveybody but the user specified
  //  socket.broadcast.emit('newMessage', {
  //    from: message.from,
  //    text: message.text,
  //   createAt: new Date().getTime()
  //   });
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);

    if (user ) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
    //io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
   var user = users.removeUser(socket.id);

   if (user) {
     io.to(user.room).emit('updateUserList', users.getUserList(user.room));
     io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
   }
  });
});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
