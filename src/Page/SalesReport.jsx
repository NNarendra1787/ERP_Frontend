// src/Page/SalesReport.jsx
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
  TableRow,
  TableCell,
  Select,
  MenuItem,
  Box,
} from "@mui/material";

import { getSalesReport } from "../api/ReportApi";
import { getCustomers } from "../api/customerApi";

import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";

import PageHeader from "../Components/UI/PageHeader";
import PageCard from "../Components/UI/PageCard";

export default function SalesReport() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [customer, setCustomer] = useState("");

  const [customers, setCustomers] = useState([]);
  const [sales, setSales] = useState([]);

  const loadCustomers = async () => {
    setCustomers(await getCustomers());
  };

  const generateReport = async () => {
    const data = await getSalesReport({ from, to, customer });
    setSales(data);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const totalSales = sales.reduce((sum, s) => sum + s.grandTotal, 0);

  // Export as PDF
  const downloadPDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    doc.setFontSize(16);
    doc.text("Sales Report", 40, 40);

    doc.autoTable({
      startY: 60,
      head: [["Date", "Customer", "Total"]],
      body: sales.map((s) => [
        new Date(s.orderDate).toLocaleDateString(),
        s.customer?.name,
        `₹${s.grandTotal}`,
      ]),
    });

    doc.text(`Total Sales: ₹${totalSales}`, 40, doc.lastAutoTable.finalY + 30);

    doc.save("Sales-Report.pdf");
  };

  return (
    <Container maxWidth="lg">
      {/* Header */}
      <PageHeader title="Sales Report" subtitle="View and download customer sales performance." />

      {/* Filters */}
      <PageCard>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Filters
        </Typography>

        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mb: 2 }}>
          <TextField
            label="From Date"
            type="date"
            value={from}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setFrom(e.target.value)}
          />

          <TextField
            label="To Date"
            type="date"
            value={to}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setTo(e.target.value)}
          />

          <Select
            value={customer}
            displayEmpty
            sx={{ minWidth: 200 }}
            onChange={(e) => setCustomer(e.target.value)}
          >
            <MenuItem value="">All Customers</MenuItem>
            {customers.map((c) => (
              <MenuItem key={c._id} value={c._id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>

          <Button variant="contained" sx={{ borderRadius: 2 }} onClick={generateReport}>
            Generate
          </Button>
        </Box>
      </PageCard>

      {/* Sales Table */}
      <PageCard>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Sales Data
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Total</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sales.map((s) => (
              <TableRow key={s._id} hover>
                <TableCell>{new Date(s.orderDate).toLocaleDateString()}</TableCell>
                <TableCell>{s.customer?.name}</TableCell>
                <TableCell>₹{s.grandTotal}</TableCell>
              </TableRow>
            ))}

            {sales.length > 0 && (
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Total Sales:</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>₹{totalSales}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Export Options */}
        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          <Button variant="outlined" sx={{ borderRadius: 2 }}>
            <CSVLink
              data={sales}
              filename="Sales-Report.csv"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Export CSV
            </CSVLink>
          </Button>

          <Button variant="outlined" sx={{ borderRadius: 2 }} onClick={downloadPDF}>
            Export PDF
          </Button>
        </Box>
      </PageCard>
    </Container>
  );
}
