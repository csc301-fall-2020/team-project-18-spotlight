import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProfileHeader } from "../components/Headers";

const FriendProfile = ({ navigation, route }) => {
  const data = route.params.data;

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader
        name={data.nickname}
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
