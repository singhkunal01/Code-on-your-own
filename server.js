const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const ACTIONS = require("./src/Actions");
// const { Socket } =require('socket.io-client')
const app = express(); //making express app

const server = http.createServer(app); //making a server using express app

const io = new Server(server); //making an instance of http server through socket


/* serving our build production to the local express server */
app.use(express.static('build'));
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));//this is used to redirect on the home page ,otherwise it gives you an error because on editor page
  // we are providing the url dynamically , and express fails to route that directory
})

//mapping
const userSocketMap = {}; //this is sessional after restarting all the mapping will be removed

//function to get the list of all clients
const getAllConnectedClients = roomId => {
  //get the list of all clients from the socket with the particular roomId and return it in the form of array or the empty array
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    socketId => {
      return {
        socketId,
        username: userSocketMap[socketId], //return the list of all clients and their roomId in the form of array
      };
    }
  );
};

//this event trigger when any socket gets connected to the server
io.on("connection", socket => {
  // console.log(`Socket connected with the id ${socket.id}`);
  //in Editor.js we emit the request so now receive the request on the server (listening)

  /* Flow of code:

  When any client joins in the room then the socket.io event triggered from
  the Front end and then ACTIONS.JOIN listened with the roomId and username who joined
  then map these all values in the socketMap, then join the new user by socket.joint() in the same room
  if has invitation roomId
  Then , we loop over all clients whichever in the current room the notify the
  all clients that the new user joined with event JOINED from ACTIONS
After that we have to listen this whole event in the frontend to update the UI
  */
  
  
//for joining in the server
  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    //now mapping will be done for the particular user and RoomID
    userSocketMap[socket.id] = username;

    socket.join(roomId); //if the id exists then it will combine it otherwise it will make the new key for that newId

    /*   now suppose in general there are many clients which are connected in the room and then the new client joined then
    for that we have to first find the whole list and then so the message to all if the clients which
    are already in the room */

    const clients = getAllConnectedClients(roomId);
    // console.log(clients);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      }); //emitting the message to every client whoc ever is currently in the room but till now it has also the current user (admin)
    });
  });

//listening the event which was emitted in the editor file of code change
  socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
    socket.in(roomId).emit(ACTIONS.CODE_CHANGE, {
     code,
   })
/*     io.to(roomId).emit(ACTIONS.CODE_CHANGE, {
     code, //here io.to fails because it contains the user who is admin(typer) thats why code flow overwrites itself
   }) */
  })
  socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
    io.to(socketId).emit(ACTIONS.CODE_CHANGE, {
      code
    })
  });
  // when user disconnected either by the leaving or the  session out.It only run only when the browser is closed

  socket.on('disconnecting', () => {
    const rooms = [...socket.rooms];
    // console.log(rooms);
    //iterate over all rooms , get them and notify each user that the person has disconnected
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {//inside the room thats why we used in
        socketId: socket.id,
        username: userSocketMap[socket.id],
      })
})
//now removed that user from tha map
    delete userSocketMap[socket.id];
    socket.leave();//inbuilt function to leave  
    //now listening this trigger in the editorPage
  })


});

//listerning the server at port

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`server started on server ${PORT}`));
