import React, { useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import { AuthContext } from "../../authentication/EmailContext/AuthProvider";
import profilePic from "./images/profilePic.png";
import editProfile from "./images/editProfile.png";
// import { LinearGradient } from 'expo-linear-gradient';

const textinfo =
  "Hey, I’m Laura! I love cycling and my dog Francis. I’m usually at the gym every weekday morning, Lmk if you wanna do some workouts together!";

const ProfileScreen = ({ navigation }) => {
  const [profileInfo, setInfo] = useState({
    name: "Laura",
    gender: "F | 20",
    description: textinfo,
  });
  const { emailLogout } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={profilePic} style={styles.background} />
      <TouchableOpacity
        style={styles.editProfile}
        onPress={() => {
          alert("you clicked me");
        }}
      >           
        <Image source={editProfile} />
        <Text style={{ color: "white", position: "absolute", fontSize: 30 }}>
          {"Edit Profile"}
        </Text>
      </TouchableOpacity>

      <View style={styles.info}>
        <Text style={{ fontSize: 40 }}>{profileInfo.name}</Text>
        <Text style={styles.titleText}>{profileInfo.gender}</Text>
        <Text style={{ textAlign: "justify", fontSize: 16 }}>
          {profileInfo.description}
        </Text>
        <Button
          style={styles.back}
          icon="logout"
          mode="contained"
          onPress={emailLogout}
        >
          <Text style={{ fontSize: 15 }}>Logout</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",

  },
  background: {
    position: "absolute",
    flex: 1,
    top: 30,
    width: '100%',
    height: 400,
    justifyContent: "flex-end",
  },
  info: {
    flexDirection: "column",
    top: 345,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "grey",
    borderWidth: 2,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    backgroundColor: 'white',
    width: '95%',
    height: '42%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    zIndex: 3,
    padding: 10,

  },
  editProfile: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    top: 365,
    zIndex: 10,
    elevation: 3,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  back: {
    marginTop: 20,
    backgroundColor: "salmon",
    borderRadius: 50,
    width: 120,
  },
});

export default ProfileScreen;
