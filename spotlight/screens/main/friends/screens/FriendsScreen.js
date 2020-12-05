import React, { useState, useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FriendsList from "../components/FriendsList";
import { FriendsHeader } from "../components/Headers";
import {
  subscribeToFriends,
  subscribeToFriendRequests,
} from "../../../../services/friendsService";
import { AuthContext } from "../../../authentication/EmailContext/AuthProvider";

const FriendsScreen = () => {
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  const onFriendsSnapshot = (friendData) => {
    setFriends(friendData);
  };

  const onFriendRequestsSnapshot = (friendRequestsData) => {
    setFriendRequests(friendRequestsData);
  };

  useEffect(() => {
    const unsubscribe = subscribeToFriends(user.uid, onFriendsSnapshot);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToFriendRequests(
      user.uid,
      onFriendRequestsSnapshot
    );
    return () => unsubscribe();
  }, []);
  // useEffect(() => {
  //   // (async () => {
  //   //   const friends = await getFriends(user.uid);
  //   //   const friendRequests = await getFriendRequests(user.uid);
  //   //   setFriends(friends);
  //   //   setFriendRequests(friendRequests);
  //   // })();
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FriendsHeader />
      <FriendsList friends={friends} friendRequests={friendRequests} />
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
