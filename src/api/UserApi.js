import api from "./axios";

// GET ALL USERS
export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

// CREATE USER
export const createUser = async (body) => {
  const res = await api.post("/users", body);
  return res.data;
};

// UPDATE ROLE
export const updateUserRole = async (id, role) => {
  const res = await api.put(`/users/${id}`, { role });
  return res.data;
};

// DELETE USER
export const deleteUser = async (id) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};
