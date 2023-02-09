import React from 'react';
import Login from './Screens/LoginScreen';
import Comment from './Screens/CommentsScreen';
import PostItem from './component/PostComponent';
import Map from './Screens/MapScreen';
import Registration from './Screens/RegistrationScreen';
import Home from './Screens/Home';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useUser } from './userContext';

const Stack = createStackNavigator();

export const Route = () => {
  const { isAuth } = useUser();
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
        <Stack.Screen name="Comment" component={Comment} />
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
