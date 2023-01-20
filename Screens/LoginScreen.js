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
  Pressable,
  Text,
} from 'react-native';

export default function Login({ navigation }) {
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
          <Text style={styles.title}>Login</Text>
          {/* <Text>User Id {userId}</Text> */}
          <TextInput
            value={email}
            onChangeText={emailHandler}
            placeholder="Email"
            style={styles.input}
          />
          <TextInput
            value={password}
            onChangeText={passwordHandler}
            placeholder="Password"
            secureTextEntry={true}
            style={styles.input}
          />
          <Pressable onPress={onLogin} style={styles.button}>
            <Text style={styles.text}>Login</Text>
          </Pressable>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#FFFFFF',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flex: 1,
    alignItems: 'stretch',
    borderRadius: 20,
  },

  title: {
    marginTop: 92,
    marginBottom: 32,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    // fontSize: 'inherit',
    height: 44,
    padding: 10,
    backgroundColor: '#E8E8E8',
    marginTop: 16,
    borderRadius: 10,
  },
  button: {
    flex: 1,

    backgroundColor: '#FF6C00',
    borderRadius: 32,
    padding: 16,
    // marginHorizontal: 16,
    marginVertical: 16,
    marginTop: 43,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    // fontSize: 'inherit',
    color: 'white',
    textAlign: 'center',
    // margin: 0,
    // padding: 0,
  },
});
