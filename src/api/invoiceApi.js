import api from './axios';

export const getInvoices = async () => {
  const res = await api.get('/invoices');
  return res.data;
};

export const getInvoiceById = async (id) => {
  const res = await api.get(`/invoices/${id}`);
  return res.data;
};

export const createInvoiceFromSO = async (soId, payload = {}) => {
  const res = await api.post(`/invoices/from-sales-order/${soId}`, payload);
  return res.data;
};
