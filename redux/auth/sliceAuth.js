import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, getUser, reset } from './authOperations';

const initialState = {
  name: null,
  email: null,
  token: null,
  isAuth: false,
  id: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log(action.payload);
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.id = action.payload.id;
        state.error = null;
        state.isAuth = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
      });
    builder
      .addCase(logIn.pending, state => {
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        console.log(action.payload);
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.id = action.payload.id;
        state.error = null;
        state.isAuth = true;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.error = action.payload;
      });
    builder
      .addCase(logOut.pending, state => {
        state.error = null;
      })
      .addCase(logOut.fulfilled, state => {
        state.name = null;
        state.email = null;
        state.token = null;
        state.id = null;
        state.isAuth = false;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.error = action.payload;
      });
    // builder
    //   .addCase(getUser.pending, state => {
    //     state.error = null;
    //   })
    //   .addCase(getUser.fulfilled, (state, action) => {
    //     console.log('payload', action.payload);
    //     if (action.payload) {
    //       state.name = action.payload.displayName;
    //       state.email = action.payload.email;
    //       state.token = action.payload.accessToken;
    //       state.id = action.payload.uid;
    //       state.error = null;
    //       state.isAuth = true;
    //     } else {
    //       state.name = null;
    //       state.email = null;
    //       state.token = null;
    //       state.id = null;
    //       state.isAuth = false;
    //     }
    //   })
    //   .addCase(getUser.rejected, state => {
    //     state.error = action.payload;
    //   });
    // builder
    //   .addCase(refreshUser.pending, state => {
    //     state.error = null;
    //   })
    //   .addCase(refreshUser.fulfilled, (state, action) => {
    //     console.log('payload', action.payload);
    // state.name = action.payload.displayName;
    // state.email = action.payload.email;
    // state.token = action.payload.accessToken;
    // state.id = action.payload.uid;
    // state.error = null;
    // state.isAuth = true;
    //   })
    //   .addCase(refreshUser.rejected, state => {
    //     state.error = action.payload;
    //   });
  },
  reducers: {
    refreshUser: (state, action) => {
      console.log(action.payload);
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.error = null;
      state.isAuth = true;
    },
  },
});

export const { refreshUser } = authSlice.actions;

export const authReducer = authSlice.reducer;
