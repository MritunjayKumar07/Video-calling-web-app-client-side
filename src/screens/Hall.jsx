import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";

const Hall = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubbmit = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
      // console.log({ email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback((data) => {
    // console.log(data);
    const { email, room } = data;
    // console.log(email, room);
    navigate(`/room/${room}`);
  }, []);

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket]);
  return (
    <form onSubmit={handleSubbmit}>
      <label htmlFor="email">Email ID</label>
      <input
        type="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="room">Room Number</label>
      <input
        type="text"
        id="room"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Hall;
