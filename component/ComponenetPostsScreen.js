import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const PostsScreenItem = ({ navigation, photo, title, location }) => {
  const pressComment = () => {
    navigation.navigate('Comment');
  };
  console.log(photo);
  const pressMapMarker = () => {
    navigation.navigate('Map');
  };
  // posts.map(post => {
  return (
    <View>
      <Image style={styles.image} source={{ uri: photo }} />
      <Text style={styles.signature}>{title}</Text>
      <View style={styles.signatureBox}>
        <Pressable onPress={pressComment} style={styles.viewBox}>
          <MaterialCommunityIcons name="comment" color="#ff6c00" size={24} />
          <Text style={styles.view}>8</Text>
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
  // });
};

const styles = StyleSheet.create({
  image: {
    // display: 'box',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 343,
    height: 240,
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

export default PostsScreenItem;
