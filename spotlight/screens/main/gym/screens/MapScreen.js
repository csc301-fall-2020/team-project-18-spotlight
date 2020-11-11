import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import MapView, { AnimatedRegion } from "react-native-maps";
import GetLocation from "react-native-get-location";

const MapScreen = () => {
  // state = {
  //     location: null,
  //     loading: false,
  // }

  // _requestLocation = () => {
  //     this.setState({ loading: true, location: null });

  //     GetLocation.getCurrentPosition({
  //         enableHighAccuracy: true,
  //         timeout: 150000,
  //     })
  //         .then(location => {
  //             this.setState({
  //                 location,
  //                 loading: false,
  //             });
  //         })
  //         .catch(ex => {
  //             const { code, message } = ex;
  //             console.warn(code, message);
  //             if (code === 'CANCELLED') {
  //                 Alert.alert('Location cancelled by user or by another request');
  //             }
  //             if (code === 'UNAVAILABLE') {
  //                 Alert.alert('Location service is disabled or unavailable');
  //             }
  //             if (code === 'TIMEOUT') {
  //                 Alert.alert('Location request timed out');
  //             }
  //             if (code === 'UNAUTHORIZED') {
  //                 Alert.alert('Authorization denied');
  //             }
  //             this.setState({
  //                 location: null,
  //                 loading: false,
  //             });
  //         });
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gyms Nearby</Text>
      <Text style={styles.description}>
        Find a workout partner at your local gym
      </Text>
      <MapView style={styles.map} />
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
