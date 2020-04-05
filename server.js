const express = require('express');
const app = express();
const http = require('http');
const socketio = require('socket.io');

const sockets = {}

const getStuff = ()=>{
    return [1, 2, 3, 4, 5, 6];
};

app.use(express.static('dist'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8081");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});

app.get('/', (req, res) => {
    res.send('An alligator approaches!');
});

const server = app.listen(3000, () => console.log('Gator app listening on port 3000!'));

const io = socketio.listen(server, {log:false, origins:'*:*'});

io.on('connection', function(socket){
    console.log('a user connected!!');
    sockets[socket.id] = socket;
    socket.emit('files', getStuff());
    socket.on('disconnect', () => {
      delete sockets[socket.id];
    });  
});

