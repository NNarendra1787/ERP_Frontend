// src/Components/ui/PageCard.jsx
import React from "react";
import { Card, CardContent } from "@mui/material";

export default function PageCard({ children, sx }) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
        mb: 3,
        ...sx,
      }}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
}
