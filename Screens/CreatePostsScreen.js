import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageBackground,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CreatePostsScreen = () => {
  const [imageTitle, setImageTitle] = useState('');
  const [imageLocation, setImageLocation] = useState('');

  const imageTitleHandler = text => {
    setImageTitle(text);
  };
  const imageDownloaderHandler = () => {};

  const onSubmit = () => {
    console.log('Good');
  };

  return (
    <View styles={styles.box} backGroundColor="#fff">
      <View>
        <ImageBackground>
          <Image
            style={styles.image}
            source={require('../assets/images/postImage.jpg')}
          />
        </ImageBackground>
        <Pressable onPress={imageDownloaderHandler}>
          <Text style={styles.text}>Завантажте фото</Text>
        </Pressable>
      </View>
      <TextInput
        value={imageTitle}
        onChangeText={imageTitleHandler}
        placeholder="Назва"
        style={styles.input}
      />
      <View position="relative">
        <Pressable style={styles.mapButton}>
          <MaterialCommunityIcons name="map-marker-plus-outline" size={24} />
        </Pressable>
        <TextInput
          value={imageLocation}
          // onChangeText={imageTitleHandler}
          placeholder="Місцевість"
          style={styles.input}
        ></TextInput>
      </View>
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Опублікувати</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    backGroundColor: '#fff',
  },

  image: {
    // display: 'box',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 343,
    height: 240,
  },

  text: {
    marginTop: 10,
    textAlign: 'center',
  },

  input: {
    paddingLeft: 50,
    height: 44,
    padding: 10,
    backgroundColor: '#E8E8E8',
    marginTop: 16,
    borderRadius: 10,
  },
  mapButton: {
    position: 'absolute',
    top: 28,
    left: 10,
  },
  button: {
    backgroundColor: '#FF6C00',
    borderRadius: 32,
    padding: 16,
    marginVertical: 16,
    marginTop: 43,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

export default CreatePostsScreen;
