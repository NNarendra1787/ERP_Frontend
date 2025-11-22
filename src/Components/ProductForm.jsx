import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

function ProductForm({ open, handleClose, onSubmit, editData }) {
  const [formData, setFormData] = useState({
    title: "",
    sku: "",
    price: "",
    stock: "",
    reorderLevel: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{editData ? "Edit Product" : "Add Product"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          name="title"
          fullWidth
          margin="normal"
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          label="SKU"
          name="sku"
          fullWidth
          margin="normal"
          value={formData.sku}
          onChange={handleChange}
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          fullWidth
          margin="normal"
          value={formData.price}
          onChange={handleChange}
        />
        <TextField
          label="Stock"
          name="stock"
          type="number"
          fullWidth
          margin="normal"
          value={formData.stock}
          onChange={handleChange}
        />
        <TextField
          label="Reorder Level"
          name="reorderLevel"
          type="number"
          fullWidth
          margin="normal"
          value={formData.reorderLevel}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {editData ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProductForm;
