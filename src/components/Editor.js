import React, { useEffect, useRef } from "react";
// import React from "react";
import Codemirror from "codemirror";
//to enable the mode for particular langauge we have to import that

import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/hint/javascript-hint.js";
import ACTIONS from "../Actions";

export const Editor = ({ socketRef, roomId, onCodeSyncChange }) => {
  //connecting the code editor to the textarea
  const editorRef = useRef(null);
  useEffect(() => {
    async function init() {
      //Async/Await makes it easier to write promises. The keyword 'async' before a function makes the function return a promise, always. And the keyword await is used inside async functions, which makes the program wait until the Promise resolves
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById("realTimeEditor"),
        {
          //from which input you are want to customize
          //another option is used for mode configuration
          mode: { name: "javascript", json: true },
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );

      //changes are to be embedded in the code editor
      editorRef.current.on("change", (instance, changes) => {
        // console.log(changes);

        /* 
        in console we get various keys like
        1. origin - (destructure it to get the instances)
            1.cut.
            2.paste
            3.delete 
            4.setValue
        */
        const { origin } = changes;
        const code = instance.getValue(); //it has the everyvalue which we write
        onCodeSyncChange(code);//update everytime 
        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            //sendint some data to the server
            roomId,
            code,
          });
        }

        // editorRef.current.setValue("hello world"); //- is used to set the value in editor directly
      });
    }
    init();
  }, []);

  // error handling because we are not syncing the code
  useEffect(() => {
    if (socketRef.current) {
      //now listen the above event in the server and come back to present it on ui
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        // console.log("receiving" + code);
        if (code !== null) {
          // if the editor is empty then
          editorRef.current.setValue(code); //- is used to set the value in editor directly
        }
      });
    }
    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE); //now unsubscribe all the listeners used
    };
  }, [socketRef.current]);

  return <textarea id="realTimeEditor"></textarea>;
};
