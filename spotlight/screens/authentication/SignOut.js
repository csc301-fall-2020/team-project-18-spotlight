import React from 'react';
import {StyleSheet} from 'react-native';
import  {Button, Text} from 'native-base';
import * as firebase from 'firebase';

const SignOut = ({ navigation }) => {

    const signOut = () => {
        firebase.auth()
        .signOut()
        .then(() => {
            navigation.navigate('AppNavigator');
            console.log('User signed out!')
        });
    }

    return (
        <Button style={{ marginTop: 20 }}
        rounded
        small
        danger
        onPress = {() => signOut()}
        >
            <Text>SignOut</Text>
        </Button>
      );
}

export default SignOut;