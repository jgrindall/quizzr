const express = require('express');
//const socketio = require('socket.io');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8082;
//const sockets = {};
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('dist'));

const authenticate = (req)=>{
  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');
  return (login === 'john' && password === 'john');
};

const requireAuth = (req, res, next) => {
  if(authenticate(req)){
    return next();
  }
  res.set('WWW-Authenticate', 'Basic realm="401"');
  res.status(401).send('Authentication required.');
  return false;
};

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8081");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});

app.post('/login', (req, res)=>{
  const {username, password} = req.body;
  if(username === 'john' && password === 'john'){
    res.status(200).send({message:'Success'});
  }
  else{
    res.status(401).send({message:'Authentication required'});
  }
});

app.get("/list", (req, res)=>{
  res.status(200).send('stuff');
});

app.get("/listmore", requireAuth, (req, res)=>{
  res.status(200).send('more stuff');
});

const server = app.listen(PORT, () =>{
  console.log('listening...', PORT);
});

/*
const io = socketio.listen(server, {log:false, origins:'*:*'});

io.on('connection', function(socket){
    console.log('a user connected!!');
    sockets[socket.id] = socket;
    socket.emit('files', getStuff());
    socket.on('disconnect', () => {
      delete sockets[socket.id];
    });
});
 */

