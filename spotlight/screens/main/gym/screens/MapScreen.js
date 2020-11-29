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
  const [markers, setMarkers] = useState(null);
  const [favorites, setFavorites] = useState(null);
  const { user } = useContext(AuthContext);

  // Get location of user
  useEffect(() => {
    getLocation()
      .then((coords) => {
        setLocation({
          ...coords,
          latitudeDelta: 0.0922, // These two deltas determine how zoomed in the map is initially
          longitudeDelta: 0.0421, // The larger the delta, the more zoomed out the map is });
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
    const unsubscribeGyms = subscribeAllGyms((gyms) => {
      console.log("setting markers");
      setMarkers(gyms);
    });

    const unsubscribeFavorites = subscribeFavorites(user.uid, (favorites) => {
      setFavorites(favorites);
      console.log(favorites);
    });

    return () => {
      unsubscribeGyms();
      unsubscribeFavorites();
    };
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
      <Text style={styles.header}>Gyms Nearby</Text>

      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        showCancel={true}
        iconColor={"#A20A0A"}
      />

      {location && markers && favorites ? (
        <MapView style={styles.map} region={location}>
          {markers.map((marker, i) => (
            <GymMarker
              key={i}
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
