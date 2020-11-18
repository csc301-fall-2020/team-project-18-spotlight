import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { IconButton, Colors } from "react-native-paper";

const GymInfo = ({ route, navigation }) => {
  // Parameters passed from previous screen
  const { title, address } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
      <Text style={styles.description}>{address}</Text>
      <View style={styles.block}>
        <View style={styles.profile} />
        <View style={styles.data} />
        <Button
          style={{ paddingTop: "5%" }}
          title="Return to map"
          onPress={() => navigation.goBack()}
          
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  block: {
    flex: 1,
    backgroundColor: "#fff",
    paddingRight: "5%",
    paddingLeft: "5%",
    marginLeft: "5%",
    marginRight: "5%",
  },
  header: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 30,
    fontStyle: "normal",
    textAlign: "center",
    paddingTop: "20%",
  },
  description: {
    fontFamily: "Raleway_600SemiBold",
    textAlign: "center",
    marginBottom: "5%",
    paddingLeft: "3%",
  },
  profile: {
    flex: 0.3,
    backgroundColor: "#d3d3d3",
    borderRadius: 10,
    paddingTop: "85%",
    marginBottom: "5%",
  },
  data: {
    flex: 0.3,
    backgroundColor: "#d3d3d3",
    borderRadius: 10,
    paddingBottom: "50%",
    marginBottom: "5%",
  },
});

export default GymInfo;
