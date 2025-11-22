import api from "./axios";

export const getSalesOrders = async () => {
  const res = await api.get("/sales-orders");
  return res.data;
};

export const createSalesOrder = async (data) => {
  const res = await api.post("/sales-orders", data);
  return res.data;
};

export const deleteSalesOrder = async (id) => {
  const res = await api.delete(`/sales-orders/${id}`);
  return res.data;
};
