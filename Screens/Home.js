import { StyleSheet, View, Image, Text } from 'react-native-web';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './ProfileScreen';
import PostsScreen from './PostsScreen';
import CreatePostsScreen from './CreatePostsScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Pressable } from 'react-native';
import { logOutUser } from '../redux/auth/sliceAuth';
import { useDispatch } from 'react-redux';

const Tabs = createBottomTabNavigator();

const Home = () => {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logOutUser());
  };

  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="Публікації"
        component={PostsScreen}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: 'Публікації',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="view-grid-outline"
              color={color}
              size={size}
            />
          ),
          headerRight: () => (
            <Pressable onPress={logOut}>
              <MaterialCommunityIcons name="logout" size={24} color="black" />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="Створити публикацію"
        component={CreatePostsScreen}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: 'Створити публикацію',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Профіль"
        component={ProfileScreen}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: 'Профіль',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
