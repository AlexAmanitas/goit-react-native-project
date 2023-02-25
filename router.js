import React from 'react';
import Login from './Screens/LoginScreen';
import CommentsScreen from './Screens/CommentsScreen';
import PostItem from './component/PostComponent';
import Map from './Screens/MapScreen';
import Registration from './Screens/RegistrationScreen';
import Home from './Screens/Home';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import {
  getAuth,
  onAuthStateChanged,
  reauthenticateWithCredential,
} from 'firebase/auth';
import { refreshUser } from './redux/auth/sliceAuth';
import { useDispatch } from 'react-redux';

const Stack = createStackNavigator();

export const Route = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  onAuthStateChanged(auth, user => {
    // console.log(user);
    if (user) {
      // console.log('User sign in', user, user.displayName);
      const { displayName, email, uid, accessToken } = user;
      // console.log(displayName, email, uid, accessToken);
      dispatch(
        refreshUser({
          name: user.displayName,
          email: user.email,
          id: user.uid,
          token: user.accessToken,
        })
      );
    } else {
      console.log('User is signed out');
    }
  });
  const isAuth = useSelector(state => state.auth.isAuth);
  console.log(isAuth);
  if (!isAuth) {
    return (
      <Stack.Navigator initialRouteName="Реєстрація" style={styles.navBox}>
        <Stack.Screen name="Реєстрація" component={Registration} />
        <Stack.Screen name="Логін" component={Login} />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator initialRouteName="home" style={styles.navBox}>
        <Stack.Screen
          name="home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="CommentsScreen" component={CommentsScreen} />
        <Stack.Screen name="PostItem" component={PostItem} />
      </Stack.Navigator>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    // backgroundColor: 'grey',
    flex: 1,
    // alignItems: 'stretch',
    // justifyContent: 'flex-end',
  },

  navBox: {
    padding: 16,

    borderColor: 'red',
  },
});
