import React, { Component, useEffect, useState } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import MapView, { AnimatedRegion } from "react-native-maps";
import * as Location from "expo-location";

import { region } from "../components/UserLocation";

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
        console.log("current user lattitude + longitude:", latitude, longitude);
        setLocation({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
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
        <MapView style={styles.map} region={location} />
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
