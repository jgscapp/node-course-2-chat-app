
//open a websocket connection with the server
var socket = io();

socket.on('getListRooms', function (rooms) {

   var sel = jQuery('<datalist></datalist>');

     rooms.forEach(function(room) {
          sel.append(jQuery('<option>').text(room));
      });

      jQuery('#rooms').html(sel);
});
