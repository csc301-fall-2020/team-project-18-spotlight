import React from "react";
import { Text, SafeAreaView, View, StyleSheet } from "react-native";
import FriendsList from "../components/FriendsList"
import FriendsHeader from "../components/FriendsHeader";

const FriendsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <FriendsHeader />
      <FriendsList/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 30,
    fontStyle: "normal",
    textAlign: "center",
    paddingTop: "4%",
    paddingBottom: "1%",
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    height: "7%",
    marginBottom: "1%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});

export default FriendsScreen;
