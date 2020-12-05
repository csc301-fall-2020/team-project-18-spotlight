import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import { Button } from "react-native-paper";
import { AuthContext } from "../../../authentication/EmailContext/AuthProvider";
import { getUser } from "../../../../services/userService";
import default_pic from "../../../../assets/profile_picture.png";
import { sendFriendRequest } from "../../../../services/friendsService";

const default_picture = default_pic;
const textinfo = "Keep up the good work!";

const SearchFriendProfileModal = ({
  userID,
  modalVisible,
  setModalVisible,
}) => {
  const [profileInfo, setInfo] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const userData = await getUser(userID);
      setInfo(userData);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.info}>
        <Text style={{ fontSize: 40, fontWeight: "bold", marginBottom: 10 }}>
          People
        </Text>
        <Image
          source={
            profileInfo.profilePicture
              ? { uri: profileInfo.profilePicture }
              : default_picture
          }
          style={styles.background}
        />
        <Text style={styles.titleText}>{profileInfo.username}</Text>
        <Text style={{ fontSize: 30, textAlign: "center" }}>
          {profileInfo.gender + " | " + profileInfo.age}
        </Text>
        <Text style={{ textAlign: "center", fontSize: 16 }}>
          {profileInfo.bio ? profileInfo.bio : textinfo}
        </Text>
        <Button
          style={styles.back}
          mode="contained"
          onPress={() => {
            console.log(user.uid, " to  ", userID);
            console.log(user);
            sendFriendRequest(user.uid, userID);
            setModalVisible(!modalVisible);
            Alert.alert("", "Friend Request has been sent!");
          }}
        >
          <Text style={{ fontSize: 15 }}>Send Friend Request</Text>
        </Button>
        <Button
          style={styles.back}
          mode="contained"
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Text style={{ fontSize: 15 }}>Back</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  background: {
    // position: "absolute",
    // flex: 1,
    // top: 0,
    width: "100%",
    height: "50%",
    justifyContent: "flex-start",
  },
  info: {
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: "90%",
    // marginVertical: 60,
    marginHorizontal: "auto",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    zIndex: 3,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  back: {
    marginTop: 20,
    backgroundColor: "salmon",
    borderRadius: 50,
  },
});

export default SearchFriendProfileModal;
