// src/Page/GRN.jsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Select,
  MenuItem,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";

import { getPurchaseOrders } from "../api/purchaseOrderApi";
import { createGRN, getGRNs } from "../api/grnApi";
import { toast } from "react-toastify";

import PageHeader from "../Components/UI/PageHeader";
import PageCard from "../Components/UI/PageCard";

export default function GRN() {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [selectedPO, setSelectedPO] = useState(null);
  const [grns, setGRNs] = useState([]);

  const loadData = async () => {
    try {
      setPurchaseOrders(await getPurchaseOrders());
      setGRNs(await getGRNs());
    } catch (err) {
      toast.error("Failed to load GRN data");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const selectPO = (id) => {
    const po = purchaseOrders.find((p) => p._id === id);
    setSelectedPO(po);
  };

  const updateQty = (index, value) => {
    const updated = { ...selectedPO };
    updated.items[index].receivedQty = Number(value);
    setSelectedPO(updated);
  };

  const submitGRN = async () => {
    try {
      const body = {
        purchaseOrderId: selectedPO._id,
        receivedItems: selectedPO.items.map((i) => ({
          product: i.product._id,
          name: i.product.title,
          orderedQty: i.quantity,
          receivedQty: i.receivedQty || 0,
        })),
        remarks: "Goods Received",
      };

      await createGRN(body);
      toast.success("GRN Created Successfully!");

      setSelectedPO(null);
      setGRNs(await getGRNs());
    } catch (err) {
      toast.error("Error creating GRN");
    }
  };

  return (
    <Container maxWidth="lg">
      <PageHeader
        title="GRN (Goods Receipt Note)"
        subtitle="Record received items against a purchase order."
      />

      {/* Create GRN Form */}
      <PageCard>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Create GRN
        </Typography>

        <Select
          fullWidth
          displayEmpty
          sx={{ borderRadius: 2 }}
          onChange={(e) => selectPO(e.target.value)}
        >
          <MenuItem disabled value="">
            Select Purchase Order
          </MenuItem>

          {purchaseOrders.map((po) => (
            <MenuItem key={po._id} value={po._id}>
              {po.poNumber} — {po.supplier?.name}
            </MenuItem>
          ))}
        </Select>

        {selectedPO && (
          <div style={{ marginTop: 20 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Product</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Ordered Qty</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Received Qty</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {selectedPO.items.map((item, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{item.product.title}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        size="small"
                        sx={{ width: 120 }}
                        onChange={(e) => updateQty(index, e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Button
              variant="contained"
              sx={{ mt: 3, borderRadius: 2 }}
              onClick={submitGRN}
            >
              Submit GRN
            </Button>
          </div>
        )}
      </PageCard>

      {/* GRN List */}
      <PageCard>
        <Typography variant="h6" sx={{ mb: 2 }}>
          GRN List
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>GRN No</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Supplier</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>PO No</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {grns.map((g) => (
              <TableRow key={g._id} hover>
                <TableCell>{g.grnNumber}</TableCell>
                <TableCell>{g.supplier?.name}</TableCell>
                <TableCell>{g.purchaseOrder?.poNumber}</TableCell>
                <TableCell>
                  {new Date(g.receivedDate).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PageCard>
    </Container>
  );
}
