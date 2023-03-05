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
import PostItem from '../component/PostComponent';
import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { getAuth, updateProfile } from 'firebase/auth';

const PostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const name = useSelector(selectName);
  const email = useSelector(selectEmail);
  // const userId = useSelector(selectID);
  const isAuth = useSelector(state => state.auth.isAuth);
  console.log(isAuth);

  console.log('PostsScreen');

  const getAllPosts = async () => {
    const q = query(collection(db, 'posts'));
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

  if (!isAuth) return;

  const avatar = getAuth().currentUser.photoURL;
  const uid = getAuth().currentUser.uid;

  console.log(posts, avatar);

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Image style={styles.image} source={{ uri: avatar }} />
        <View style={styles.wraper}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      {/* <SafeAreaView style={styles.wrap}> */}
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostItem
            navigation={navigation}
            title={item.imageSignature}
            photo={item.photo}
            imageLocation={item.imageLocation}
            uid={item.uid}
            id={item.id}
            location={item.location}
          />
        )}
        keyExtractor={item => item.id}
      />
      {/* </SafeAreaView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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

// <Tab.Navigator
// style={{ paddingTop: 9, height: 83 }}
// screenOptions={({ route }) => ({
//   tabBarShowLabel: false,
//   tabBarIcon: ({ focused, color, size }) => {
//     let iconName;

//     if (route.name === 'Публікації') {
//       iconName = 'view-grid-outline';
//     } else if (route.name === 'Створити публикацію') {
//       iconName = 'plus';
//     } else if (route.name === 'Профіль') {
//       iconName = 'account-outline';
//     }

//     return (
//       <TouchableOpacity
//         style={{
//           // marginTop: 9,
//           // marginBottom: 34,
//           width: 70,
//           height: 40,
//           borderRadius: 20,
//           backgroundColor: focused ? '#FF6C00' : '#fff',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}
//       >
//         <MaterialCommunityIcons name={iconName} color={color} size={24} />
//       </TouchableOpacity>
//     );
//   },
//   tabBarActiveTintColor: '#fff',
//   tabBarInactiveTintColor: 'gray',
//   headerRight: () => (
//     <Pressable onPress={logOutHandler}>
//       <MaterialCommunityIcons name="logout" size={24} color="black" />
//     </Pressable>
//   ),
// })}
// ></Tab.Navigator>
