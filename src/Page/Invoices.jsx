// src/Page/Invoices.jsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Box,
} from "@mui/material";

import { getInvoices, createInvoiceFromSO, getInvoiceById } from "../api/invoiceApi";
import { getSalesOrders } from "../api/SalesOrderApi";

import InvoiceView, { downloadInvoicePdf, downloadInvoicePdfById } from "../Components/InvoiceView";
import { toast, ToastContainer } from "react-toastify";

import PageHeader from "../Components/UI/PageHeader";
import PageCard from "../Components/UI/PageCard";

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [salesOrders, setSalesOrders] = useState([]);
  const [viewInvoice, setViewInvoice] = useState(null);

  const loadData = async () => {
    try {
      setInvoices(await getInvoices());
      setSalesOrders(await getSalesOrders());
    } catch (err) {
      toast.error("Failed to load invoice data");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const createFromSO = async (id) => {
    try {
      await createInvoiceFromSO(id);
      toast.success("Invoice Created Successfully");
      loadData();
    } catch (err) {
      toast.error("Error creating invoice");
    }
  };

  const openView = async (id) => {
    try {
      const data = await getInvoiceById(id);
      setViewInvoice(data);
    } catch {
      toast.error("Error loading invoice details");
    }
  };

  return (
    <Container maxWidth="lg">
      <ToastContainer />

      {/* Header */}
      <PageHeader
        title="Invoices"
        subtitle="Generate and manage invoices for completed sales orders."
      />

      {/* Create Invoice From Sales Order */}
      <PageCard>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Create Invoice From Sales Order
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {salesOrders.map((so) => (
            <Button
              variant="outlined"
              key={so._id}
              onClick={() => createFromSO(so._id)}
              sx={{ borderRadius: 2 }}
            >
              Create Invoice → {so.customer?.name} (₹{so.grandTotal})
            </Button>
          ))}
        </Box>
      </PageCard>

      {/* Invoice List */}
      <PageCard>
        <Typography variant="h6" sx={{ mb: 2 }}>
          All Invoices
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Invoice No</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Total</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {invoices.map((inv) => (
              <TableRow key={inv._id} hover>
                <TableCell>{inv.invoiceNumber}</TableCell>
                <TableCell>{inv.customer?.name}</TableCell>
                <TableCell>₹{inv.grandTotal}</TableCell>
                <TableCell>{new Date(inv.invoiceDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => openView(inv._id)}>
                    View
                  </Button>
                  <Button size="small" onClick={() => downloadInvoicePdfById(inv._id)}>
                    PDF
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PageCard>

      {/* Invoice View Dialog */}
      <Dialog
        open={!!viewInvoice}
        fullWidth
        maxWidth="md"
        onClose={() => setViewInvoice(null)}
      >
        <DialogTitle>Invoice Details</DialogTitle>

        <DialogContent dividers>
          {viewInvoice && <InvoiceView data={viewInvoice} />}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setViewInvoice(null)}>Close</Button>
          <Button
            variant="contained"
            onClick={() => downloadInvoicePdf(viewInvoice)}
            sx={{ borderRadius: 2 }}
          >
            Download PDF
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
