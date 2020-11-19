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

  const renderHeader = ({section: {title}}) =>{
    if(title === "Friends" || title === "Friend Requests"){
      return <Header title={title} size={24}/>
    } else{
      return <Header title={title} size={20}/>
    }
  }


  const formatData = (friendData) => {
    const sections = {};
    friendData.forEach((friend) => {
      // Group each people by the first letter of their nicknames
      const c = friend.nickname.charAt(0);

      // Do an upsert
      if (!sections.hasOwnProperty(c)) {
        sections[c] = [];
      }
      sections[c].push(friend);
    });

    // Formats the data into the required format
    return Object.entries(sections).map(([title, data]) => ({
      title,
      // localeCompare compares each thing, TODO: If backwards, switch a and B
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
            data: []
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
