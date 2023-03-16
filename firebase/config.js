// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth/react-native';

const firebaseConfig = {
  apiKey: 'AIzaSyAGlWJqeYEFKbv17-0FMV92odawZEnB8vg',
  authDomain: 'react-native-hw-cc066.firebaseapp.com',
  projectId: 'react-native-hw-cc066',
  storageBucket: 'react-native-hw-cc066.appspot.com',
  messagingSenderId: '1090894437068',
  appId: '1:1090894437068:web:e4ccaf0b2fe0e504914069',
  measurementId: 'G-EQQ717K5J7',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
