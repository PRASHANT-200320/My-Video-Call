import React, { useContext, useState } from 'react';
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import { Box, Button, IconButton, TextField, Typography, Paper } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';
import styles from "../styles/HomeComponent.css";

function HomeComponent() {
  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
  const { addToUserHistory } = useContext(AuthContext);

  const handleJoinVideoCall = async () => {
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  return (
    <Box className="home-container">
      {/* Navbar */}
      <Box className="navbar">
        <Typography variant="h5" className="navbar-title">
          Apna Video Call
        </Typography>
        <Box className="navbar-actions">
          <IconButton onClick={() => navigate("/history")}>
            <RestoreIcon />
          </IconButton>
          <Typography>History</Typography>
          <Button className="neumorphic-button" onClick={() => {
            localStorage.removeItem("token");
            navigate("/auth");
          }}>
            Logout
          </Button>
        </Box>
      </Box>

      {/* Content */}
      <Box className="content">
        <Paper elevation={0} className="neumorphic-panel">
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Providing Quality Video Call Just Like Quality Education
          </Typography>
          <Box className="input-row">
            <TextField
              fullWidth
              variant="outlined"
              label="Meeting Code"
              onChange={(e) => setMeetingCode(e.target.value)}
              className="neumorphic-input"
            />
            <Button variant="contained" onClick={handleJoinVideoCall} className="neumorphic-button">
              Join
            </Button>
          </Box>
        </Paper>

        <Box className="logo-section">
          <img src="/logo3.png" alt="App Logo" className="neumorphic-logo" />
        </Box>
      </Box>
    </Box>
  );
}

export default withAuth(HomeComponent);