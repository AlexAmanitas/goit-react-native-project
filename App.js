import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from 'react-native';
import Login from './Screens/LoginScreen';
import Registration from './Screens/RegistrationScreen';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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
        <ImageBackground
          source={require('./images/background_img2.jpg')}
          style={styles.image}
        >
          <Stack.Navigator initialRouteName="Registration">
            <Stack.Screen name="Registration" component={Registration} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
          {/* <Registration /> */}
        </ImageBackground>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'stretch',
    // justifyContent: 'flex-end',
  },
  image: {
    flex: 1,
    // justifyContent: 'flex-end',
    // position: 'absolute',
    // top: 0,
    // right: 0,
    // bottom: 0,
    // left: 0,
  },
});

// https://prnt.sc/vc5s9P2hGpen   debugger screenshot
export default App;
