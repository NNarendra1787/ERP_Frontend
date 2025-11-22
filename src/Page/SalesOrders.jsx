// src/Page/SalesOrders.jsx
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

import { getCustomers } from "../api/customerApi";
import { getProducts } from "../api/productApi";
import { createSalesOrder, getSalesOrders } from "../api/SalesOrderApi";

import PageHeader from "../Components/UI/PageHeader";
import PageCard from "../Components/UI/PageCard";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SalesOrders() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [items, setItems] = useState([]);

  const loadInitialData = async () => {
    try {
      setCustomers(await getCustomers());
      setProducts(await getProducts());
      setOrders(await getSalesOrders());
    } catch (err) {
      toast.error("Failed to load initial data");
    }
  };

  useEffect(() => {
    loadInitialData();
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
    const list = [...items];
    list.splice(index, 1);
    setItems(list);
  };

  const subtotal = items.reduce((sum, i) => sum + i.total, 0);

  const saveOrder = async () => {
    if (!selectedCustomer) return toast.error("Select a customer");
    if (items.length === 0) return toast.error("Add at least one item");

    try {
      await createSalesOrder({
        customer: selectedCustomer,
        items: items.map((i) => ({
          product: i.product,
          quantity: i.quantity,
          price: i.price,
        })),
      });

      toast.success("Sales Order Created!");

      setItems([]);
      setSelectedCustomer("");

      setOrders(await getSalesOrders());
    } catch (err) {
      toast.error("Error saving Sales Order");
    }
  };

  return (
    <Container maxWidth="lg">
      <ToastContainer />

      {/* Page Header */}
      <PageHeader
        title="Sales Orders"
        subtitle="Manage and create new customer sales orders."
      />

      {/* Create Sales Order Section */}
      <PageCard>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Create Sales Order
        </Typography>

        {/* Customer Selection */}
        <TextField
          select
          fullWidth
          label="Select Customer"
          sx={{ mb: 3 }}
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e.target.value)}
        >
          {customers.map((c) => (
            <MenuItem key={c._id} value={c._id}>
              {c.name} ({c.companyName})
            </MenuItem>
          ))}
        </TextField>

        {/* Add Product Section */}
        <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Add Products
          </Typography>

          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
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

            <TextField
              label="Qty"
              type="number"
              value={quantity}
              sx={{ width: 120 }}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />

            <Button variant="contained" onClick={addItem} sx={{ borderRadius: 2 }}>
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
                <TableCell sx={{ fontWeight: 600 }}></TableCell>
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

        <Button variant="contained" sx={{ mt: 3, borderRadius: 2 }} onClick={saveOrder}>
          Save Sales Order
        </Button>
      </PageCard>

      {/* All Sales Orders Section */}
      <PageCard>
        <Typography variant="h6" sx={{ mb: 2 }}>
          All Sales Orders
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Total</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((o) => (
              <TableRow key={o._id} hover>
                <TableCell>{o.customer?.name}</TableCell>
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
