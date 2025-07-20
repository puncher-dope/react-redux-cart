import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  confirmed: false,
};

export const createOrder = createAsyncThunk(
    "createOrder",
     async () => {
  const res = await fetch("https://mocki.io/v1/028f7a08-1860-4639-a282-ce76bde05976");
  const data: {success:boolean} = await res.json();

  if (!data.success) throw new Error("Something goes wrong");
});

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.loading = false;
        state.confirmed = true;
      })
      .addCase(createOrder.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;