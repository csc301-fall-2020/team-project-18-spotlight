import 'react-native-gesture-handler';
import React from 'react';
import AppNavigator from './screens/AppNavigator';
import { AppLoading } from 'expo';
import * as firebase from 'firebase';
import {useFonts, Raleway_600SemiBold} from '@expo-google-fonts/raleway';
import { AuthProvider } from './screens/authentication/EmailContext/AuthProvider';

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

const App = () => {
  let [fontsLoaded] = useFonts({Raleway_600SemiBold});

  if (!fontsLoaded){
      return <AppLoading/>
  }
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}

export default App;