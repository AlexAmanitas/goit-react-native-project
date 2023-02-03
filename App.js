import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from 'react-native';
import Login from './Screens/LoginScreen';
import Registration from './Screens/RegistrationScreen';
import Home from './Screens/Home';

import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';

SplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator();

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
          'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (isReady === false) {
    return null;
  }

  return (
    <NavigationContainer>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <Stack.Navigator initialRouteName="Реєстрація" style={styles.navBox}>
          <Stack.Screen
            style={{ backgroundColor: '#fff' }}
            name="Home"
            component={Home}
            options={{
              title: 'Публікації',
              headerTitleStyle: {
                justifyContent: 'center',
              },
              headerRight: () => (
                <MaterialIcons name="logout" size={24} color="black" />
              ),
            }}
          />
          <Stack.Screen name="Реєстрація" component={Registration} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    // backgroundColor: 'grey',

    flex: 1,
    // alignItems: 'stretch',
    // justifyContent: 'flex-end',
  },

  navBox: {
    padding: 16,

    borderColor: 'red',
  },
});

// https://prnt.sc/vc5s9P2hGpen   debugger screenshot
export default App;
