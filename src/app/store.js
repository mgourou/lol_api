import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "../features/Home/homeSlice.js";

export const store = configureStore({
  reducer: {
      home: homeSlice
  }
})
