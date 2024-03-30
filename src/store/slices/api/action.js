import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProducts = createAsyncThunk(
  "products/getList",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`https://fakestoreapi.com/products`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
