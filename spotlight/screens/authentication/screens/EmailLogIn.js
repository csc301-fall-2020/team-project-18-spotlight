import React, { useState, useContext } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../EmailContext/AuthProvider";
import { TextInput, Button } from "react-native-paper";

const EmailLogIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { emailLogin } = useContext(AuthContext); // Log-in with firebase

  const login = () => {
    emailLogin(email, password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome Back to Spotlight!</Text>
      <TextInput
        style={{ marginBottom: 10 }}
        mode="outlined"
        label="Your Email"
        keyboardType="email-address"
        underlineColorAndroid="transparent"
        value={email}
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        mode="outlined"
        label="Your Password"
        value={password}
        secureTextEntry={true}
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={(password) => setPassword(password)}
      />

      <Button
        style={styles.login}
        icon="login"
        mode="contained"
        onPress={login}
        contentStyle={{ height: 50 }} // See issue #18
      >
        <Text style={{ fontSize: 15 }}>Login</Text>
      </Button>

      <Button
        style={styles.register}
        icon="account-plus"
        mode="contained"
        onPress={() => navigation.navigate("EmailRegister")}
      >
        <Text>Create Account</Text>
      </Button>

      <Button
        style={styles.back}
        icon="arrow-left-circle"
        mode="contained"
        onPress={() => navigation.navigate("Authentication")}
      >
        Back
      </Button>
    </SafeAreaView>
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
  login: {
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: "#0091EA",
  },
  register: {
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "green",
  },
  back: {
    marginBottom: 20,
    backgroundColor: "grey",
    width: 120,
  },
});

export default EmailLogIn;
