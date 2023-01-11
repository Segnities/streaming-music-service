import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreListId: "",
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song;

      if (action.payload?.data?.tracks?.hits) {
        state.currentSongs = action.payload.data.tracks.hits;
      } else if (action.payload?.data?.properties) {
        state.currentSongs = action.payload?.data?.tracks;
      } else {
        state.currentSongs = action.payload?.data;
      }

      state.currentIndex = action.payload?.index;
      state.isActive = true;
    },
    playPause: (state, action: { payload: boolean }) => {
      state.isPlaying = action.payload;
    },
  },
});

export const { playPause, setActiveSong } = playerSlice.actions;

export default playerSlice;
