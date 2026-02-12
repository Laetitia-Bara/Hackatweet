import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const tweetSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {
    addTweetToStore: (state, action) => {
      state.value.push(...action.payload);
    },
  },
});

export const { addTweetToStore } = tweetSlice.actions;
export default tweetSlice.reducer;
