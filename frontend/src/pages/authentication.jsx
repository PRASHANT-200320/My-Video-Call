import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  Snackbar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../contexts/AuthContext";

const defaultTheme = createTheme();

const backgrounds = [
  "linear-gradient(to right, #ff6e7f, #bfe9ff)",
  "linear-gradient(to right, #2193b0, #6dd5ed)",
  "linear-gradient(to right, #cc2b5e, #753a88)",
  "linear-gradient(to right, #bdc3c7, #2c3e50)",
  "linear-gradient(to right, #4568dc, #b06ab3)",
  "#1e88e5",
  "#43a047",
  "#fbc02d",
  "#6a1b9a",
];

export default function Authentication() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [formState, setFormState] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [randomBg, setRandomBg] = React.useState("");

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  const handleAuth = async () => {
    try {
      if (formState === 0) {
        await handleLogin(username, password);
      } else {
        const result = await handleRegister(name, username, password);
        setUsername("");
        setPassword("");
        setName("");
        setMessage(result);
        setError("");
        setOpen(true);
        setFormState(0);
      }
    } catch (err) {
      const msg = err?.response?.data?.message || "Something went wrong.";
      setError(msg);
    }
  };

  const getRandomBackground = () => {
    const bg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    setRandomBg(bg);
  };

  React.useEffect(() => {
    getRandomBackground();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      {/* Dynamic Background */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          background: randomBg,
          zIndex: -2,
          transition: "background 0.5s ease-in-out",
        }}
      />

      {/* Optional Blur Overlay */}
      <Box
        sx={{
          position: "fixed",
          width: "100%",
          height: "100vh",
          bgcolor: "rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(3px)",
          zIndex: -1,
        }}
      />

      <Grid
        container
        component="main"
        sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}
      >
        <Grid
          item
          xs={11}
          sm={8}
          md={4}
          component={Paper}
          elevation={10}
          sx={{
            borderRadius: 4,
            p: 4,
            background: "rgba(255, 255, 255, 0.9)",
            boxShadow: "0px 8px 32px rgba(0,0,0,0.2)",
            backdropFilter: "blur(6px)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" fontWeight="bold">
              {formState === 0 ? "Welcome Back" : "Create Account"}
            </Typography>

            {/* Toggle Buttons */}
            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
              <Button
                variant={formState === 0 ? "contained" : "outlined"}
                onClick={() => setFormState(0)}
              >
                Sign In
              </Button>
              <Button
                variant={formState === 1 ? "contained" : "outlined"}
                onClick={() => setFormState(1)}
              >
                Sign Up
              </Button>
            </Box>

            {/* Form Fields */}
            <Box
              component="form"
              autoComplete="on"
              noValidate
              sx={{ mt: 3, width: "100%" }}
            >
              {formState === 1 && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={
                  formState === 1 ? "new-password" : "current-password"
                }
              />

              {error && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}

              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, py: 1.2, fontWeight: "bold" }}
                onClick={handleAuth}
              >
                {formState === 0 ? "Login" : "Register"}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Snackbar Feedback */}
      <Snackbar open={open} autoHideDuration={4000} message={message} />
    </ThemeProvider>
  );
}
