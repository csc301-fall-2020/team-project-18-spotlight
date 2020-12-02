import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EmailLogIn from "./screens/EmailLogIn";
import EmailRegister from "./screens/EmailRegister";
import AuthenticationScreen from "./screens/AuthenticationScreen";
import Onboarding from "./screens/Onboarding";
import Loading from "../shared/Loading";

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Authentication"
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen
        name="Authentication"
        component={AuthenticationScreen}
      />
      <AuthStack.Screen name="EmailLogIn" component={EmailLogIn} />
      <AuthStack.Screen name="EmailRegister" component={EmailRegister} />
      <AuthStack.Screen name="Loading" component={Loading} />
      <AuthStack.Screen name="Onboarding" component={Onboarding} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
