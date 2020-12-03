import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";

const MuscleSelector = (props) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
    >
      <Text style={styles.header}>Select a body part</Text>
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 24,
    fontStyle: "normal",
    textAlign: "left",
    marginLeft: 20,
    marginTop: 40,
    color: "#000",
  },
  container: {
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#000",
    alignSelf: "center",
    justifyContent: "center",
    width: 40,
    height: 20,
    borderRadius: 20,
    elevation: 2,
    marginTop: 10,
    marginBottom: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 10,
  },
});

export default MuscleSelector;
