//open a websocket connection with the server
var socket = io();

//listen an event
//  socket.on('connect', () => {  //do no use arrow function, they did not work with  other browsers but chrome
socket.on('connect', function () {
  console.log('Connected  to server');

//   socket.emit('createMessage', {
//     from: "Gerry",
//     text: "That works for me"
//   });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});


socket.on('newMessage', function (message) {
  console.log('newMessage', message);
});
