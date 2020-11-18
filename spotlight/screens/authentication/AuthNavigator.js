import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EmailLogIn from './screens/EmailLogIn';
import EmailRegister from './screens/EmailRegister';
import Authentication from './screens/Authentication';

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <AuthStack.Navigator
        initialRouteName='Authentication'
        screenOptions={{
        headerShown: false,
        }}>
            <AuthStack.Screen name="Authentication" component={Authentication}/>
            <AuthStack.Screen name="EmailLogIn" component={EmailLogIn}/>
            <AuthStack.Screen name="EmailRegister" component={EmailRegister}/>
        </AuthStack.Navigator>
    )
}
  
export default AuthNavigator;