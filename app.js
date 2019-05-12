var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var  config = require('./config')
var bodyParser = require('body-parser');
var pgConnection  = require('./chat/model');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

/*io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
*/
var numUsers = 0;

io.on('connection', (socket) => {
  var addedUser = false;

  socket.on("chat message", msg => {
    console.log(msg);
    io.emit("chat message", msg);
  });
  // when the client emits 'new message', this listens and executes
  socket.on('new message', (data) => {
    // we tell the client to execute 'new message'
    console.log("incomeing msg :",data);
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', (username) => {
    if (addedUser) return;

    // we store the username in the socket session for this client
    console.log("user will be added :",username);
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', () => {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});

/*const ClientManager = require('./ClientManager')
const ChatroomManager = require('./ChatroomManager')
const makeHandlers = require('./handlers')

const clientManager = ClientManager()
const chatroomManager = ChatroomManager()

io.on('connection', function (client) {
  const {
    handleRegister,
    handleJoin,
    handleLeave,
    handleMessage,
    handleGetChatrooms,
    handleGetAvailableUsers,
    handleDisconnect
  } = makeHandlers(client, clientManager, chatroomManager)

  console.log('client connected...', client.id)
  clientManager.addClient(client)

  client.on('register', handleRegister)

  client.on('join', handleJoin)

  client.on('leave', handleLeave)

  client.on('message', handleMessage)

  client.on('chatrooms', () => {
    var listRooms = handleGetChatrooms();
    client.emit(JSON.stringify(listRooms));
    
  })

  client.on('availableUsers', handleGetAvailableUsers)

  client.on('disconnect', function () {
    console.log('client disconnect...', client.id)
    handleDisconnect()
  })

  client.on('error', function (err) {
    console.log('received error from client:', client.id)
    console.log(err)
  })
})
*/app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Allow', 'POST GET DELETE PUT HEAD');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  res.setHeader('Access-Control-Expose-Headers', 'X-Requested-With, Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json;charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('BigNodeI5', true);
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//pgConnection.connestionPg();


var chatRoutes = require('./chat/routes.js');
var userRoutes = require('./user/routes.js');

app.use('/chat/', chatRoutes);
app.use('/user/',userRoutes)

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log(`Our app is running on port ${ PORT }`);
});
