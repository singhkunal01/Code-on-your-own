const ACTIONS = {
  JOIN: "join",//message to join
  JOINED: "joined", //it fired when the person joined the room 
  DISCONNECTED: "disconnected", //when the server is diconnected
  CODE_CHANGE: "code-change",//when the peoples in rooms change the code
  SYNC_CODE: "sync-code",//synchronisation of code with each other
  LEAVE: "Leave",//when a person leave the room
};

module.exports = ACTIONS;//all the values in object exports so that we import them
