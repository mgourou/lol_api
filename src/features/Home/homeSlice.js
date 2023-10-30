import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice ({
  name: 'home',
  initialState: {
    value: 0
  },
  // A CHANGER SELON LE PROJET
  reducers : {
    increment: (state) => {state.value += 1},
    decrement: (state) => {state.value -= 1}
  }
})

export const {increment, decrement} = homeSlice.actions
export default homeSlice.reducer
