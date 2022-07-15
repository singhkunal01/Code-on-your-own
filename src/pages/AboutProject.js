import React from "react";
import { Navbar } from "../components/Navbar";
import Avatar from "react-avatar";

export const AboutProject = () => {

  return (
    <>
      <Navbar/> 
      <div className="main-container">
        <p className="heading">
          What is <span>Code-On-Your-Own </span>?
        </p>
        <div className="points-head">
          <p className="points">
            &#128073; &nbsp;Basically , <code>CODE-ON-YOUR-OWN</code> is a
            &nbsp;
            <code>Real-time Code Editor</code> &nbsp;which is used for the
            coding purpose in Interviews or for the personal use also.
          </p>
          <p className="points">
            &#128073; &nbsp; You can Use This Because You can connect as many as
            peoples You Want by the Same <code>Room Id</code>
            &nbsp;and see the Changes at Real Time .
          </p>
        </div>
        <p className="heading">
          How Can You <span>Use </span>it ?
        </p>
        <div className="points-head">
          <p className="points">
            <span className="steps-count">Step 1 :</span>
            If You are Creating a New Room For yourself for Creating a Room then
            First Click on the &nbsp;
            <span className="new-room-msg">New Room </span>.
          </p>
          <p className="points">
            <span className="steps-count">Step 2 :</span>
            After Clicking You saw that a random <code>Room Id</code> &nbsp;is
            generated and Automatically Captured by the Room Id Input Box now
            Enter <code>Username</code>&nbsp; and Click On&nbsp;
            <button className="btn join-btnIn-about">Join</button>&nbsp; button.
          </p>
          <p className="points">
            <span className="steps-count">Step 3 :</span>
            If You have <code>Room Id</code> &nbsp; which was shared By Someone
            To you. Then Directly <code>Paste It</code>&nbsp; and Click On&nbsp;
            <button className="btn join-btnIn-about">Join</button>&nbsp; button
            after Entering Your <code>Username</code>&nbsp;.
          </p>

          <p className="points">
            <span className="steps-count">Step 4 :</span>Now you logged In and
            start Your Work. Now , If You want to&nbsp;
            <code>Connect More Peoples </code> &nbsp;in your room then In Bottom
            Right Corner Of Page You saw the&nbsp;
            <button className="btn join-btnIn-about copy-btnIn-about">
              Copy Room ID
            </button>
            &nbsp;button, After Clicking Your Room Id will
            <code>Copied To Clipboard </code> Now&nbsp; <code>Share It</code>
            &nbsp; with anyone You want. Whenever someone New Joined , whoever
            in the room currently will get the message that New user(Username of
            New user) has Joined.
          </p>
          <p className="points">
            <span className="steps-count">Step 5 :</span>
            If You want to&nbsp;
            <code>Leave the Room </code> &nbsp; then In Bottom Right Corner Of
            Page You saw the&nbsp;
            <button className="btn join-btnIn-about leave-btnIn-about">
              Leave Room
            </button>
            button. Everyone in that Room Will get a Messaage That You Left The
            Room.
          </p>
          <p className="points">
            &#128073; &nbsp; Every user Will get a &nbsp;<code>Avatar</code>
            &nbsp; according to their username like this - for Kunal singh
            &nbsp;
            <code>Avatar</code>
            &nbsp;will be like&nbsp;&nbsp;
            <Avatar name="Kunal Singh" size={45} round="9px" />
          </p>
        </div>
        <p className="heading">
          Want To <span>Connect </span>With Me ?
        </p>
        <div className="social-media-handles">
          <a
            href="https://linkedin.com/in/singhkunal01"
            rel="noreferrer"
            target="_blank"
          >
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
          <a
            href="https://github.com/singhkunal01"
            rel="noreferrer"
            target="_blank"
          >
            <i className="fa-brands fa-github"></i>
          </a>
          <a
            href="https://twitter.com/KunalSingh_01"
            rel="noreferrer"
            target="_blank"
          >
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="https://t.me/altruistic_01" rel="noreferrer" target="_blank">
            <i className="fa-brands fa-telegram"></i>
          </a>
        </div>
      </div>
    </>
  );
};
