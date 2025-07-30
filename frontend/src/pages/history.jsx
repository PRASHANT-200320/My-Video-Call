import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import styles from "../styles/History.css";

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const routeTo = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        setMeetings(history);
      } catch {
        // IMPLEMENT SNACKBAR
      }
    };
    fetchHistory();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <Box className="history-container">
      <IconButton className="home-button" onClick={() => routeTo("/home")}>
        <HomeIcon />
      </IconButton>

      {meetings.length > 0 ? (
        <Box className="cards-wrapper">
          {meetings.map((e, i) => (
            <Card key={i} variant="outlined" className="history-card">
              <CardContent>
                <Typography className="meeting-code">
                  Code: {e.meetingCode}
                </Typography>
                <Typography className="meeting-date">
                  Date: {formatDate(e.date)}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Typography className="no-history">No meeting history found.</Typography>
      )}
    </Box>
  );
}