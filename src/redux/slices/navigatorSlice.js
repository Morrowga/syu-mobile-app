// navigatorSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  routeName: null,
};

export const navigatorSlice = createSlice({
  name: 'navigator',
  initialState,
  reducers: {
    setRouteName: (state, action) => {
      state.routeName = action.payload;
    },
  },
});

export const { setRouteName } = navigatorSlice.actions;

export default navigatorSlice.reducer;
