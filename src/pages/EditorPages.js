import React, { useRef, useState, useEffect } from "react";
import {
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";
import ACTIONS from "../Actions";
import { Client } from "../components/Client";
import { Editor } from "../components/Editor";
import { initSocket } from "../socket";
import { toast } from "react-hot-toast";

export const EditorPages = () => {
  const socketRef = useRef(null); //also pass it to the editor page as a prop
  const location = useLocation();
  const codeRef = useRef(null); //to sync the code when the new user has joined

  const { roomId } = useParams(); //use params is used to get all the parameters whatever we passed
  //why only roomId will come from useParams because see in Home.js in the routers dynamically we create the url with the roomId thats why
  const reactNavigator = useNavigate();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket(); //because in the socket file the same function is async thats why we can use await here
      //send the event on the server that a client has joined

      const handleErrors = e => {
        // console.log("Socket Error", e);
        toast.error("Socket connection failed, Please try again Later.");
        reactNavigator("/");
      };

      //suppose if there is any problem in the socket then add some error handlers
      socketRef.current.on("connect_error", err => handleErrors(err));
      socketRef.current.on("connect_failed", err => handleErrors(err));

      //this below code is used to send the roomId
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username, //for reference see the code of navigation in Home.js component
        //usename is comes from the routers and to get it from there we have to use hook called useLocation
      }); //whatever the event is fired we gathered them all in a different file

      //now this happens when  socket.on() is executed in the server.js file we are listening that request here

      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            //it checks the all users list except the admin because in the whole list we are also there so first we have to exclude ourself
            toast.success(`${username} Joined the Room.`);
            // console.log(`${username} Joined the Room.`);
          }
          //now when user joins then we have to change the state of connected clients
          setClients(clients);

          /* Problem is here that if a new user is joined in between other than the joined then
          the code will not auto synced to that new user his editor is blanked so
          for syncing it we have to do this */
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );

      //working on the disconnection from the server.js
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} Left the Room.`);
        // console.log(`${username} left the Room.`);

        //now update the new list remove the user from the frontend now for that update the state
        setClients(prev => {
          return prev.filter(client => client.socketId !== socketId);
          //it will return only those values those are not equals to the current socketID
        });
      });
    };
    init();
    //always remove the listeners whichever u are used
    // we do in cleaning function
    return () => {
      socketRef.current.off(ACTIONS.JOINED); //now unsubscribe all the listeners used
      socketRef.current.off(ACTIONS.DISCONNECTED); //now unsubscribe all the listeners used
      socketRef.current.disconnect(); //to disconnected the socket
    };
  }, []);

  /* working on buttons of copy and leave */
  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID Copied Successfully To Your Clipboard");
    } catch (error) {
      toast.error("Sorry, Could not copied");
    }
  };
  const leaveRoom = async () => {
    //redirect to the homepage
    reactNavigator("/");
  };

  //dummy client list for now
  // eslint-disable-next-line no-unused-vars

  //if by chance we didn't find username by location.state then we have to handle the error and redirect on the homepage
  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="mainWrapper">
        <div className="rightSideEditorWrap">
          <Editor
            socketRef={socketRef}
            roomId={roomId}
            onCodeSyncChange={code => (codeRef.current = code)}
          />
        </div>
        <div className="leftSide">
          <div className="sub-wrapper-leftSide">
            <div className="logo">
              <img
                className="editorImg"
                src="/Code On Your Own.png"
                alt="Code Logo Img"
              />
            </div>
            <p id="borderBelowImgLogo"></p>
            <p className="connectMessage">Connected</p>
            <div className="clientsList">
              {clients.map(client => (
                <Client key={client.socketId} username={client.username} />
              ))}
            </div>
          </div>
          <button className="btn copyIdBtn" onClick={copyRoomId}>
            Copy Room ID
          </button>
          <button className="btn leaveBtn" onClick={leaveRoom}>
            Leave Room
          </button>
        </div>
      </div>
    </>
  );
};
