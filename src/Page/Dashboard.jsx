import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import {
  CircularProgress,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

const MONTHS = 6;

function monthsArray(n) {
  const now = new Date();
  const arr = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    arr.push({
      label: d.toLocaleString("default", {
        month: "short",
        year: "numeric",
      }),
      month: d.getMonth(),
      year: d.getFullYear(),
      sales: 0,
      purchases: 0,
    });
  }
  return arr;
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    products: 0,
    customers: 0,
    suppliers: 0,
    salesOrders: 0,
    purchaseOrders: 0,
    invoices: 0,
  });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchStatsAndCharts();
  }, []);

  const fetchStatsAndCharts = async () => {
    try {
      setLoading(true);
      const [productsRes, customersRes, suppliersRes, soRes, poRes, invoiceRes] =
        await Promise.all([
          api.get("/products"),
          api.get("/customers"),
          api.get("/suppliers"),
          api.get("/sales-orders"),
          api.get("/purchase-orders"),
          api.get("/invoices"),
        ]);

      setStats({
        products: productsRes.data.length,
        customers: customersRes.data.length,
        suppliers: suppliersRes.data.length,
        salesOrders: soRes.data.length,
        purchaseOrders: poRes.data.length,
        invoices: invoiceRes.data.length,
      });

      const buckets = monthsArray(MONTHS);

      const addToBuckets = (dateStr, field, amount = 0) => {
        if (!dateStr) return;
        const d = new Date(dateStr);
        const label = d.toLocaleString("default", {
          month: "short",
          year: "numeric",
        });
        const idx = buckets.findIndex((b) => b.label === label);
        if (idx >= 0) buckets[idx][field] += amount;
      };

      soRes.data.forEach((so) =>
        addToBuckets(
          so.orderDate || so.createdAt,
          "sales",
          so.grandTotal || so.subtotal || 0
        )
      );
      poRes.data.forEach((po) =>
        addToBuckets(
          po.orderDate || po.createdAt,
          "purchases",
          po.grandTotal || po.subtotal || 0
        )
      );
      invoiceRes.data.forEach((inv) =>
        addToBuckets(
          inv.invoiceDate || inv.createdAt,
          "sales",
          inv.grandTotal || inv.subtotal || 0
        )
      );

      setChartData(buckets);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <CircularProgress />
      </div>
    );

  return (
    <div>
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 1}}>
        Dashboard
      </Typography>
      <Typography variant="subtitle1" sx={{ color: "text.secondary", mb: 4 }}>
        Welcome to ERP System!
      </Typography>

      {/* Stat Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <DashboardCard title="Total Products" count={stats.products} />
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardCard title="Total Customers" count={stats.customers} />
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardCard title="Total Suppliers" count={stats.suppliers} />
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardCard title="Sales Orders" count={stats.salesOrders} />
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardCard title="Purchase Orders" count={stats.purchaseOrders} />
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardCard title="Invoices" count={stats.invoices} />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <PaperBox title="Sales vs Purchases (last 6 months)">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" name="Sales" />
                <Bar dataKey="purchases" name="Purchases" />
              </BarChart>
            </ResponsiveContainer>
          </PaperBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <PaperBox title="Monthly Revenue (Invoices)">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" name="Revenue" />
              </LineChart>
            </ResponsiveContainer>
          </PaperBox>
        </Grid>
      </Grid>
    </div>
  );
}

function PaperBox({ children, title }) {
  return (
    <Card
      sx={{
        mt: 4,
        boxShadow: "0 10px 30px rgba(15,23,42,0.12)",
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
}

function DashboardCard({ title, count }) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 10px 25px rgba(15,23,42,0.12)",
        background:
          "linear-gradient(135deg, #eff6ff 0%, #ffffff 40%, #dbeafe 100%)",
      }}
    >
      <CardContent sx={{ textAlign: "center", py: 3 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, color: "text.secondary", mb: 1 }}
        >
          {title}
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          {count}
        </Typography>
      </CardContent>
    </Card>
  );
}
