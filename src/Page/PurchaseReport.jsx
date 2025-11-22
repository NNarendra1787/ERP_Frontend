// src/Page/PurchaseReport.jsx
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

import { getPurchaseReport } from "../api/PurchaseReportApi";
import { getSuppliers } from "../api/supplierApi";

import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";

import PageHeader from "../Components/UI/PageHeader";
import PageCard from "../Components/UI/PageCard";

export default function PurchaseReport() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [supplier, setSupplier] = useState("");

  const [suppliers, setSuppliers] = useState([]);
  const [purchases, setPurchases] = useState([]);

  const loadSuppliers = async () => {
    setSuppliers(await getSuppliers());
  };

  const generateReport = async () => {
    const data = await getPurchaseReport({ from, to, supplier });
    setPurchases(data);
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  const totalPurchase = purchases.reduce((sum, p) => sum + p.grandTotal, 0);

  // PDF Export Function
  const downloadPDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });

    doc.setFontSize(16);
    doc.text("Purchase Report", 40, 40);

    doc.autoTable({
      startY: 60,
      head: [["Date", "Supplier", "Total"]],
      body: purchases.map((p) => [
        new Date(p.orderDate).toLocaleDateString(),
        p.supplier?.name,
        `₹${p.grandTotal}`,
      ]),
    });

    doc.text(`Total Purchases: ₹${totalPurchase}`, 40, doc.lastAutoTable.finalY + 30);

    doc.save("Purchase-Report.pdf");
  };

  return (
    <Container maxWidth="lg">
      {/* Header */}
      <PageHeader
        title="Purchase Report"
        subtitle="Analyze and export supplier purchase history."
      />

      {/* Filter Section */}
      <PageCard>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Filters
        </Typography>

        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mb: 2 }}>
          <TextField
            label="From Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />

          <TextField
            label="To Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />

          <Select
            value={supplier}
            displayEmpty
            sx={{ minWidth: 200 }}
            onChange={(e) => setSupplier(e.target.value)}
          >
            <MenuItem value="">All Suppliers</MenuItem>
            {suppliers.map((s) => (
              <MenuItem key={s._id} value={s._id}>
                {s.name}
              </MenuItem>
            ))}
          </Select>

          <Button variant="contained" sx={{ borderRadius: 2 }} onClick={generateReport}>
            Generate
          </Button>
        </Box>
      </PageCard>

      {/* Purchase Table Section */}
      <PageCard>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Purchase Data
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Supplier</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Total</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {purchases.map((p) => (
              <TableRow key={p._id} hover>
                <TableCell>{new Date(p.orderDate).toLocaleDateString()}</TableCell>
                <TableCell>{p.supplier?.name}</TableCell>
                <TableCell>₹{p.grandTotal}</TableCell>
              </TableRow>
            ))}

            {purchases.length > 0 && (
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Total Purchases:</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>₹{totalPurchase}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Export Buttons */}
        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          <Button variant="outlined" sx={{ borderRadius: 2 }}>
            <CSVLink
              data={purchases}
              filename="Purchase-Report.csv"
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
