import api from "./axios";

export const getSupplier = async()=>{
    const res = await api.get("/suppliers");
    return res.data;
}

export const addSupplier = async (data)=>{
    const res = await api.post("/suppliers", data);
    return res.data;
}

export const updatedSupplier = async(id, data)=>{
    const res = await api.put(`/suppliers/${id}`, data);
    return res.data;
}

export const deleteSupplier = async (id)=>{
    const res = await api.delete(`supplier/${id}`);
    return res.data;
}