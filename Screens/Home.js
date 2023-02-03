import { StyleSheet, View, Image, Text } from 'react-native-web';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tabs = createBottomTabNavigator();

const Home = ({ navigation }) => {
  return (
    <View style={styles.avatar}>
      <Image style={styles.image} source={require('../images/user.jpg')} />
      <View style={styles.wraper}>
        <Text style={styles.name}>Natali Romanova</Text>
        <Text style={styles.email}>email@example.com</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    marginTop: 16,
    padding: 16,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  wraper: {
    // flexDirection: 'column',
    marginLeft: 8,
    justifyContent: 'center',
  },
  name: {
    fontWeight: 700,
    fontSize: 13,
    lineHeight: 15,
  },
  email: {
    fontWeight: 400,
    fontSize: 11,
    lineHeight: 13,
  },
});

export default Home;
