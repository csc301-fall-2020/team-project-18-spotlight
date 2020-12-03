import React, { useState, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../EmailContext/AuthProvider";
import { TextInput, Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

const EmailSignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const { emailRegister, setIsNewUser } = useContext(AuthContext);

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

  const register = async () => {
    try {
      setIsNewUser(true);
      await emailRegister(email, password);
      navigation.navigate("Onboarding", {
        firstName: "",
        lastName: "",
        email: email,
      });
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
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>Welcome to Spotlight</Text>
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
            We are very excited to have you with us.
          </Text>
          <Text>Please Create an account below</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Register with Spotlight</Text>
          <TextInput
            style={styles.textInput}
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
            style={styles.textInput}
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
            style={styles.textInput}
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
            onChangeText={(confirmPassword) =>
              setConfirmPassword(confirmPassword)
            }
          />

          {error && <Text style={styles.errorMessage}>{error}</Text>}

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
            style={styles.back}
            icon="arrow-left-circle"
            mode="contained"
            onPress={() => navigation.navigate("Authentication")}
          >
            Back
          </Button>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  formContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    height: "100%",
    // marginTop: 30,
    paddingHorizontal: 40,
    paddingTop: 20,
    backgroundColor: "white",
  },
  header: {
    // flex:1,
    // justifyContent:"flex-end",
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
    marginBottom: 20,
    fontSize: 22,
    textAlign: "center",
  },
  textInput: {
    width: "100%",
    height: 50,
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
  },
  register: {
    marginTop: 20,
    marginBottom: 10,
    width: "100%",
    height: 50,
    backgroundColor: "green",
  },
  back: {
    backgroundColor: "grey",
    width: 120,
  },
});

export default EmailSignUp;
