import { getAuth } from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  setDoc,
  onSnapshot,
  query,
  updateDoc,
} from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import {
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  View,
  Pressable,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Comment from '../component/Comment';
import { db } from '../firebase/config';
import date from 'date-and-time';
import uk from 'date-and-time/locale/uk';
import { useEffect } from 'react';

const CommentsScreen = ({ route }) => {
  const currentUid = getAuth().currentUser.uid;
  const { photo, id, uid } = route.params;
  const avatar = getAuth().currentUser.photoURL;
  const [text, setText] = useState('');
  const [comments, setComments] = useState(null);
  const [commentsCounter, setCommentsCounter] = useState(0);

  // console.log(uid, currentUid);

  date.locale(uk);

  const createPost = async () => {
    try {
      const time = date.format(new Date(), 'D MMMM YYYY | HH:mm');
      console.log({ avatar, text, time, id });
      const commentDocRef = await addDoc(
        collection(db, 'posts', id, 'comments'),
        { avatar, text, time, uid: currentUid }
      );
      // await setDoc(commentDocRef);
    } catch (error) {
      console.log(error.message);
    }
    setText('');
  };

  const getAllComments = async () => {
    const q = query(collection(db, 'posts', id, 'comments'));
    const commentRef = doc(db, 'posts', id);
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const post = [];
      querySnapshot.forEach(doc =>
        post.push({
          ...doc.data(),
          id: doc.id,
        })
      );
      updateDoc(commentRef, { comment: post.length });
      console.log(post.length);
      setComments(post);
    });

    return () => {
      unsubscribe();
    };
  };

  useEffect(() => {
    getAllComments();
  }, []);

  console.log(comments);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: photo }} />

      <SafeAreaView>
        <FlatList
          data={comments}
          renderItem={({ item }) => (
            <Comment
              avatar={item.avatar}
              text={item.text}
              time={item.time}
              postUid={uid}
              commentUid={item.uid}
            />
          )}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
      <View style={styles.inputWrap}>
        <TextInput
          onChangeText={text => setText(text)}
          style={styles.input}
          value={text}
        />
        <Pressable onPress={createPost} style={styles.button}>
          <MaterialCommunityIcons
            name="arrow-up-circle"
            size={36}
            color="#FF6C00"
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-end',
    padding: 16,
  },

  image: {
    // display: 'box',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90vw',
    height: '65vw',
    borderRadius: 15,
  },

  inputWrap: {
    flexDirection: 'row',
    // position: 'relative',
    justifyContent: 'center',
    marginTop: 50,
  },
  input: {
    width: '90vw',
    height: 44,
    padding: 10,
    paddingRight: 50,
    backgroundColor: '#E8E8E8',

    borderRadius: 10,
  },
  button: {
    position: 'absolute',
    right: 10,
    top: '7%',
  },
});

export default CommentsScreen;
