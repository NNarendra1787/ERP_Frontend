import api from "./axios";

export const createGRN = async (body) => {
  const res = await api.post("/grn", body);
  return res.data;
};

export const getGRNs = async () => {
  const res = await api.get("/grn");
  return res.data;
};
