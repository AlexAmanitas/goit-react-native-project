import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { Route } from './router';
import { UserProvider } from './userContext';

SplashScreen.preventAutoHideAsync();

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
    <UserProvider>
      <NavigationContainer>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <Route />
        </View>
      </NavigationContainer>
    </UserProvider>
  );
};

// https://prnt.sc/vc5s9P2hGpen   debugger screenshot
export default App;
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
