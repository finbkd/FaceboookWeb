import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { socketInit } from "../../context/socket";
import styles from "../../styles/VideoCall.module.css";

// client-side

const Videocall = () => {
  let Peer;
  if (typeof navigator !== "undefined") {
    Peer = require("peerjs").default;
  }

  const socket = useRef();
  const videoRef = useRef();
  const othervideoRef = useRef(null);

  const [stream, setStream] = useState();
  const [other, setOther] = useState();
  // const [me, setMe] = useState();

  useEffect(() => {
    socket.current = socketInit();
  }, []);

  useEffect(() => {
    //* get user media
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
      setStream(currentStream); //Get the current streaming media, and then set it to setStream state.
      videoRef.current.srcObject = currentStream;
      //save stream to myVideo ref, so could connect it to <video />
    });
  }, []);

  useEffect(() => {
    //PEER CONNECTION

    const peer = new Peer();

    peer.on("open", function (id) {
      // setMe(id);
      console.log(`my id is ${id}`);
      socket.current.emit("join room", id);

      socket.current.on("user-joined", (userId) => {
        setOther(userId);
        peer.connect(userId);

        peer.call(userId, stream);
        console.log(`${userId} has been called`);
        console.log(`${id} this is my my id`);
        socket.current.emit("call the other user", id);
      });
    });

    socket.current.on("call the other user", (id) => {
      peer.call(id, stream);
    });

    peer.on("connection", function (conn) {});

    peer.on("call", function (call) {
      console.log("this peer is being called");
      call.answer(stream);

      call.on("stream", function (stream) {
        console.log("streaming from other user");
        // setOtherStream(stream);
        // `stream` is the MediaStream of the remote peer.
        othervideoRef.current.srcObject = stream;

        // setOtherStream(true);
        // Here you'd add it to an HTML video/canvas element.
      });
    });
  }, [stream]);

  return (
    <>
      <title>{`VideoCall | Facebook`}</title>
      <div className={styles.container}>
        <div className={styles.ourUserVideoplayer}>
          <video autoPlay playsInline controls={false} ref={videoRef}>
            Your browser does not support the video tag.
          </video>
        </div>
        <div className={styles.otherUserVideoPlayer}>
          <video autoPlay playsInline controls={false} ref={othervideoRef}>
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </>
  );
};
export default Videocall;
