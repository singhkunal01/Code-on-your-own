import { io } from "socket.io-client";

export const initSocket = async () => {

  const options = {
    "force new connection": true,
    reconnectionAttempt: "Infinity",//till how much time socket needs to run
    timeout: 10000,
    transports: ["websocket"],//by which transportation
  };
  return io(process.env.REACT_APP_BACKEND_URL, options);
};
