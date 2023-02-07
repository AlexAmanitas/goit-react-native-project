import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ImageBackground,
  Platform,
  Alert,
  Text,
  Pressable,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const PostItem = () => {
  return (
    <View>
      <Image
        style={styles.image}
        source={require('../assets/images/postImage.jpg')}
      />
      <Text>Forest</Text>
      <View style={styles.signatureBox}>
        <View style={styles.viewBox}>
          <MaterialCommunityIcons name="comment" color="#ff6c00" size={24} />
          <Text style={styles.view}>8</Text>
        </View>
        <View style={styles.likeBox}>
          <MaterialCommunityIcons
            name="thumb-up-outline"
            color="#ff6c00"
            size={24}
          />
          <Text style={styles.like}>153</Text>
        </View>
        <View style={styles.localBox}>
          <MaterialCommunityIcons
            name="map-marker-outline"
            color="#ccc"
            size={24}
          />
          <Text style={styles.local}>Ukraine</Text>
        </View>
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
  },
  local: {
    marginLeft: 7,
  },
  // viewBox: {},
  // viewBox: {},
  // viewBox: {},
});

export default PostItem;
