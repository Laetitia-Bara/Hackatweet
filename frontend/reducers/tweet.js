import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  likeChange: false,
  trashChange: false,
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
    switchTrashChange: (state, action) => {
      state.trashChange = !state.trashChange;
    },
  },
});

export const {
  addTweetToStore,
  emptyTweetInStore,
  switchLikeChange,
  switchTrashChange,
} = tweetSlice.actions;
export default tweetSlice.reducer;
