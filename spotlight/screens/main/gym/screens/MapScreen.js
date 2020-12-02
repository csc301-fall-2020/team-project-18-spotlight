import React, { useEffect, useState, useContext, c } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
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
import { getAllUsers } from "../../../../services/userService";
import { AuthContext } from "../../../authentication/EmailContext/AuthProvider";

const MapScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState(null);
  const [searchUsers, setSearchUsers] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [searching, setSearching] = useState(null);
  const [prevText, setPrevText] = useState(null);

  useEffect(() => {
    getAllUsers()
      .then((users) => {
        setUsers(users);
      })
      .catch((e) => setErrorMessage(e));
  }, []);

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
    return subscribeAllGyms((gyms) => {
      setMarkers(gyms);
    });
  }, []);

  useEffect(() => {
    return subscribeFavorites(user.uid, (favoriteGyms) => {
      setFavorites(favoriteGyms);
    });
  }, []);

  if (errorMessage) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Gyms Nearby</Text>
        <Text style={styles.description}>{errorMessage}</Text>
      </View>
    );
  }

  function searchFilterFunction(text) {
    setSearchQuery(text);
    // if (prevText.length < text.length){
    //   set
    // }
    const newUsers = users.filter((item) => {
      const itemData = `${item["firstName"]} ${item["lastName"]}`;
      const textData = text;
      return itemData.indexOf(textData) > -1;
    });
    setSearchUsers(newUsers);
    setSearching(true);

    setPrevText(text);
    if (text.length == 0) {
      setSearching(false);
    }
  }

  const onChangeSearch = (query) => setSearchQuery(query);
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
    const backgroundColor = item.id === selectedId ? "#fff" : "#fff";
    return (
      <Item
        item={item}
        onPress={() => navigation.navigate("Profile")}
        style={{ backgroundColor }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gyms Nearby (More to Come!)</Text>

      <Searchbar
        placeholder="Search"
        onChangeText={(text) => searchFilterFunction(text)}
        value={searchQuery}
        showCancel={true}
        iconColor={"#A20A0A"}
      />

      <FlatList
        data={searchUsers}
        renderItem={searching ? renderItem : null}
        keyExtractor={(item) => item["userID"]}
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
