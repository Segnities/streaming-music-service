import { createSlice } from "@reduxjs/toolkit";
import { RouteObject } from "react-router";

interface InitialStateInterface {
  currentSongs: [];
  currentIndex: number;
  isActive: boolean;
  isPlaying: boolean;
  activeSong: RouteObject;
  genreListId: string;
}

const initialState: InitialStateInterface = {
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
    nextSong: (state: InitialStateInterface, action) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },
    prevSong: (state, action: { payload: number }) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state?.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state?.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },
    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
  },
});

export const { playPause, setActiveSong, nextSong, prevSong, selectGenreListId } =
  playerSlice.actions;

export default playerSlice;
