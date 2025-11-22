import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const login = createAsyncThunk('auth/login', async (creds, thunkAPI) => {
  const res = await api.post('/auth/login', creds);
  return res.data;
});

export const register = createAsyncThunk('auth/register', async (payload) => {
  const res = await api.post('/auth/register', payload);
  return res.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem('token') || null,
    status: 'idle',
    error: null
  },

  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      // ⭐ VERY IMPORTANT (YOU MISSED THIS)
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      // SAVE REGISTERED USER
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
