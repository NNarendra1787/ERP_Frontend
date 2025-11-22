// src/Page/Suppliers.jsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  IconButton,
} from "@mui/material";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getSupplier,
  addSupplier,
  updatedSupplier,
  deleteSupplier,
} from "../api/supplierApi";

import SupplierForm from "../Components/SupplierForm";

import PageHeader from "../Components/UI/PageHeader";
import PageCard from "../Components/UI/PageCard";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const loadData = async () => {
    try {
      const data = await getSupplier();
      setSuppliers(data);
    } catch (err) {
      toast.error("Error loading suppliers");
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
        await updatedSupplier(editData._id, data);
        toast.success("Supplier updated!");
      } else {
        await addSupplier(data);
        toast.success("Supplier added!");
      }
      loadData();
      setOpen(false);
    } catch (err) {
      toast.error("Error saving supplier");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this supplier?")) return;

    try {
      await deleteSupplier(id);
      toast.success("Supplier deleted");
      loadData();
    } catch (err) {
      toast.error("Error deleting supplier");
    }
  };

  return (
    <Container maxWidth="lg">
      <ToastContainer />

      {/* Page header */}
      <PageHeader
        title="Suppliers"
        subtitle="Manage vendors and purchase sources."
      />

      <PageCard>
        {/* Top bar */}
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
            startIcon={<LocalShippingIcon />}
            onClick={handleAdd}
            sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
          >
            Add Supplier
          </Button>
        </div>

        {/* Table */}
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Company</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>GST</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Address</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {suppliers.map((s) => (
                <TableRow key={s._id} hover>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.companyName}</TableCell>
                  <TableCell>{s.email}</TableCell>
                  <TableCell>{s.phone}</TableCell>
                  <TableCell>{s.gstNumber}</TableCell>
                  <TableCell>{s.address}</TableCell>

                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => {
                        setEditData(s);
                        setOpen(true);
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => handleDelete(s._id)}
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

      {/* Supplier Form Dialog */}
      <SupplierForm
        open={open}
        handleClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        editData={editData}
      />
    </Container>
  );
}
