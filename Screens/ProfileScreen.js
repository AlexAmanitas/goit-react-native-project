import React from 'react';
import { useUser } from '../userContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Pressable,
  StyleSheet,
  View,
  Image,
  Text,
  ImageBackground,
  FlatList,
} from 'react-native';
import PostItem from '../component/PostComponent';

const ProfileScreen = () => {
  const { login, logOut } = useUser();
  return (
    <ImageBackground
      source={require('../assets/images/background_img2.jpg')}
      style={styles.image}
    >
      <View style={styles.box}>
        <Image
          style={styles.avatar}
          source={require('../assets/images/user.jpg')}
        />
        <Pressable onPress={logOut} style={styles.icon}>
          <MaterialCommunityIcons name="logout" size={36} color="#ccc" />
        </Pressable>
        <Text style={styles.name}>{login}</Text>
        <PostItem style={styles.post} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  box: {
    height: '70%',
    backgroundColor: '#fff',
    fontSize: 45,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'relative',
  },
  post: {
    backgroundColor: '#ccc',
    width: 343,
    height: 299,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  container: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    padding: 16,
    paddingBottom: 45,
    alignItems: 'stretch',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  avatar: {
    position: 'absolute',
    top: -76,
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 15,
    alignSelf: 'center',
  },

  icon: {
    position: 'absolute',
    top: 30,
    right: 20,
  },

  name: {
    marginTop: 92,
    marginBottom: 16,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProfileScreen;
