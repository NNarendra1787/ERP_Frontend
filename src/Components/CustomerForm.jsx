import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

export default function CustomerForm({ open, handleClose, onSubmit, editData }) {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    address: "",
    gstNumber: "",
  });

  useEffect(() => {
    if (editData) setFormData(editData);
  }, [editData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSubmit(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{editData ? "Edit Customer" : "Add Customer"}</DialogTitle>

      <DialogContent>
        <TextField label="Customer Name" name="name" value={formData.name} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Phone" name="phone" value={formData.phone} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Address" name="address" value={formData.address} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="GST Number" name="gstNumber" value={formData.gstNumber} onChange={handleChange} fullWidth margin="normal" />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          {editData ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
