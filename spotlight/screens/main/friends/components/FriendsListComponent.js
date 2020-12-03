import React from "react";
import {
  Text,
  View,
  SectionList,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { Avatar } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";

const DEFAULT_PROFILE = "../../../../assets/profile_picture.png";
const Header = ({ title, size }) => {
  return (
    <View>
      <Text style={{ fontSize: size, ...styles.header }}>{title}</Text>
    </View>
  );
};

const FriendRequest = ({ data, onPress }) => {
  // TODO: Copy the friend stuff and put it here too.
  return (
    <View style={styles.friendContainer}>
      <TouchableOpacity
        onPress={onPress}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <Avatar.Text
          size={64}
          label={data.username.slice(0, 3)}
          style={styles.avatarStyle}
          labelStyle={styles.avatarLabelStyle}
        />
        <Text style={styles.friendName}>{data.username}</Text>
      </TouchableOpacity>
      <Entypo
        name="check"
        size={24}
        color="#adadad"
        style={{ position: "absolute", right: "20%" }}
      />
      <Entypo
        name="block"
        size={24}
        color="#adadad"
        style={{ position: "absolute", right: "7.5%" }}
      />
    </View>
  );
};

const Friend = ({ data, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.friendContainer}>
        <Avatar.Image
          size={64}
          source={
            data.profilePicture
              ? { uri: data.profilePicture }
              : require(DEFAULT_PROFILE)
          }
        />
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
  friendContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: "3%",
  },
  friendName: {
    marginLeft: 10,
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
