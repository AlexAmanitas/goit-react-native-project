import {
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { selectName, selectEmail, selectID } from '../redux/auth/selectors';
import { useSelector } from 'react-redux';
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  QuerySnapshot,
} from 'firebase/firestore';
import { storage, db } from '../firebase/config';
import PostsScreenItem from '../component/ComponenetPostsScreen';
import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { getAuth, updateProfile } from 'firebase/auth';

const PostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const name = useSelector(selectName);
  const email = useSelector(selectEmail);
  const userId = useSelector(selectID);
  const avatar = getAuth().currentUser.photoURL;

  console.log('PostsScreen');

  const getAllPosts = async () => {
    const q = query(collection(db, 'posts'));
    // const querySnapshot = await getDocs(q);
    // console.log(querySnapshot);
    // const post = [];
    // querySnapshot.forEach(doc =>
    //   post.push({
    //     ...doc.data(),
    //     id: doc.id,
    //   })
    // );
    // console.log(post);
    // setPosts(post);
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const post = [];
      querySnapshot.forEach(doc =>
        post.push({
          ...doc.data(),
          id: doc.id,
        })
      );
      console.log(post);
      setPosts(post);
    });
    return () => {
      unsubscribe();
    };
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

  console.log(posts);

  return (
    <View style={styles.wrap}>
      <View style={styles.avatar}>
        <Image style={styles.image} source={{ uri: avatar }} />
        <View style={styles.wraper}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>

      <SafeAreaView style={styles.wrap}>
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <PostsScreenItem
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
  );
};

const styles = StyleSheet.create({
  wrap: {
    overflow: 'scroll',
  },

  avatar: {
    marginTop: 16,
    padding: 16,
    flexDirection: 'row',
    backgroundColor: '#fff',
    overflow: 'scroll',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  wraper: {
    marginLeft: 8,
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 13,
    lineHeight: 15,
  },
  email: {
    fontWeight: 'normal',
    fontSize: 11,
    lineHeight: 13,
  },
});

export default PostsScreen;
