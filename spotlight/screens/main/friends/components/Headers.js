import React, { useState } from "react";
import { Text, SafeAreaView, StyleSheet, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";

const FriendsHeader = () => {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <Text style={styles.header}>{"Friends"}</Text>
    </SafeAreaView>
  );
};

const ProfileHeader = ({ name, onPressBack }) => {
  const [color, setColor] = useState("black");

  return (
    <SafeAreaView style={styles.headerContainer}>
      <Pressable
        onPress={onPressBack}
        onPressIn={() => setColor("red")}
        onPressOut={() => setColor("black")}
        style={{ position: "absolute", left: "5%" }}
      >
        <Entypo name="cross" size={24} color={color} />
      </Pressable>
      <Text style={styles.header}>{`${name}'s Profile`}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 30,
    fontStyle: "normal",
    textAlign: "center",
    paddingBottom: "1%",
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    marginBottom: "2%",
  },
});

export { FriendsHeader, ProfileHeader };
