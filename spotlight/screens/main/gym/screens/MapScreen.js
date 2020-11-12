import React, { Component, useEffect, useState } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import MapView, { AnimatedRegion } from "react-native-maps";
import * as Location from "expo-location";
import GymMarker from "../components/GymMarker";

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

  useEffect(() => {
    const requestLocation = async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        console.warn("Permission to access location was denied");
        setErrorMessage("Permission to access location was denied");
      }
      try {
        const {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({
          accuracy: 3,
        });
        console.log("current user latitude + longitude:", latitude, longitude);
        setLocation({
          latitude,
          longitude,
          latitudeDelta: 0.0922, // These two deltas determine how zoomed in the map is initially
          longitudeDelta: 0.0421, // The larger the delta, the more zoomed out the map is
        });
      } catch ({ code, message }) {
        console.log(code, message);
        setErrorMessage(`${code}: ${message}`);
      }
    };
    requestLocation();
  }, []);

  if (errorMessage) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Gyms Nearby</Text>
        <Text style={styles.description}>{errorMessage}</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gyms Nearby</Text>

      <Text style={styles.description}>
        Find a workout partner at your local gym.
      </Text>

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
    padding: 7,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    marginTop: "40%",
    paddingBottom: "5%",
    marginLeft: "5%",
    marginRight: "5%",
    justifyContent: "flex-end",
    borderWidth: 1,
  },
  header: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 30,
    fontStyle: "normal",
    textAlign: "left",
    paddingTop: "20%",
    paddingLeft: "3%",
  },
  description: {
    fontFamily: "Raleway_600SemiBold",
    marginBottom: "5%",
    paddingLeft: "3%",
    paddingBottom: "10%",
  },
});

export default MapScreen;
