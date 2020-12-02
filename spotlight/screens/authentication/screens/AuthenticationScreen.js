import React, { useContext } from "react";
import { View, StyleSheet, Text, Image, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import { AuthContext } from "../EmailContext/AuthProvider";
import { LinearGradient } from "expo-linear-gradient";
import cover from "../images/pic5.jpg";

const win = Dimensions.get("window");
const ratio = win.width / 4000;

const AuthenticationScreen = ({ navigation }) => {
  const { googleLogin, setIsNewUser } = useContext(AuthContext); // Log-in with firebase

  return (
    <LinearGradient
      colors={["red", "salmon", "orange"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Spotlight</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image source={cover} style={styles.image} resizeMode="cover" />
        </View>

        <View style={styles.buttons}>
          <Text style={styles.secondTitle}>
            {" "}
            The #1 App to find your gym buddies
          </Text>
          <Text style={styles.secondSubitle}>
            {"It's time to be someone in the gym."}
          </Text>
          <Button
            icon="google"
            mode="contained"
            style={styles.google}
            onPress={async () => {
              navigation.navigate("Loading");
              const result = await googleLogin();

              if (result.cancelled === true || result.error) {
                navigation.navigate("Authentication");
                return;
              }

              if (result.isNewUser) {
                setIsNewUser(true);
                navigation.navigate("Onboarding", {
                  firstName: result.firstName,
                  lastName: result.lastName,
                  email: result.email,
                });
              } else {
                setIsNewUser(false);
              }
            }}
          >
            Continue with Google
          </Button>

          <Button
            icon="email"
            mode="contained"
            style={styles.email}
            onPress={() => navigation.navigate("EmailRegister")}
          >
            Sign Up with Email
          </Button>

          <Text style={{ color: "grey", marginBottom: 15 }}>
            ----------- Already have an account? -----------
          </Text>

          <Button
            icon="email"
            mode="outlined"
            color="black"
            style={styles.email}
            onPress={() => navigation.navigate("EmailLogIn")}
          >
            <Text style={{ color: "black" }}>Login</Text>
          </Button>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    position: "relative",
  },
  imageContainer: {
    width: "100%",
    height: "55%",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  header: {
    marginTop: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 35,
    color: "white",
  },
  secondTitle: {
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 25,
    textAlign: "center",
    marginBottom: 5,
  },
  secondSubitle: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 10,
  },
  email: {
    marginBottom: 10,
    borderWidth: 1,
    width: "80%",
  },
  google: {
    backgroundColor: "green",
    marginBottom: 10,
    width: "80%",
  },
  buttons: {
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: "100%",
    height: "38%",
    backgroundColor: "white",
  },
});

export default AuthenticationScreen;
