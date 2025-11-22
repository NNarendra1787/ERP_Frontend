// src/Page/Login.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../Store/Slices/authSlice";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
} from "@mui/material";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(login({ email, password }));

    if (result.payload?.token) {
      navigate("/");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        background: "linear-gradient(135deg, #4b79a1, #283e51)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 430,
          borderRadius: 4,
          backdropFilter: "blur(12px)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          mb={3}
          sx={{ color: "#283e51" }}
        >
          ERP Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email Address"
            fullWidth
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              background: "#fff",
              borderRadius: 2,
            }}
          />

          <TextField
            label="Password"
            fullWidth
            type="password"
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              background: "#fff",
              borderRadius: 2,
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.3,
              fontWeight: 700,
              borderRadius: 2,
              fontSize: "1rem",
              background: "#283e51",
              ":hover": {
                background: "#1b2b3a",
              },
            }}
          >
            Login
          </Button>

          <Typography
            textAlign="center"
            sx={{ mt: 2, cursor: "pointer", color: "#283e51" }}
            onClick={() => navigate("/register")}
          >
            Don't have an account? <strong>Register</strong>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
}
