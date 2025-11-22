// src/Page/UserManagement.jsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Select,
  MenuItem,
  Box
} from "@mui/material";

import { getUsers, createUser, updateUserRole, deleteUser } from "../api/UserApi";
import { toast, ToastContainer } from "react-toastify";

import PageHeader from "../Components/UI/PageHeader";
import PageCard from "../Components/UI/PageCard";

export default function UserManagement() {
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "sales",
  });

  const loadUsers = async () => {
    try {
      setUsers(await getUsers());
    } catch {
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreate = async () => {
    try {
      await createUser(form);
      toast.success("User created successfully");
      setForm({ name: "", email: "", password: "", role: "sales" });
      loadUsers();
    } catch {
      toast.error("Error creating user");
    }
  };

  const changeRole = async (id, role) => {
    try {
      await updateUserRole(id, role);
      toast.success("Role updated");
      loadUsers();
    } catch {
      toast.error("Failed to update role");
    }
  };

  const remove = async (id) => {
    try {
      await deleteUser(id);
      toast.success("User deleted");
      loadUsers();
    } catch {
      toast.error("Error deleting user");
    }
  };

  return (
    <Container maxWidth="lg">
      <ToastContainer />

      {/* Page Header */}
      <PageHeader
        title="User Management"
        subtitle="Manage application users, roles, and permissions."
      />

      {/* Create User */}
      <PageCard>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Create User
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            mb: 2,
          }}
        >
          <TextField
            label="Full Name"
            value={form.name}
            sx={{ minWidth: 220 }}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <TextField
            label="Email"
            value={form.email}
            sx={{ minWidth: 220 }}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <TextField
            label="Password"
            type="password"
            value={form.password}
            sx={{ minWidth: 220 }}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <Select
            value={form.role}
            sx={{ minWidth: 160, height: 56 }}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="purchase">Purchase</MenuItem>
            <MenuItem value="inventory">Inventory</MenuItem>
          </Select>

          <Button
            variant="contained"
            sx={{ height: 56, borderRadius: 2 }}
            onClick={handleCreate}
          >
            Add User
          </Button>
        </Box>
      </PageCard>

      {/* Users Table */}
      <PageCard>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Users List
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Change Role</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Delete</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((u) => (
              <TableRow key={u._id} hover>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.role}</TableCell>

                <TableCell>
                  <Select
                    value={u.role}
                    sx={{ minWidth: 150 }}
                    onChange={(e) => changeRole(u._id, e.target.value)}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="sales">Sales</MenuItem>
                    <MenuItem value="purchase">Purchase</MenuItem>
                    <MenuItem value="inventory">Inventory</MenuItem>
                  </Select>
                </TableCell>

                <TableCell>
                  <Button color="error" onClick={() => remove(u._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PageCard>
    </Container>
  );
}
