import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import { AuthContext } from "../EmailContext/AuthProvider";
import { LinearGradient } from 'expo-linear-gradient';

const AuthenticationScreen = ({ navigation }) => {
  const { googleLogin, setIsNewUser } = useContext(AuthContext); // Log-in with firebase

  return (
    <LinearGradient
        colors={['red', 'salmon', 'orange']}
        style={{flex: 1}}
        //  Linear Gradient 
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
    >
    <View style={styles.container}>
      <Text style={styles.title}>Spotlight</Text>
      <Button
        icon="email"
        mode="contained"
        style={styles.email}
        onPress={() => navigation.navigate("EmailLogIn")}
      >
        Sign in with Email
      </Button>
      <Button
        icon="google"
        mode="contained"
        style={styles.google}
        onPress={async () => {
          navigation.navigate("Loading");
          const result = await googleLogin();

          if(result.isNewUser){
            setIsNewUser(true);
            navigation.navigate("Onboarding", {
              firstName: result.firstName,
              lastName: result.lastName,
              email: result.email
            })
          }

          if (result.cancelled === true) {
            navigation.navigate("Authentication");
          }
        }}
      >
        Sign in with Google
      </Button>
    </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    justifyContent: "center",
    padding: 50,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 20,
    textAlign: "center",
  },
  email: {
    marginBottom: 10,
  },
  google: {
    backgroundColor: "green",
    marginBottom: 10,
  },
});

export default AuthenticationScreen;
