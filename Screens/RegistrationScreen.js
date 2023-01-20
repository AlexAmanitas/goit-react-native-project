import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Text,
  Pressable,
  Image,
} from 'react-native';

export default function Registration() {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = text => setLogin(text);
  const emailHandler = text => setEmail(text);
  const passwordHandler = text => setPassword(text);

  const onLogin = () => {
    if (login === '' || email === '' || password === '') {
      return Alert.alert('Заповнить поля');
    }
    Alert.alert('Credentials', `${login} + ${password}`);
  };

  const onTransition = () => {
    // navigation.navigate('Login');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View>
            <Image style={styles.avatar} />
          </View>

          <Text style={styles.title}>Реєстрація</Text>
          <TextInput
            value={login}
            onChangeText={loginHandler}
            placeholder="Логін"
            style={styles.input}
          />
          <TextInput
            value={email}
            onChangeText={emailHandler}
            placeholder="Адреса електронної пошти"
            style={styles.input}
          />
          <TextInput
            value={password}
            onChangeText={passwordHandler}
            placeholder="Придумайте пароль"
            secureTextEntry={true}
            style={styles.input}
          />
          <Pressable onPress={onLogin} style={styles.button}>
            <Text style={styles.text}>Зареєструватися</Text>
          </Pressable>
          <View style={styles.subscribe}>
            <Text style={styles.posttext}>Вже є акаунт? </Text>
            <Pressable onPress={onTransition}>
              <Text style={styles.loginLink}>Увійти</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'stretch',
    borderRadius: 20,
    marginTop: 263,
  },

  avatar: {
    position: 'absolute',
    top: -70,
    width: 120,
    height: 120,
    backgroundColor: '#999999',
    borderRadius: 7,
    alignSelf: 'center',
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
