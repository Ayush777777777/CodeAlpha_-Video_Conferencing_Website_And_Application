import React, { useContext, useEffect } from 'react';
import { Grid, Typography, Paper } from '@mui/material';

import { SocketContext } from './SocketContext';

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call, answerCall } =
    useContext(SocketContext);

  useEffect(() => {
    console.log('stream:', stream);
    if (myVideo.current && stream) {
      myVideo.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    console.log('call:', call);
    if (userVideo.current && callAccepted && !callEnded && call.stream) {
      // Set both video and audio tracks to the userVideo ref
      userVideo.current.srcObject = call.stream;
    }
  }, [callAccepted, callEnded, call.stream]);

  return (
    <Grid container className="gridContainer">
      {/*our own video*/}
      {stream && (
        <Paper className="paper">
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {name || 'My Name'}
            </Typography>
            <video playsInline muted ref={myVideo} autoPlay className="video" />
          </Grid>
        </Paper>
      )}

      {/*user's video and audio*/}
      {callAccepted && !callEnded && call.stream && (
        <Paper className="paper">
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {call.name || 'Guest Name'}
            </Typography>
            <video playsInline ref={userVideo} autoPlay className="video" />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;
