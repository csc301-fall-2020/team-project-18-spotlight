import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, StyleSheet, Button} from 'react-native';



// These should be in their own files

const SignInScreen = ({navigation}) => {
    return (
    <View style={styles.container}>
        <Text>
            {"Sign In"}
        </Text>
        <Button title="Sign In" onPress={() => navigation.navigate("Main", {screen:"Profile"})}/>
        <Button title="Sign Up" onPress={() => navigation.navigate("SignUp")}/>
    </View>
    )
}

const SignUpScreen = ({navigation}) => {
    return (
        <View sytle={styles.container}>
            <Text>
                {"Sign Up"}
            </Text>
            <Button title="Sign Up" onPress={() => navigation.navigate("Main")} />
        </View>
    )
}

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name="SignIn" component={SignInScreen}/>
            <AuthStack.Screen name="SignUp" component={SignUpScreen}/>
        </AuthStack.Navigator>
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
  
export default AuthNavigator;