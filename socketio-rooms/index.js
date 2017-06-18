const express = require('express'),
    socketio = require('socket.io');

const app = express();
const server = app.listen(8080);
const io = socketio(server);

app.use(express.static('static'));

io.on('connection', socket => {
   const now = Date.now();
   console.log(now);
   if(now %2 == 0) {
       socket.join('even');
   }else{
       socket.join('odd');       
   }

   io.to('even').emit('event', `Even Room ${now}`);
   io.to('odd').emit('event', `Odd Room ${now}`);
   setTimeout(() => {
     io.to('even').emit('event', 'Even Room');
     io.to('odd').emit('event', 'Odd Room');
   }, 5000);
});


