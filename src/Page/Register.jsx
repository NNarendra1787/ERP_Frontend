// src/Page/Register.jsx
import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { register as registerUser } from "../Store/Slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "sales",
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    const result = await dispatch(registerUser(form));

    if (result.payload?.token) {
      navigate("/");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        background: "linear-gradient(135deg, #8e2de2, #4a00e0)",
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
          maxWidth: 480,
          borderRadius: 4,
          backdropFilter: "blur(10px)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          mb={3}
          sx={{ color: "#4a00e0" }}
        >
          Create Account
        </Typography>

        <form onSubmit={handleRegister}>
          <TextField
            label="Full Name"
            fullWidth
            margin="normal"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <TextField
            label="Password"
            fullWidth
            type="password"
            margin="normal"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <Select
            fullWidth
            value={form.role}
            sx={{ mt: 2 }}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="purchase">Purchase</MenuItem>
            <MenuItem value="inventory">Inventory</MenuItem>
          </Select>

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
              background: "#4a00e0",
              ":hover": { background: "#3600a8" },
            }}
          >
            Register
          </Button>

          <Typography
            textAlign="center"
            sx={{ mt: 2, cursor: "pointer", color: "#4a00e0" }}
            onClick={() => navigate("/login")}
          >
            Already have an account? <strong>Login</strong>
          </Typography>
        </form>
      </Paper>
      <Box>
        <img src="" alt="" />
      </Box>
    </Box>
  );
}
