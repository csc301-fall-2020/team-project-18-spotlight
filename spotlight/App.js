import 'react-native-gesture-handler';
import React from 'react';
import AppNavigator from './screens/AppNavigator';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import * as firebase from 'firebase';
import { Root } from 'native-base';

const firebaseConfig = {
  apiKey: "AIzaSyAjao308Jw5PfafFwn7knvVODcOPBN_56w",
  authDomain: "spotlight-603b8.firebaseapp.com",
  databaseURL: "https://spotlight-603b8.firebaseio.com",
  projectId: "spotlight-603b8",
  storageBucket: "spotlight-603b8.appspot.com",
  messagingSenderId: "1074492684065",
  appId: "1:1074492684065:web:627fb6a6b682fa6156b060",
  measurementId: "G-VVN2PGCTFM"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }


  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });

    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      );
    } else {
      return (
        <Root>
          <AppNavigator />
        </Root>
      );
    }
  }
}