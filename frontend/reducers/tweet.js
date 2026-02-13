import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  likeChange: false,
};

export const tweetSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {
    addTweetToStore: (state, action) => {
      state.value.push(...action.payload);
    },
    emptyTweetInStore: (state, action) => {
      state.value = [];
    },
    switchLikeChange: (state, action) => {
      state.likeChange = !state.likeChange;
    },
  },
});

export const { addTweetToStore, emptyTweetInStore, switchLikeChange } =
  tweetSlice.actions;
export default tweetSlice.reducer;
