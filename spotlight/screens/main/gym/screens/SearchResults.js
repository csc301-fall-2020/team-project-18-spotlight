import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Modal,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { queryUserByName } from "../../../../services/userService";
import SearchFriendProfileModal from "./SearchFriendProfileModal";
import default_pic from "../../../../assets/profile_picture.png";
import { MaterialCommunityIcons } from "@expo/vector-icons";

/**
 * @typedef {Object} Props
 * @property {string} initialQuery
 */

/**
 * @param {Props} props
 */

const default_picture = default_pic;

const SearchResults = ({ navigation, route }) => {
  const { initialQuery } = route.params;
  const [searched, setSearched] = useState(initialQuery !== "");
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [userResults, setUserResults] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState("");
  const [profileInfo, setProfiles] = useState("");

  const onChangeText = (text) => {
    setSearchQuery(text);
    if (text === "") {
      setUserResults([]);
      setSearched(false);
    }
  };

  const onSearch = async () => {
    queryUserByName(searchQuery).then((users) => {
      setUserResults(users);
      setSearched(true);
    });
  };

  useEffect(() => {
    queryUserByName(initialQuery).then((users) => setUserResults(users));
  }, []);

  const Item = ({ item, onPress, style }) => (
    <TouchableOpacity
      key={item["userID"]}
      onPress={onPress}
      style={[styles.item, style]}
    >
      <Image
        source={
          item["profilePicture"]
            ? { uri: item["profilePicture"] }
            : default_picture
        }
        style={styles.images}
      />
      <Text style={styles.row}>
        {item["firstName"]} {item["lastName"]}
      </Text>
      <MaterialCommunityIcons
        name={
          item["attending"] == "" || item["attending"] == null
            ? "sleep"
            : "dumbbell"
        }
        style={styles.gymIcon}
        size={24}
        color="#A20A0A"
      />
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const backgroundColor = "#fff";
    return (
      <Item
        item={item}
        onPress={() => {
          setModalVisible(true);
          setSelectedFriendId(item.userID);
          console.log(item);
          console.log(item.userID);
        }}
        style={{ backgroundColor }}
      />
    );
  };

  const NoResults = () => {
    if (searched) {
      return <Text>{"No users found :("}</Text>;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(modalVisible);
        }}
      >
        <SearchFriendProfileModal
          userID={selectedFriendId}
          modalVisible={modalVisible}
          setModalVisible={() => {
            setModalVisible(!modalVisible);
          }}
        />
      </Modal>

      <Text style={styles.header}>Search Results</Text>

      <Searchbar
        placeholder="Search For Users"
        onChangeText={(text) => onChangeText(text)}
        value={searchQuery}
        showCancel={true}
        iconColor={"#A20A0A"}
        onIconPress={onSearch}
        onSubmitEditing={onSearch}
        clearTextOnFocus
      />

      <FlatList
        data={userResults}
        renderItem={renderItem}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        extraData={selectedFriendId}
        ListEmptyComponent={NoResults}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "5%",
  },
  search: {
    paddingRight: "20%",
    marginBottom: "5%",
    marginLeft: "5%",
    marginTop: "5%",
  },
  header: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 30,
    color: "#A20A0A",
    fontStyle: "normal",
    textAlign: "left",
    paddingTop: "10%",
    paddingLeft: "3%",
    marginBottom: "3%",
  },
  row: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "bold",
    paddingLeft: 10,
    marginTop: 10,
  },
  description: {
    fontFamily: "Raleway_600SemiBold",
    marginBottom: "5%",
    paddingLeft: "3%",
    paddingBottom: "10%",
  },
  item: {
    marginVertical: 5,
    flexDirection: "row",
    borderRadius: 15,
    height: 50,
  },
  images: {
    height: 40,
    width: 40,
    marginLeft: 10,
    marginTop: 5,
  },
  gymIcon: {
    marginTop: 10,
    marginLeft: 10,
  },
});
export default SearchResults;
