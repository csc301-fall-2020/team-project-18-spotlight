import React, { useEffect, useState, useContext, c } from "react";
import { Text, View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import GymMarker from "../components/GymMarker";
import { getLocation } from "../../../../services/locationService";
import { Searchbar } from "react-native-paper";
import {
  getAllGyms,
  subscribeAllGyms,
  subscribeFavorites,
} from "../../../../services/gymService";
import { AuthContext } from "../../../authentication/EmailContext/AuthProvider";

const MapScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const { user } = useContext(AuthContext);

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

  // subscribe to gyms
  useEffect(() => {
    try {
      getAllGyms().then((gyms) => setMarkers(gyms));
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

  const onSearch = () => {
    navigation.navigate("Search Results", {
      initialQuery: searchQuery,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gyms Nearby (More to Come!)</Text>

      <Searchbar
        placeholder="Search For Users"
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
        showCancel={true}
        iconColor={"#A20A0A"}
        onIconPress={onSearch}
        onSubmitEditing={onSearch}
      />

      {location && markers && favorites ? (
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
    marginTop: "60%",
    paddingBottom: "5%",
    marginLeft: "5%",
    marginRight: "5%",
    justifyContent: "flex-end",
    borderWidth: 1,
  },
  row: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "bold",
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
  list: {
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  description: {
    fontFamily: "Raleway_600SemiBold",
    marginBottom: "5%",
    paddingLeft: "3%",
    paddingBottom: "10%",
  },
  item: {
    padding: "5%",
    marginVertical: 5,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
});

export default MapScreen;
