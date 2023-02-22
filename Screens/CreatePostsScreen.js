import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
// import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { storage, db } from '../firebase/config';
import { v4 } from 'uuid';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection, doc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { selectID, selectName } from '../redux/auth/selectors';

const CreatePostsScreen = ({ navigation }) => {
  const [imageSignature, setImageSignature] = useState('');
  const [imageLocation, setImageLocation] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const uid = useSelector(selectID);
  const name = useSelector(selectName);

  console.log('CreatePostsScreen');

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    (async () => {
      // let { status } = await Location.requestForegroundPermissionsAsync();
      // if (status !== 'granted') {
      //   setErrorMsg('Permission to access location was denied');
      //   return;
      // }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const imageTitleHandler = text => {
    setImageSignature(text);
  };

  const imageLocationHandler = text => {
    setImageLocation(text);
  };

  const imageDownloaderHandler = () => {
    // uploadPhotoToStorage();
    console.log('upload');
  };

  const onSubmit = async () => {
    console.log(location.coords);
    await uploadPostToStorage();
    navigation.navigate('Публікації');
  };

  const flipCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const takePhoto = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setPhoto(photo.uri);
      console.log(photo);

      // await MediaLibrary.createAssetAsync(uri);
    }
  };

  const uploadPhotoToStorage = async () => {
    const response = await fetch(photo);
    const file = await response.blob();

    const imageId = v4();
    const storageRef = ref(storage, `postImage/${imageId}`);

    // 'file' comes from the Blob or File API
    await uploadBytes(storageRef, file).then(snapshot => {
      console.log('Uploaded a blob or file!');
    });
    const storageUrlPhoto = await getDownloadURL(
      ref(storage, `postImage/${imageId}`)
    );
    console.log(storageUrlPhoto);
    return storageUrlPhoto;
  };

  const uploadPostToStorage = async () => {
    const photo = await uploadPhotoToStorage();
    console.log(imageSignature, imageLocation, location.coords, photo);
    try {
      const docRef = await addDoc(collection(db, 'posts'), {
        name,
        uid,
        imageSignature,
        imageLocation,
        location: location.coords,
        photo,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={ref => {
          setCameraRef(ref);
        }}
      >
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{ width: 200, height: 200 }}
            />
          </View>
        )}
        <TouchableOpacity style={styles.flipContainer} onPress={flipCamera}>
          <MaterialCommunityIcons
            name="camera-flip-outline"
            size={24}
            style={{ color: 'white' }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shootButton} onPress={takePhoto}>
          <View style={styles.takePhotoOut}>
            <View style={styles.takePhotoInner}>
              <MaterialCommunityIcons name="camera-outline" size={24} />
            </View>
          </View>
        </TouchableOpacity>
      </Camera>
      <Pressable onPress={imageDownloaderHandler}>
        <Text style={styles.text}>Завантажте фото</Text>
      </Pressable>
      <View styles={styles.box} backGroundColor="#fff">
        <TextInput
          value={imageSignature}
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
            onChangeText={imageLocationHandler}
            placeholder="Місцевість"
            style={styles.input}
          ></TextInput>
        </View>
        <Pressable onPress={onSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Опублікувати</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 16,
    marginRight: 16,
  },
  container: {
    backGroundColor: '#fff',
    flex: 1,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // paddingLeft: 20,
    // paddingRight: 20,
  },
  camera: {
    height: 300,
    marginTop: 30,
  },
  photoView: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },

  flipContainer: {
    flex: 0.1,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 10,
  },

  shootButton: {
    alignSelf: 'center',
    top: 200,
  },

  takePhotoContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    borderColor: '#ddd',
    borderWidth: 3,
    width: 200,
    height: 200,
  },

  takePhotoOut: {
    borderWidth: 2,
    borderColor: '#ffffff67',
    height: 50,
    width: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },

  takePhotoInner: {
    borderWidth: 2,
    borderColor: '#ccc',
    height: 40,
    width: 40,
    backgroundColor: '#ffffff80',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
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
