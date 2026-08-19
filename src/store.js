import { configureStore, createSlice } from '@reduxjs/toolkit';

const animationSlice = createSlice({
  name: 'animation',
  initialState: {
    progress: 0,
    isLoaded: false
  },
  reducers: {
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
    setLoaded: (state, action) => {
      state.isLoaded = action.payload;
    }
  }
});

export const { setProgress, setLoaded } = animationSlice.actions;

export const store = configureStore({
  reducer: {
    animation: animationSlice.reducer
  }
});
