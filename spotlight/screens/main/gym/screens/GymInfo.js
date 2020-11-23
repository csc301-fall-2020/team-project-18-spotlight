import React from "react";
import { render } from "react-dom";
import { Text, View, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

function add_member(name) {
  // editJsonFile = require("edit-json-file");
  // let file = editJsonFile(`../components/CurrentGym.json`);
  // var data = JSON.parse(fs.readFileSync("../components/CurrentGym.json").toString());
  // data[0]["member"].push("name")
  // fs.writeFile("../components/CurrentGym.json", JSON.stringify(data))

  Alert.alert("", "You are at the gym now!", [{ text: "OK" }], {
    cancelable: false,
  });
}

function add_favourite() {
  Alert.alert("", "You have favourited this gym!", [{ text: "OK" }], {
    cancelable: false,
  });
}

const GymInfo = ({ route, navigation }) => {
  // Parameters passed from previous screen
  const { title, address } = route.params;

  return (
    <View style={styles.container}>
      <Button
        icon="heart-outline"
        iconSize="50"
        labelStyle={{ fontSize: 30 }}
        color="#A20A0A"
        marginTop="8%"
        marginLeft="80%"
        marginRight="10%"
        title="favourite"
        onPress={() => add_favourite()}
      ></Button>

      <Text style={styles.header}>{title}</Text>
      <Text style={styles.description}>{address}</Text>

      <View style={styles.block}>
        <View style={styles.profile} />
        <View style={styles.data} />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button
            title="attend"
            onPress={() => add_member("olivia")}
            color="#A20A0A"
            mode={"outlined"}
          >
            Attend
          </Button>
          <Button
            title="Return to map"
            onPress={() => navigation.goBack()}
            color="#A20A0A"
            mode={"outlined"}
          >
            Return to map
          </Button>
        </View>
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
    paddingTop: "3%",
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
  favourite: {},
});

export default GymInfo;
