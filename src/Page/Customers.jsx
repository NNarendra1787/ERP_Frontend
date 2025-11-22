// src/Page/Customers.jsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  TableContainer,
  IconButton,
} from "@mui/material";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "../api/customerApi";

import CustomerForm from "../Components/CustomerForm";

import PageHeader from "../Components/UI/PageHeader";
import PageCard from "../Components/UI/PageCard";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const loadData = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (err) {
      toast.error("Error loading customers");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdd = () => {
    setEditData(null);
    setOpen(true);
  };

  const handleSubmit = async (data) => {
    try {
      if (editData) {
        await updateCustomer(editData._id, data);
        toast.success("Customer updated!");
      } else {
        await addCustomer(data);
        toast.success("Customer added!");
      }
      loadData();
      setOpen(false);
    } catch (err) {
      toast.error("Error saving customer");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this customer?")) return;

    try {
      await deleteCustomer(id);
      toast.success("Customer deleted");
      loadData();
    } catch (err) {
      toast.error("Error deleting customer");
    }
  };

  return (
    <Container maxWidth="lg">
      <ToastContainer />

      {/* Page Header */}
      <PageHeader
        title="Customers"
        subtitle="Manage your customer records with contact and billing details."
      />

      {/* Card Wrapper */}
      <PageCard>
        {/* Top bar / add button */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={handleAdd}
            sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
          >
            Add Customer
          </Button>
        </div>

        {/* Table */}
        <TableContainer
          component={Paper}
          sx={{ borderRadius: 2, overflow: "hidden" }}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Company</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>GST</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Address</TableCell>
                <TableCell
                  sx={{ fontWeight: 600 }}
                  align="center"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {customers.map((c) => (
                <TableRow key={c._id} hover>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.companyName}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.phone}</TableCell>
                  <TableCell>{c.gstNumber}</TableCell>
                  <TableCell>{c.address}</TableCell>

                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => {
                        setEditData(c);
                        setOpen(true);
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => handleDelete(c._id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </PageCard>

      {/* Customer Form Dialog */}
      <CustomerForm
        open={open}
        handleClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        editData={editData}
      />
    </Container>
  );
}
