const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);  // websocket server,  listening events,   comunicate server-client

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

//socket emit from Admin text  welcome to the chat app
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));


  //socket broadcast emit from Admin text New user joined
   socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

   socket.on('createMessage', (message, callback) => {
     console.log('createMessage', message);
    //emit an event to every connection
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server.');  //this callback call the function from socket.emit at index.js
  //broadcast.emit send message to eveybody but the user specified
  //  socket.broadcast.emit('newMessage', {
  //    from: message.from,
  //    text: message.text,
  //   createAt: new Date().getTime()
  //   });
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('User was Disconnected');
  });
});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
