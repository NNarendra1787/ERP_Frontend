// src/Components/ui/PageHeader.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

export default function PageHeader({ title, subtitle }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
