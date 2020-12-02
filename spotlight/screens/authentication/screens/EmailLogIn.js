import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../EmailContext/AuthProvider";
import { TextInput, Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

const EmailLogIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { emailLogin, setIsNewUser } = useContext(AuthContext); // Log-in with firebase

  /**
   * Return True if some basic checks for username/password validity are passed.
   * @returns {Boolean}
   */
  const validateCredentials = () => {
    return email.length > 0 && password.length >= 6;
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

  const login = async () => {
    try {
      setIsNewUser(false);
      await emailLogin(email, password);
    } catch (e) {
      showErrorMessage(e.message);
    }
  };

  return (
    <LinearGradient
      colors={["red", "salmon", "orange"]}
      style={{ flex: 1 }}
      //  Linear Gradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.logo}>Welcome back to Spotlight</Text>
          </View>

          <View
            style={{
              backgroundColor: "white",
              borderColor: "black",
              borderRadius: 10,
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderWidth: 2,
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>
              We are very excited to have you back with us.
            </Text>
            <Text>Please Log in to your account.</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inner}>
              <Text style={styles.title}>Login To Your Account</Text>
              <TextInput
                style={styles.textInput}
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
                style={styles.textInput}
                mode="outlined"
                label="Your Password"
                value={password}
                secureTextEntry={true}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(password) => setPassword(password)}
              />

              {error && <Text style={styles.errorMessage}>{error}</Text>}

              <Button
                style={styles.login}
                icon="login"
                mode="contained"
                onPress={login}
                contentStyle={{ height: 50 }} // See issue #18
                disabled={!validateCredentials()}
              >
                <Text style={{ fontSize: 15 }}>Login</Text>
              </Button>

              <Button
                style={styles.back}
                icon="arrow-left-circle"
                mode="contained"
                onPress={() => navigation.navigate("Authentication")}
              >
                Back
              </Button>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  inner: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  formContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    height: "100%",
    paddingHorizontal: 40,
    paddingTop: 20,
    backgroundColor: "white",
  },
  header: {
    marginTop: 15,
    marginBottom: 10,
  },
  logo: {
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 30,
    color: "white",
  },
  title: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 22,
    textAlign: "center",
  },
  textInput: {
    width: "100%",
    height: 50,
  },
  login: {
    marginTop: 20,
    marginBottom: 10,
    width: "100%",
    height: 50,
    backgroundColor: "#0091EA",
  },
  back: {
    backgroundColor: "grey",
    width: 120,
  },
  errorMessage: {
    color: "red",
  },
});

export default EmailLogIn;
