import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import { AuthContext } from "../EmailContext/AuthProvider";

const AuthenticationScreen = ({ navigation }) => {
  const { googleLogin } = useContext(AuthContext); // Log-in with firebase

  return (
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
          if (result.cancelled === true) {
            navigation.navigate("Authentication");
          }
        }}
      >
        Sign in with Google
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
