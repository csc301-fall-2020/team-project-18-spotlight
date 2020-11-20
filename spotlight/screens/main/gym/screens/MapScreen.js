import React, { Component, useEffect, useState } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import MapView, { AnimatedRegion } from "react-native-maps";
import * as Location from "expo-location";
import GymMarker from "../components/GymMarker";
import { Button } from "native-base";
import { Searchbar } from 'react-native-paper';

const MapScreen = ({ navigation }) => {
  /**
   * @typedef {Object} Marker
   * @property {number} i
   * @property {number} latitude
   * @property {string} title
   * @property {string} address
   */

  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [markers, setMarkers] = useState([
    {
      longitude: -79.5353,
      latitude: 43.7896,
      title: "GoodLife Fitness Vaughan Metropolitian Centre",
      address: "90 Interchange Way Concord ON",
    },
    {
      longitude: -79.544792,
      latitude: 43.790909,
      title: "57 Northview Blvd. Vaughan ON",
      address: "57 Northview Blvd. Vaughan ON",
    },
    {
      longitude: -79.501129,
      latitude: 43.798580,
      title: "Goodlife Keele St.",
      address: "7700 Keele St. Vaughan ON",
    },
    {
      longitude: -79.551850,
      latitude: 43.847000,
      title: "201-3420 MAjor Mackenzie Dr W Woodbridge ON",
      address: "201-3420 MAjor Mackenzie Dr W Woodbridge ON",
    },
  ]);


  // This is called upon the first rendering of the screen
  useEffect(() => {
    const requestLocation = async () => {
      // Try and request location permissions from user.
      const { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        console.warn("Permission to access location was denied");
        setErrorMessage("Permission to access location was denied");
        return;
      }

      // Get current location of user
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

  const [searchQuery, setSearchQuery] = React.useState('');
  
  const onChangeSearch = query => setSearchQuery(query);

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
  },
  search:{
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
    marginBottom: "3%"
  },
  description: {
    fontFamily: "Raleway_600SemiBold",
    marginBottom: "5%",
    paddingLeft: "3%",
    paddingBottom: "10%",
  },
});

export default MapScreen;
