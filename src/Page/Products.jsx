// src/Page/Products.jsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { getProducts, addProduct, deleteProduct, updateProduct } from "../api/productApi";
import ProductForm from "../Components/ProductForm";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PageHeader from "../Components/UI/PageHeader";
import PageCard from "../Components/UI/PageCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchData = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setEditData(null);
    setOpen(true);
  };

  const handleSubmit = async (data) => {
    try {
      if (editData) {
        await updateProduct(editData._id, data);
        toast.success("Product updated!");
      } else {
        await addProduct(data);
        toast.success("Product added!");
      }
      fetchData();
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Error saving product");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this product?")) {
      try {
        await deleteProduct(id);
        toast.success("Product deleted");
        fetchData();
      } catch (err) {
        toast.error("Error deleting product");
      }
    }
  };

  const handleEdit = (product) => {
    setEditData(product);
    setOpen(true);
  };

  return (
    <Container maxWidth="lg">
      <ToastContainer />

      <PageHeader
        title="Products"
        subtitle="Manage your inventory items, stock and pricing."
      />

      <PageCard>
        {/* Top Bar */}
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
            startIcon={<AddIcon />}
            onClick={handleAdd}
            sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
          >
            Add Product
          </Button>
        </div>

        {/* Table */}
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>SKU</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Stock</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Reorder Level</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {products.map((p) => (
                <TableRow key={p._id} hover>
                  <TableCell>{p.title}</TableCell>
                  <TableCell>{p.sku}</TableCell>
                  <TableCell>₹{p.price}</TableCell>
                  <TableCell>{p.stock}</TableCell>
                  <TableCell>{p.reorderLevel}</TableCell>

                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => handleEdit(p)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => handleDelete(p._id)}
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

      {/* Product Form Dialog */}
      <ProductForm
        open={open}
        handleClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        editData={editData}
      />
    </Container>
  );
}

export default Products;
