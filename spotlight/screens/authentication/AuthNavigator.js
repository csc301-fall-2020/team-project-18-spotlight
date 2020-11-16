import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EmailSignIn from './EmailSignIn';
import EmailSignUp from './EmailSignUp';
import Authentication from './Authentication';
import MainNavigator from "../main/MainNavigator";
// import {StyleSheet} from 'react-native';

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <AuthStack.Navigator
        screenOptions={{
            headerShown: false,
        }}>
            <AuthStack.Screen name="Authentication" component={Authentication}/>
            <AuthStack.Screen name="EmailSignIn" component={EmailSignIn}/>
            <AuthStack.Screen name="EmailSignUp" component={EmailSignUp}/>
            <AuthStack.Screen name="Main" component={MainNavigator} />
        </AuthStack.Navigator>
    )
}
  
export default AuthNavigator;

// const SignInScreen = ({navigation}) => {
//     return (
//     <View style={styles.container}>
//         <Text>
//             {"Sign In"}
//         </Text>
//         <Button title="Sign In" onPress={() => navigation.navigate("Main", {screen:"Profile"})}/>
//         <Button title="Sign Up" onPress={() => navigation.navigate("SignUp")}/>
//     </View>
//     )
// }

// const SignUpScreen = ({navigation}) => {
//     return (
//         <View sytle={styles.container}>
//             <Text>
//                 {"Sign Up"}
//             </Text>
//             <Button title="Sign Up" onPress={() => navigation.navigate("Main")} />
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//   });