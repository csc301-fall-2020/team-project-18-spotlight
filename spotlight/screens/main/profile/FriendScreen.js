import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import profilePic from "./images/profilePic.png";
import editProfile from "./images/editProfile.png";
import back from "./images/back.png";

import FriendButtonBar from "./components/FriendButtonBar";

const textinfo =
  "Hey, I’m Laura! I love cycling and my dog Francis. I’m usually at the gym every weekday morning, Lmk if you wanna do some workouts together!";

const FriendScreen = (props) => {
  const [friendInfo, setFriendInfo] = useState({
    name: "Laura",
    gender: "F | 20",
    description: textinfo,
  });

  const [checkFriend, setCheckFriend] = useState(false);

  let buttonTitle = "";
  let friendButtons = "";
  if (checkFriend) {
    friendButtons = <FriendButtonBar />;
    buttonTitle = "Friends";
  } else {
    friendButtons = (
      <Text style={{ position: "relative", top: 70 }}>
        add to your Friend list to check info
      </Text>
    );
    buttonTitle = "Add As Friend";
  }

  const onButtonPress = () => {
    setCheckFriend(!checkFriend);
  };

  return (
    <View style={styles.container}>
      <Image source={profilePic} style={styles.background} />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          alert("you clicked me");
        }}
      >
        <Image source={back} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.editProfile} onPress={onButtonPress}>
        <Image source={editProfile} />
        <Text style={{ color: "white", position: "absolute", fontSize: 30 }}>
          {buttonTitle}
        </Text>
      </TouchableOpacity>

      <View style={styles.info}>
        <Text style={{ fontSize: 40, top: 30 }}>{friendInfo.name}</Text>

        <Text style={styles.titleText}>{friendInfo.gender}</Text>

        <Text style={styles.titleText}>{friendInfo.description}</Text>

        {friendButtons}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 40,
    left: 20,
  },
  background: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: 400,
    justifyContent: "flex-end",
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0",
  },
  info: {
    flexDirection: "column",
    top: 350,
    alignItems: "center",
    width: 300,
    height: 370,
    borderColor: "black",
    borderWidth: 1.2,
    position: "absolute",
    zIndex: 3,
  },
  editProfile: {
    position: "absolute",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    top: 330,
    zIndex: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    top: 30,
  },
});

export default FriendScreen;
