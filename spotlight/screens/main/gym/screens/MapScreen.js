import React, { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import GymMarker from "../components/GymMarker";
import { Searchbar } from "react-native-paper";
import { getLocation } from "../../../../services/locationService";
import {
  getAllGyms,
  subscribeAllGyms,
  subscribeFavorites,
} from "../../../../services/gymService";
import { AuthContext } from "../../../authentication/EmailContext/AuthProvider";

const MapScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
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

  const [searchQuery, setSearchQuery] = useState("");

  // Get list of gyms from firestore
  // useEffect(() => {
  //   getAllGyms(user.uid)
  //     .then((gyms) => {
  //       setMarkers(gyms);
  //     })
  //     .catch((e) => setErrorMessage(e));
  // }, []);

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

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gyms Nearby (More to Come!)</Text>

      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        showCancel={true}
        iconColor={"#A20A0A"}
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
      ) : (
        <Text style={styles.description}>Loading...</Text>
      )}
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
});

export default MapScreen;
