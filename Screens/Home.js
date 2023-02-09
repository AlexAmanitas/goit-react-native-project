import { StyleSheet, View, Image, Text, Pressable } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './ProfileScreen';
import PostsScreen from './PostsScreen';
import CreatePostsScreen from './CreatePostsScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useUser } from '../userContext';

const Tabs = createBottomTabNavigator();

const Home = () => {
  const { logOut } = useUser();

  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="Публікації"
        component={PostsScreen}
        options={{
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
