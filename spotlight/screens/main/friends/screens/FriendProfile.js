import React from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import { ProfileHeader } from "../components/Headers";

const FriendProfile = ({ navigation, route }) => {
  const name = route.params.data;

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader
        name={name}
        onPressBack={() => navigation.navigate("Friends Screen")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profile: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 24,
    paddingTop: "4%",
    paddingBottom: "1%",
  },
});

export default FriendProfile;
