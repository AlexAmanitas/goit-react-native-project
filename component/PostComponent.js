import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const PostItem = ({ navigation }) => {
  const [like, setLike] = useState(153);

  const pressComment = () => {
    console.log('fdret', navigation);
    navigation.navigate('Comment');
  };

  const pressLike = () => {
    setLike(like + 1);
  };

  const pressMapMarker = () => {
    navigation.navigate('Map');
  };

  return (
    <View>
      <Image
        style={styles.image}
        source={require('../assets/images/postImage.jpg')}
      />
      <Text style={styles.signature}>Forest</Text>
      <View style={styles.signatureBox}>
        <Pressable onPress={pressComment} style={styles.viewBox}>
          <MaterialCommunityIcons name="comment" color="#ff6c00" size={24} />
          <Text style={styles.view}>8</Text>
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
          <Text style={styles.local}>Ukraine</Text>
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
