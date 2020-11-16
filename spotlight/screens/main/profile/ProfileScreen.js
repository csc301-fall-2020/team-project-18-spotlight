import React from 'react';
import { StyleSheet} from 'react-native';
import  {Container, Button, Text} from 'native-base';
import * as firebase from 'firebase';

const ProfileScreen = ({ navigation }) => {

    const signOut = () => {
        firebase.auth()
        .signOut()
        .then(() => {
            navigation.navigate('Authentication');
            console.log('User signed out!')
        });
    }

    return(
        <Container style={styles.container}>
            <Text>
                {"Profile!"}
            </Text>
            <Button style={{ marginTop: 20 }}
            rounded
            small
            danger
            onPress = {() => signOut()}
            >
                <Text>SignOut</Text>
            </Button>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default ProfileScreen;
  