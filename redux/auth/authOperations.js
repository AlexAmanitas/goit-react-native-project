import { Alert } from 'react-native';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  updateCurrentUser,
} from 'firebase/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { refreshUser } from './sliceAuth';
import { useDispatch } from 'react-redux';

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    console.log(credentials);
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      await updateProfile(auth.currentUser, { displayName: credentials.login });
      const updateUser = auth.currentUser;
      console.log(
        updateUser,
        updateUser.displayName,
        updateUser.email,
        updateUser.uid
      );
      // dispatch(refreshUpdupdateUser({ name: updateUser.displayName }));
      return {
        name: updateUser.displayName,
        email: updateUser.email,
        id: updateUser.uid,
        token: updateUser.accessToken,
      };
    } catch (error) {
      if (`${error}`.includes('auth/email-already-in-use')) {
        Alert.alert(
          'Юзвер з таким ємайлом вже існує))) Заходіть на сторінку логіну'
        );
      }
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/logIn',
  async (credentials, { rejectWithValue }) => {
    console.log(credentials);
    const auth = getAuth();
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      return {
        name: user.displayName,
        email: user.email,
        id: user.uid,
        token: user.accessToken,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk(
  'auth/logOut',
  async (_, { rejectWithValue }) => {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// export const getUser = createAsyncThunk(
//   'auth/getUser',
//   async (_, { rejectWithValue }) => {
//     try {
//       const auth = getAuth();
//       const userData = await onAuthStateChanged(auth, user => {
//         if (user) {
//           return user;
//         } else {
//           return null;
//         }
//       });
//       console.log(userData);
//       const userJSON = JSON.stringify(userData);
//       return JSON.parse(userJSON);
//     } catch {}
//   }
// );
