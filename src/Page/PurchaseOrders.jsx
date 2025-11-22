// src/Page/PurchaseOrders.jsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Paper,
  TextField,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TableContainer,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import { getSuppliers } from "../api/supplierApi";
import { getProducts } from "../api/productApi";
import {
  getPurchaseOrders,
  createPurchaseOrder,
} from "../api/purchaseOrderApi";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PageHeader from "../Components/UI/PageHeader";
import PageCard from "../Components/UI/PageCard";

export default function PurchaseOrders() {
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [items, setItems] = useState([]);

  const loadData = async () => {
    try {
      setSuppliers(await getSuppliers());
      setProducts(await getProducts());
      setOrders(await getPurchaseOrders());
    } catch (err) {
      toast.error("Failed to load data");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const addItem = () => {
    if (!selectedProduct) return toast.error("Select a product");

    const product = products.find((p) => p._id === selectedProduct);

    const newItem = {
      product: product._id,
      name: product.title,
      price: product.price,
      quantity,
      total: product.price * quantity,
    };

    setItems([...items, newItem]);
    setSelectedProduct("");
    setQuantity(1);
  };

  const removeItem = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const subtotal = items.reduce((sum, i) => sum + i.total, 0);

  const savePO = async () => {
    if (!selectedSupplier) return toast.error("Select a supplier");
    if (items.length === 0) return toast.error("Add at least one product");

    try {
      await createPurchaseOrder({
        supplier: selectedSupplier,
        items: items.map((i) => ({
          product: i.product,
          quantity: i.quantity,
          price: i.price,
        })),
      });

      toast.success("Purchase Order Created!");

      setItems([]);
      setSelectedSupplier("");

      setOrders(await getPurchaseOrders());
    } catch (err) {
      toast.error("Error saving PO");
    }
  };

  return (
    <Container maxWidth="lg">
      <ToastContainer />

      {/* Page Header */}
      <PageHeader
        title="Purchase Orders"
        subtitle="Manage supplier purchase orders for inventory replenishment."
      />

      {/* Create Purchase Order */}
      <PageCard>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Create Purchase Order
        </Typography>

        {/* Supplier Selection */}
        <TextField
          select
          fullWidth
          label="Select Supplier"
          value={selectedSupplier}
          sx={{ mb: 3 }}
          onChange={(e) => setSelectedSupplier(e.target.value)}
        >
          {suppliers.map((s) => (
            <MenuItem key={s._id} value={s._id}>
              {s.name} ({s.companyName})
            </MenuItem>
          ))}
        </TextField>

        {/* Add Product Form */}
        <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Add Products
          </Typography>

          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {/* Product Dropdown */}
            <TextField
              select
              label="Product"
              fullWidth
              value={selectedProduct}
              sx={{ minWidth: 250 }}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              {products.map((p) => (
                <MenuItem key={p._id} value={p._id}>
                  {p.title} — ₹{p.price}
                </MenuItem>
              ))}
            </TextField>

            {/* Qty Input */}
            <TextField
              label="Quantity"
              type="number"
              sx={{ width: 120 }}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />

            {/* Add Button */}
            <Button variant="contained" sx={{ borderRadius: 2 }} onClick={addItem}>
              Add
            </Button>
          </div>
        </Paper>

        {/* Items Table */}
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Product</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Qty</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Total</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index} hover>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>₹{item.price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>₹{item.total}</TableCell>
                  <TableCell>
                    <IconButton color="error" onClick={() => removeItem(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {items.length > 0 && (
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Subtotal</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>₹{subtotal}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Save Button */}
        <Button variant="contained" sx={{ mt: 3, borderRadius: 2 }} onClick={savePO}>
          Save Purchase Order
        </Button>
      </PageCard>

      {/* All Purchase Orders */}
      <PageCard>
        <Typography variant="h6" sx={{ mb: 2 }}>
          All Purchase Orders
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Supplier</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Total</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((o) => (
              <TableRow key={o._id} hover>
                <TableCell>{o.supplier?.name}</TableCell>
                <TableCell>₹{o.grandTotal}</TableCell>
                <TableCell>{new Date(o.orderDate).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PageCard>
    </Container>
  );
}
