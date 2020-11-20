import React, { useState, useContext } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../EmailContext/AuthProvider";
import { TextInput, Button } from "react-native-paper";

const EmailSignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { emailRegister } = useContext(AuthContext);

  const logout = (email, password, confirmPassword) => {
    emailRegister(email, password, confirmPassword);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Register for Spotlight</Text>
      <TextInput
        style={{ marginBottom: 10 }}
        mode="outlined"
        label="Your Email"
        placeholder="name@example.com"
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
        placeholder="Min 6 characters"
        value={password}
        secureTextEntry={true}
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={(password) => setPassword(password)}
      />
      <TextInput
        mode="outlined"
        label="Confirm your Password"
        value={confirmPassword}
        secureTextEntry={true}
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
      />

      <Button
        style={styles.register}
        icon="account-plus"
        mode="contained"
        onPress={() => logout(email, password, confirmPassword)}
        contentStyle={{ height: 50 }}
      >
        <Text style={{ fontSize: 15 }}>Create Account</Text>
      </Button>

      <Button
        style={styles.login}
        uppercase="false"
        icon="login"
        mode="contained"
        onPress={() => navigation.navigate("EmailLogIn")}
      >
        <Text>Login</Text>
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
    marginBottom: 20,
    backgroundColor: "#0091EA",
  },
  register: {
    marginTop: 30,
    marginBottom: 20,
    height: 50,
    borderRadius: 10,
    backgroundColor: "green",
  },
  back: {
    marginBottom: 20,
    backgroundColor: "grey",
    width: 120,
  },
});

export default EmailSignUp;
