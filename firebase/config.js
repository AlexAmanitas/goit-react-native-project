// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth/react-native';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
console.log(process.env);
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_API_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };
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
//Init authorization
// export const auth = getAuth(app);
//Init storage
export const storage = getStorage(app);
//Init Firestore database
export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
