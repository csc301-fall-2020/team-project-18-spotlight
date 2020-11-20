import React, { Component, useEffect, useState } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import MapView, { AnimatedRegion } from "react-native-maps";
import * as Location from "expo-location";
import GymMarker from "../components/GymMarker";
import { Button } from "native-base";
import { Searchbar } from "react-native-paper";
import {
  requestLocationPermissions,
  getLocation,
} from "../../../../services/locationService";

const MapScreen = ({ navigation }) => {
  /**
   * @typedef {Object} Marker
   * @property {number} longitude
   * @property {number} latitude
   * @property {string} title
   * @property {string} address
   */

  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [markers, setMarkers] = useState([
    {
      longitude: -79.4152,
      latitude: 43.82873,
      title: "Placeholder gym",
      address: "69 bayview ave",
    },
    {
      longitude: -79.414075,
      latitude: 43.831143,
      title: "Placeholder gym 2",
      address: "55 yonge st",
    },
  ]);

  // This is called upon the first rendering of the screen
  useEffect(() => {
    requestLocationPermissions().catch((e) => setErrorMessage(e.message));
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

  if (errorMessage) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Gyms Nearby</Text>
        <Text style={styles.description}>{errorMessage}</Text>
      </View>
    );
  }

  const [searchQuery, setSearchQuery] = useState("");

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

      {location ? (
        <MapView style={styles.map} region={location}>
          {markers.map((marker, i) => (
            <GymMarker
              key={i}
              title={marker.title}
              address={marker.address}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              onCalloutPress={() =>
                navigation.navigate("GymInfo", {
                  // Paramaters to pass to pop-up gym info screen
                  title: marker.title,
                  address: marker.address,
                })
              }
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
    // borderColor: "#A20A0A",
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
