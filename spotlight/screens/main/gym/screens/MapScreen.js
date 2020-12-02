import React, { useEffect, useState, useContext, c } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import MapView from "react-native-maps";
import GymMarker from "../components/GymMarker";
import { Searchbar } from "react-native-paper";
import { getLocation } from "../../../../services/locationService";
import {
  getAllGyms,
  subscribeAllGyms,
  subscribeFavorites,
} from "../../../../services/gymService";
import { queryUserByName } from "../../../../services/userService";
import { AuthContext } from "../../../authentication/EmailContext/AuthProvider";
import SearchFriendProfileModal from "./SearchFriendProfileModal";

const MapScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const { user } = useContext(AuthContext);
  const [searchUsers, setSearchUsers] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [searching, setSearching] = useState(null);
  const [prevText, setPrevText] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState("");

  // Get location of user
  useEffect(() => {
    getLocation()
      .then((coords) => {
        setLocation({
          ...coords,
          latitudeDelta: 0.4922, // These two deltas determine how zoomed in the map is initially
          longitudeDelta: 0.4421, // The larger the delta, the more zoomed out the map is });
        });
      })
      .catch((e) => setErrorMessage(e.message));
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  // subscribe to gyms
  useEffect(() => {
    try {
      return subscribeAllGyms((gyms) => {
        setMarkers(gyms);
      });
    } catch (e) {
      setErrorMessage(e.message);
    }
  }, []);

  useEffect(() => {
    try {
      return subscribeFavorites(user.uid, (favoriteGyms) => {
        setFavorites(favoriteGyms);
      });
    } catch (e) {
      setErrorMessage(e.message);
    }
  }, []);

  if (errorMessage) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Gyms Nearby</Text>
        <Text style={styles.description}>{errorMessage}</Text>
      </View>
    );
  }

  const onChangeText = (text) => {
    setSearchQuery(text);
  };

  const onSearch = async () => {
    setSearching(true);
    const newUsers = await queryUserByName(searchQuery);
    setSearchUsers(newUsers);

    if (searchQuery.length == 0) {
      setSearching(false);
    }
  };

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
    // console.log(item);
    const backgroundColor = item.id === selectedId ? "#fff" : "#fff";
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

      <Text style={styles.header}>Gyms Nearby (More to Come!)</Text>

      <Searchbar
        placeholder="Search For Users"
        onChangeText={(text) => onChangeText(text)}
        value={searchQuery}
        showCancel={true}
        iconColor={"#A20A0A"}
        onIconPress={onSearch}
      />

      <FlatList
        data={searchUsers}
        renderItem={searching ? renderItem : null}
        keyExtractor={(item) => {
          item.userID;
        }}
        extraData={selectedId}
      />

      {location && markers && favorites && !searching ? (
        <MapView key={new Date()} style={styles.map} initialRegion={location}>
          {markers.map((marker) => (
            <GymMarker
              key={marker.id}
              title={marker.title}
              address={marker.address}
              coordinate={marker.longlat}
              onCalloutPress={() =>
                navigation.navigate("GymInfo", {
                  // Paramaters to pass to pop-up gym info screen
                  title: marker.title,
                  address: marker.address,
                  gymID: marker.id,
                  isFavorite: favorites.includes(marker.id),
                })
              }
              isFavorite={favorites.includes(marker.id)}
            />
          ))}
        </MapView>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "5%",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    marginTop: "50%",
    paddingBottom: "5%",
    marginLeft: "5%",
    marginRight: "5%",
    justifyContent: "flex-end",
    borderWidth: 1,
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

export default MapScreen;
