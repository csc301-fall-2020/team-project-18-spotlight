import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, SectionList, StyleSheet } from "react-native";
import { FriendRequest, Header, Friend } from "./FriendsListComponent";

const FriendsList = ({ friends }) => {
  const navigation = useNavigation();

  /**
   * This function determines how to render each item in the list.
   * Item corresponds to each element in the data array, and title
   * corresponds to the title it belongs to.
   */
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

  /**
   * This function determines how to render each section header.
   */
  const renderHeader = ({ section: { title } }) => {
    if (title === "Friends" || title === "Friend Requests") {
      return <Header title={title} size={24} />;
    } else {
      return <Header title={title} size={20} />;
    }
  };

  /**
   * Formats the data passed into a form that will be accepted by sectionlist.
   * It looks like:
   * [
   *  {
   *    title: string,
   *    data: [Obj]
   *  }
   * ]
   */
  const formatData = (friendData) => {
    // Thanks to my good friend Oliver Daniel for helping me with this code.
    // The comments are added for future reference for future me with JS problems.

    const sections = {};
    friendData.forEach((friend) => {
      // Group each people by the first letter of their nicknames.
      const c = friend.nickname.charAt(0);

      // Initializes an empty list if there are no keys with the first letter.
      if (!Object.prototype.hasOwnProperty(sections,c)) {
        sections[c] = [];
      }
      sections[c].push(friend);
    });

    // Formats the data into the required format
    return Object.entries(sections).map(([title, data]) => ({
      title, // equivalent to title: title

      // TODO: If backwards, switch a and B
      data: data.sort((a, b) => b.nickname.localeCompare(a.nickname)),
    }));
  };

  const formattedFriendData = formatData(friends);

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
            data: [],
          },
          ...formattedFriendData,
        ]}
        renderItem={renderItem}
        renderSectionHeader={renderHeader}
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
