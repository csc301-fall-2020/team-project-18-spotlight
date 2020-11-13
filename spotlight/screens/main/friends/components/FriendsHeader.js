import React from "react";
import { Text, SafeAreaView, View, StyleSheet } from "react-native";

const FriendsHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>{"Friends"}</Text>
    </View>
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
});

export default FriendsHeader;
