import api from "./axios";

export const getPurchaseOrders = async () => {
  const res = await api.get("/purchase-orders");
  return res.data;
};

export const createPurchaseOrder = async (data) => {
  const res = await api.post("/purchase-orders", data);
  return res.data;
};
