import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import getTokenApi from "../api/monkeyGetToken";

export interface FavorCardState {
  favorList: Card[];
  status: "idle" | "loading" | "failed";
}

const initialState = {
  favorList: [] as Card[],
  status: "idle",
};

export const fetchFavor = createAsyncThunk("favor/fetchFavor", async () => {
  const data = await getTokenApi.myFavor();
  return data;
});

export const favorSlice = createSlice({
  name: "favor",
  initialState,
  reducers: {
    addFavor(state, action: PayloadAction<Card>) {
      const newFavor = action.payload;
      state.favorList = [...state.favorList, newFavor];
    },

    deleteFavor(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.favorList = state.favorList.filter((item) => item.id !== id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFavor.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchFavor.fulfilled, (state, action) => {
      state.status = "idle";
      if (action.payload) state.favorList = action.payload;
    });
    builder.addCase(fetchFavor.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const { addFavor, deleteFavor } = favorSlice.actions;

export default favorSlice.reducer;
