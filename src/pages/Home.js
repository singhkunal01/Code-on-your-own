import React, { useState } from "react";
//this is to use the random id generation
import { v4 as uuidV4 } from "uuid";
//this is to use the toast (popup type )when user has created the new room
import toast from "react-hot-toast";
//to redirect on the new page (editor page after clicking on JOIN )
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export const Home = () => {
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  //if both the inputs are empty
  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Username and Room Id can't be empty");
      return;
    }

    //redirecting
    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
  };

  //when user presses the enter then also it joins
  const worksOnClickingEnter = e => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  const createNewRoom = e => {
    e.preventDefault();
    const idGenerate = uuidV4();
    setRoomId(idGenerate);
    toast.success("New Room Id Created");
  };

  return (
    <>
      <Navbar />

      <div className="homePageWrapper">
        <div className="partition">
          {/*  <div className="right-image">
          <img src="Code-logo.svg" alt="Right section" />
        </div> */}
          <div className="form-wrapper">
            <img
              src="Code On Your Own.png"
              alt="Code Editor Icon"
              className="editorImg"
            />
            <h4 className="mainLabel">Enter Your ROOM ID and USERNAME </h4>
            <div className="inputGroup">
              <input
                type="text"
                className="inputBox"
                placeholder="room id"
                value={roomId}
                onKeyUp={worksOnClickingEnter}
                onChange={e => setRoomId(e.target.value)}
              />
              <input
                type="text"
                className="inputBox"
                placeholder="username"
                value={username}
                onKeyUp={worksOnClickingEnter}
                onChange={e => setUsername(e.target.value)}
              />
              <button className="btn joinBtn" onClick={joinRoom}>
                Join
              </button>
              <span className="createInfo">
                If Your Don't Have an Invite &nbsp;
                <a onClick={createNewRoom} href="" className="createNewBtn">
                  New Room
                </a>
              </span>
            </div>
          </div>
        </div>
        <footer>
          <p>
            Build With ❤ by{" "}
            <a
              href="https://github.com/singhkunal01"
              rel="noreferrer"
              target="_blank"
            >
              Kunal Singh
            </a>
          </p>
        </footer>
      </div>
    </>
  );
};
