import React, { useState, useContext } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../EmailContext/AuthProvider";
import { TextInput, Button } from "react-native-paper";

const EmailSignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const { emailRegister } = useContext(AuthContext);

  /**
   * Return True if user has started confirming password and it is not the same as the actual password
   * @returns {Boolean}
   */
  const confirmPasswordIsInvalid = () => {
    if (confirmPassword === "") {
      return false;
    }

    return password !== confirmPassword;
  };

  /**
   * Return True if some basic checks for username/password validity are passed.
   * @returns {Boolean}
   */
  const validateCredentials = () => {
    return (
      email.length > 0 && password.length >= 6 && password === confirmPassword
    );
  };

  /**
   * Show error message for 3 seconds
   * @param {string} errorMsg
   */
  const showErrorMessage = (errorMsg) => {
    setError(errorMsg);
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  const register = () => {
    emailRegister(email, password).catch((e) => showErrorMessage(e.message));
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
        label={
          confirmPasswordIsInvalid()
            ? "Passwords do not match"
            : "Confirm Password"
        }
        error={confirmPasswordIsInvalid()}
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
        onPress={register}
        contentStyle={{ height: 50 }}
        disabled={!validateCredentials()}
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

      {error && <Text style={styles.errorMessage}>{error}</Text>}

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
  errorMessage: {
    color: "red",
    textAlign: "center",
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
