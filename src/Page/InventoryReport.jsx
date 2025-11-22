// src/Page/InventoryReport.jsx
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
  Box,
} from "@mui/material";

import { getProducts } from "../api/productApi";
import { CSVLink } from "react-csv";

import jsPDF from "jspdf";
import "jspdf-autotable";

import PageHeader from "../Components/UI/PageHeader";
import PageCard from "../Components/UI/PageCard";

export default function InventoryReport() {
  const [products, setProducts] = useState([]);

  const loadData = async () => {
    setProducts(await getProducts());
  };

  useEffect(() => {
    loadData();
  }, []);

  const stockStatus = (stock, reorder) => {
    if (stock === 0) return "Out of Stock";
    if (stock <= reorder) return "Low Stock";
    return "In Stock";
  };

  // Export Inventory PDF
  const downloadPDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });

    doc.setFontSize(16);
    doc.text("Inventory Report", 40, 40);

    const rows = products.map((p) => [
      p.title,
      p.sku,
      p.stock,
      p.reorderLevel,
      stockStatus(p.stock, p.reorderLevel),
    ]);

    doc.autoTable({
      head: [["Product", "SKU", "Stock", "Reorder Level", "Status"]],
      body: rows,
      startY: 60,
    });

    doc.save("Inventory-Report.pdf");
  };

  return (
    <Container maxWidth="lg">
      {/* Header */}
      <PageHeader
        title="Inventory Report"
        subtitle="Track product stock levels, reorder points, and stock status."
      />

      {/* Inventory Table */}
      <PageCard>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Inventory Data
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Product</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>SKU</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Stock</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Reorder Level</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((p) => (
              <TableRow key={p._id} hover>
                <TableCell>{p.title}</TableCell>
                <TableCell>{p.sku}</TableCell>
                <TableCell>{p.stock}</TableCell>
                <TableCell>{p.reorderLevel}</TableCell>
                <TableCell>{stockStatus(p.stock, p.reorderLevel)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Export Buttons */}
        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          <Button variant="outlined" sx={{ borderRadius: 2 }}>
            <CSVLink
              data={products}
              filename="Inventory-Report.csv"
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
