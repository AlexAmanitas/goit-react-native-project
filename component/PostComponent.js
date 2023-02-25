import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  doc,
  addDoc,
  updateDoc,
  increment,
  getDoc,
  collection,
  getDocs,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { useEffect } from 'react';

const PostItem = ({ navigation, photo, title, location, id, uid }) => {
  const [like, setLike] = useState(0);
  const [comment, setComment] = useState(0);

  const getLikeAndComment = async () => {
    const likeRef = doc(db, 'posts', id);
    const docSnap = await getDoc(likeRef);
    setComment(docSnap.data().comment);
    setLike(docSnap.data().like);
  };

  const incrementLike = async () => {
    const likeRef = doc(db, 'posts', id);
    await updateDoc(likeRef, { like: increment(1) });
  };

  const pressComment = () => {
    console.log('fdret', navigation);
    navigation.navigate('CommentsScreen', { photo, id, uid });
  };

  const pressLike = () => {
    setLike(like + 1);
    incrementLike();
  };

  const pressMapMarker = () => {
    navigation.navigate('Map');
  };

  getLikeAndComment();

  return (
    <View>
      <Image style={styles.image} source={{ uri: photo }} />
      <Text style={styles.signature}>{title}</Text>
      <View style={styles.signatureBox}>
        <Pressable onPress={pressComment} style={styles.viewBox}>
          <MaterialCommunityIcons name="comment" color="#ff6c00" size={24} />
          <Text style={styles.view}>{comment}</Text>
        </Pressable>
        <Pressable onPress={pressLike} style={styles.likeBox}>
          <MaterialCommunityIcons
            name="thumb-up-outline"
            color="#ff6c00"
            size={24}
          />
          <Text style={styles.like}>{like}</Text>
        </Pressable>
        <Pressable onPress={pressMapMarker} style={styles.localBox}>
          <MaterialCommunityIcons
            name="map-marker-outline"
            color="#aaa"
            size={24}
          />
          <Text style={styles.local}>{location}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    // display: 'box',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 343,
    height: 240,
    borderRadius: 15,
  },
  signature: {
    marginLeft: 16,
  },

  signatureBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  viewBox: {
    alignItems: 'center',
    marginLeft: 20,
    flexDirection: 'row',
  },
  view: {
    marginLeft: 10,
  },
  likeBox: {
    alignItems: 'center',
    marginLeft: 20,
    flexDirection: 'row',
  },
  like: {
    marginLeft: 10,
  },
  localBox: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 16,
  },
  local: {
    marginLeft: 7,
  },
  // viewBox: {},
  // viewBox: {},
  // viewBox: {},
});

export default PostItem;
