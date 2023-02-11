import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser, reset } from './operations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isAuth: false,
  isRefreshing: false,
  id: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser(state, action) {
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
      state.token = action.payload.token;
      state.isAuth = action.payload.isAuth;
      state.isRefreshing = action.payload.isRefreshing;
      state.id = action.payload.id;
    },
    logOutUser(state) {
      state.user.name = null;
      state.user.email = null;
      state.token = null;
      state.isAuth = false;
    },
  },
  // extraReducers: builder => {
  //   builder.addCase(reset.fulfilled, (state, action) => {
  //     state.error = action.payload;
  //   });
  //   builder
  //     .addCase(register.pending, state => {
  //       state.error = null;
  //     })
  //     .addCase(register.fulfilled, (state, action) => {
  //       state.user = action.payload.user;
  //       state.token = action.payload.token;
  //       state.isLoggedIn = true;
  //       state.error = null;
  //     })
  //     .addCase(register.rejected, (state, action) => {
  //       state.error = action.payload;
  //     });
  //   builder
  //     .addCase(logIn.pending, state => {
  //       state.error = null;
  //     })
  //     .addCase(logIn.fulfilled, (state, action) => {
  //       state.user = action.payload.user;
  //       state.token = action.payload.token;
  //       state.isLoggedIn = true;
  //       state.error = null;
  //     })
  //     .addCase(logIn.rejected, (state, action) => {
  //       state.error = action.payload;
  //     });
  //   builder.addCase(logOut.fulfilled, state => {
  //     state.user = { name: null, email: null };
  //     state.token = null;
  //     state.isLoggedIn = false;
  //   });
  //   builder
  //     .addCase(refreshUser.pending, state => {
  //       state.isRefreshing = true;
  //     })
  //     .addCase(refreshUser.fulfilled, (state, action) => {
  //       state.user = action.payload;
  //       state.isLoggedIn = true;
  //       state.isRefreshing = false;
  //       state.error = null;
  //     })
  //     .addCase(refreshUser.rejected, (state, action) => {
  //       state.isRefreshing = false;
  //       state.error = action.payload;
  //     });
  // },
});

export const { registerUser, logOutUser } = authSlice.actions;

export const authReducer = authSlice.reducer;
