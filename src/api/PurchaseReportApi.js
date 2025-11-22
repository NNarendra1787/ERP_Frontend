import api from "./axios";

export const getPurchaseReport = async (params) => {
  const res = await api.get("/reports/purchase", { params });
  return res.data;
};
