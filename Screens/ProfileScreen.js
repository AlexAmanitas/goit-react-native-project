import React, { useState, useEffect } from 'react';
import { selectName, selectAvatar } from '../redux/auth/selectors';
import { logOut, setAvatar } from '../redux/auth/authOperations';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Pressable,
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PostItem from '../component/PostComponent';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { getAuth, updateProfile } from 'firebase/auth';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { storage, db } from '../firebase/config';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const name = useSelector(selectName);
  const avatar = useSelector(selectAvatar);
  const state = useSelector(state => state.auth);
  const auth = getAuth();
  const [posts, setPosts] = useState([]);

  const [image, setImage] = useState(auth.currentUser.photoURL);

  console.log('ProfileScreen', auth.currentUser);

  const addPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      dispatch(setAvatar(uri));
      console.log(image);
    }
  };

  const logOutHandler = () => {
    // dispatch(logOut());
    console.log(state, auth.currentUser.photoURL);
  };

  useEffect(() => {
    const q = query(collection(db, 'posts'));
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const post = [];
      querySnapshot.forEach(doc =>
        post.push({
          ...doc.data(),
          id: doc.id,
        })
      );
      console.log(post, name);
      setPosts(post);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ImageBackground
      source={require('../assets/images/background_img2.jpg')}
      style={styles.image}
    >
      <View style={styles.box}>
        <Image style={styles.avatar} source={{ uri: image }} />
        <Pressable onPress={addPhoto}>
          <Ionicons
            name="add-circle-outline"
            size={30}
            color="#FF6C00"
            style={styles.icon}
          />
        </Pressable>
        <Pressable onPress={logOutHandler} style={styles.logoutIcon}>
          <MaterialCommunityIcons name="logout" size={26} color="#aaa" />
        </Pressable>
        <Text style={styles.name}>{name}</Text>
        <SafeAreaView style={styles.wrap}>
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <PostItem
                navigation={navigation}
                title={item.imageSignature}
                photo={item.photo}
                location={item.imageLocation}
              />
            )}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
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
    marginLeft: 16,
    marginRight: 16,
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

  icon: {
    position: 'absolute',
    top: 70,
    left: 50,
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

  logoutIcon: {
    position: 'absolute',
    top: 20,
    right: 15,
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
