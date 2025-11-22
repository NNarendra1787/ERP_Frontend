import React from 'react'
import api from './axios'

export const getProducts = async ()=>{
    const res = await api.get("/producs");
    return res.data;
}

export const addProduct = async (data)=>{
    const res = await api.post("/products", data);
    return res.data;
}

export const deleteProduct = async (id)=>{
    const res = await api.delete(`/products/${id}`);
    return res.data;
}

export const updateProduct = async (id, data)=>{
    const res = await api.put(`/products/${id}`, data);
    return res.data;
}


