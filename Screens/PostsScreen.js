import { StyleSheet, View, Image, Text } from 'react-native';
import { selectName, selectEmail } from '../redux/auth/selectors';
import { useSelector } from 'react-redux';

const PostsScreen = () => {
  const name = useSelector(selectName);
  const email = useSelector(selectEmail);
  return (
    <View style={styles.avatar}>
      <Image
        style={styles.image}
        source={require('../assets/images/user.jpg')}
      />
      <View style={styles.wraper}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
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
    fontWeight: 'bold',
    fontSize: 13,
    lineHeight: 15,
  },
  email: {
    fontWeight: 'normal',
    fontSize: 11,
    lineHeight: 13,
  },
});

export default PostsScreen;
