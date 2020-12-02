import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  FlatList,
  Modal,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { queryUserByName } from "../../../../services/userService";
import SearchFriendProfileModal from "./SearchFriendProfileModal";

/**
 * @typedef {Object} Props
 * @property {string} initialQuery
 */

/**
 * @param {Props} props
 */
const SearchResults = ({ navigation, route }) => {
  const [searched, setSearched] = useState(false);
  const { initialQuery } = route.params;
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [userResults, setUserResults] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState("");

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
      <Text style={{ fontSize: 22, color: "#000" }}>
        {item["firstName"]} {item["lastName"]}
      </Text>
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
        keyExtractor={(item) => item.userID}
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
  description: {
    fontFamily: "Raleway_600SemiBold",
    marginBottom: "5%",
    paddingLeft: "3%",
    paddingBottom: "10%",
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
export default SearchResults;
