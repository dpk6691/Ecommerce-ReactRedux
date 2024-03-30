import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "./action";

const initialState = {
  data: [],
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
        state.errorMessage = "";
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      });
  },
});

export default productSlice.reducer;
