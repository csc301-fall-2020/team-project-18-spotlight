import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View, Image, LogBox } from "react-native";
import { Button } from "react-native-paper";
import { AuthContext } from "../../authentication/EmailContext/AuthProvider";
import { getUser, subscribeUserInfo } from "../../../services/userService";
import default_pic from "../../../../spotlight/assets/profile_picture.png";
import { useIsFocused } from "@react-navigation/native";

// The warning was for attending, which we won't use anyways.
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state. Check:",
]);

const ProfileScreen = ({ route, navigation }) => {
  const [profileInfo, setInfo] = useState("");
  const { emailLogout, user } = useContext(AuthContext);

  const sendToEdit = () => {
    navigation.navigate("EditProfileScreen", {
      ...profileInfo,
      dateOfBirth: profileInfo.dateOfBirth.toDate(),
    });
  };

  useEffect(() => {
    return subscribeUserInfo(user.uid, (userData) => {
      setInfo(userData);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={
          profileInfo.profilePicture
            ? { uri: profileInfo.profilePicture }
            : default_pic
        }
        style={styles.background}
      />
      <Button style={styles.editProfile} onPress={() => sendToEdit()}>
        <Text style={{ color: "white", position: "absolute", fontSize: 18 }}>
          {"Edit Profile"}
        </Text>
      </Button>

      <View style={styles.info}>
        <Text style={{ fontSize: 40 }}>{profileInfo.username}</Text>
        <Text style={styles.titleText}>
          {profileInfo.gender + " | " + profileInfo.age}
        </Text>
        <Text style={{ textAlign: "justify", fontSize: 16 }}>
          {profileInfo.bio}
        </Text>
        <Button
          style={styles.back}
          icon="logout"
          mode="contained"
          onPress={() => {
            emailLogout();
          }}
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
    top: 0,
    width: "100%",
    height: 460,
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
    backgroundColor: "white",
    width: "95%",
    height: "42%",
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
    elevation: 10,
    backgroundColor: "black",
    borderRadius: 50,
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
