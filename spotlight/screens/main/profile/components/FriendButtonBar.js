import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import calender from "../images/calender.png";
import location from "../images/location.png";
import message from "../images/message.png";

const FriendButtonBar = (props) => {
  return (
    <View style={styles.buttonGroup}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          alert("you clicked me");
        }}
      >
        <Image source={location} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          alert("you clicked me");
        }}
      >
        <Image source={message} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          alert("you clicked me");
        }}
      >
        <Image source={calender} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(162, 10, 10, 1)",
    borderRadius: 50,

    width: 60,
    height: 60,
  },

  buttonGroup: {
    top: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "stretch",
  },
});

export default FriendButtonBar;
