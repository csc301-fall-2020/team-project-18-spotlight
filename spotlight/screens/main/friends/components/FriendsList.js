import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, SectionList, StyleSheet } from "react-native";
import { FriendRequest, Header, Friend } from "./FriendsListComponent";

// DUMMY DATA FOR TESTING
const DATA = [
  {
    title: "Friend Requests",
    data: ["Laura", "Ala"],
  },
  {
    title: "Friends",
    data: ["Moe", "ZengHao", "Patrick", "Jennifer", "Olivia", "Samuel", "Alan"],
  },
];

const FriendsList = ({ friends }) => {
  const navigation = useNavigation();

  const renderItem = ({ item, section: { title } }) => {
    if (title === "Friend Requests") {
      return (
        <FriendRequest
          data={item}
          onPress={() => navigation.navigate("Friend Profile", { data: item })}
        />
      );
    } else {
      return (
        <Friend
          data={item}
          onPress={() => navigation.navigate("Friend Profile", { data: item })}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <SectionList
        style={styles.list}
        sections={[
          {
            title: "Friend Requests",
            data: [],
          },
          {
            title: "Friends",
            data: friends,
          },
        ]}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => {
          return <Header title={title} />;
        }}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: "3%",
    flex: 1,
    alignItems: "flex-start",
  },
  list: {
    width: "100%",
  },
});

export default FriendsList;
