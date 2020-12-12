import React from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { Avatar } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useContext } from "react";
import { AuthContext } from "../../../authentication/EmailContext/AuthProvider";
import {
  AcceptFriendRequest,
  RejectFriendRequest,
} from "./FriendRequestButtons";
import {
  acceptFriendRequest,
  rejectFriendRequest,
} from "../../../../services/friendsService";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DEFAULT_PROFILE = "../../../../assets/profile_picture.png";
const Header = ({ title, size }) => {
  return (
    <View>
      <Text style={{ fontSize: size, ...styles.header }}>{title}</Text>
    </View>
  );
};

const FriendRequest = ({ data, onPress }) => {
  const { user } = useContext(AuthContext);

  const onAccept = () => {
    (async () => {
      await acceptFriendRequest(data.userID, user.uid);
    })();
    Alert.alert("", "Accepted friend request!");
  };

  const onReject = () => {
    (async () => {
      await rejectFriendRequest(data.userID, user.uid);
    })();
    Alert.alert("", "Rejected friend request!");
  };

  return (
    <View style={styles.friendContainer}>
      <TouchableOpacity
        onPress={onPress}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <View style={styles.avatarContainer}>
          <Avatar.Image
            size={64}
            source={
              data.profilePicture
                ? { uri: data.profilePicture }
                : require(DEFAULT_PROFILE)
            }
          />
          <MaterialCommunityIcons
            name={
              data.attending == "" || data.attending == null
                ? "sleep"
                : "dumbbell"
            }
            style={styles.gymIcon}
            size={24}
            color="#A20A0A"
          />
        </View>
        <Text style={styles.friendName}>{data.username}</Text>
      </TouchableOpacity>
      <View style={{ position: "absolute", right: "17%" }}>
        <AcceptFriendRequest onPress={onAccept} />
      </View>
      <View style={{ position: "absolute", right: "7.5%" }}>
        <RejectFriendRequest onPress={onReject} />
      </View>
      {/* <MaterialCommunityIcons
        name={
          data.attending == "" || data.attending == null ? "sleep" : "dumbbell"
        }
        style={styles.gymIcon}
        size={24}
        color="#A20A0A"
      /> */}
    </View>
  );
};

const Friend = ({ data, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.friendContainer}>
        <View style={styles.avatarContainer}>
          <Avatar.Image
            size={64}
            source={
              data.profilePicture
                ? { uri: data.profilePicture }
                : require(DEFAULT_PROFILE)
            }
          />
          <MaterialCommunityIcons
            name={
              data.attending == "" || data.attending == null
                ? "sleep"
                : "dumbbell"
            }
            style={styles.gymIcon}
            size={24}
            color="#A20A0A"
          />
        </View>
        <Text style={styles.friendName}>{data.username}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    fontFamily: "Raleway_600SemiBold",
    fontStyle: "normal",
    paddingBottom: "1.5%",
  },
  gymIcon: {
    top: "-4%",
    right: "5%",
  },
  avatarContainer: {
    flexDirection: "row",
  },
  friendContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: "3%",
  },
  friendName: {
    marginLeft: "-2%",
    fontSize: 20,
    fontFamily: "Raleway_600SemiBold",
  },
  avatarStyle: {
    backgroundColor: "#A20A0A",
    borderRadius: 10,
  },
  avatarLabelStyle: {
    fontSize: 24,
  },
});

export { FriendRequest, Header, Friend };
