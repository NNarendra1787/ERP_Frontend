import api from "./axios";

export const getSalesReport = async (params) => {
  const res = await api.get("/reports/sales", { params });
  return res.data;
};
