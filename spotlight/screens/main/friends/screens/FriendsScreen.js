import React, { useContext, useEffect, useState } from "react";
import { Text, SafeAreaView, View, StyleSheet } from "react-native";
import FriendsList from "../components/FriendsList";
import { FriendsHeader } from "../components/Headers";
import getFriends from "../../../../services/friendsService";
import { AuthContext } from "../../../authentication/EmailContext/AuthProvider";

const FriendsScreen = () => {
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const tryGetFriends = async () => {
      const newFriends = await getFriends(user.uid);
      setFriends(newFriends);
    };
    tryGetFriends();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FriendsHeader />
      <FriendsList friends={friends} />
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
