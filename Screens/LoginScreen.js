import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Pressable,
  Text,
} from 'react-native';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const { userId } = route.params;

  const emailHandler = text => setEmail(text);
  const passwordHandler = text => setPassword(text);

  const onLogin = () => {
    if (email === '' || password === '') {
      return Alert.alert('Заповнить поля');
    }
    Alert.alert('Credentials', `${email} + ${password}`);
  };

  const onTransition = () => {
    navigation.navigate('Registration');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require('../images/background_img2.jpg')}
        style={styles.image}
      >
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          >
            <Text style={styles.title}>Увійти</Text>
            {/* <Text>User Id {userId}</Text> */}
            <TextInput
              value={email}
              onChangeText={emailHandler}
              placeholder="Адреса електронної пошти"
              style={styles.input}
            />
            <TextInput
              value={password}
              onChangeText={passwordHandler}
              placeholder="Пароль"
              secureTextEntry={true}
              style={styles.input}
            />
            <Pressable onPress={onLogin} style={styles.button}>
              <Text style={styles.text}>Увійти</Text>
            </Pressable>
            <View style={styles.subscribe}>
              <Text style={styles.posttext}>Ще нема акаунта? </Text>
              <Pressable onPress={onTransition}>
                <Text style={styles.loginLink}>Зареєструватись</Text>
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    // flex: 1,
    alignItems: 'stretch',
    borderRadius: 20,
  },

  image: {
    flex: 1,
    justifyContent: 'flex-end',
    // position: 'absolute',
    // top: 0,
    // right: 0,
    // bottom: 0,
    // left: 0,
  },

  title: {
    marginTop: 92,
    marginBottom: 32,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 44,
    padding: 10,
    backgroundColor: '#E8E8E8',
    marginTop: 16,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#FF6C00',
    borderRadius: 32,
    padding: 16,
    marginVertical: 16,
    marginTop: 43,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  subscribe: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});

export default Login;
