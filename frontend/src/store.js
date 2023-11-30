import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = {
  isLogged     : false,
  name         : '',
  email        : '',
  authByGoogle : false,
};

// Define the user function to handle login and logout actions
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogged     = true;
      state.name         = action.payload.name;
      state.email        = action.payload.email;
      state.authByGoogle = action.payload.authByGoogle;
    },
    logout: (state) => {
      state.isLogged     = false;
      state.name         = '';
      state.email        = '';
      state.authByGoogle = false;
    },
  },
});

// Export actions (login / logout)
export const { login, logout } = userSlice.actions;

// Export store
const store = configureStore({
  reducer: userSlice.reducer,
});
export default store;