import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { RadioButton } from "react-native-paper";

const GenderInput = ({ gender, onValueChange }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Gender</Text>
      <RadioButton.Group onValueChange={onValueChange} value={gender}>
        <RadioButton.Item label="Male" value="male" />
        <RadioButton.Item label="Female" value="female" />
        <RadioButton.Item label="Non-binary" value="non-binary" />
      </RadioButton.Group>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginTop: 5,
    marginBottom: 5,
  },
  headerTitle: {
    fontWeight: "bold",
    textTransform: "uppercase",
    marginTop: 5,
    marginBottom: 5,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 20,
    textAlign: "center",
  },
  //   country:{
  //       marginTop: 10,
  //       marginBottom: 60,
  //       padding: 0,
  //       backgroundColor:"pink"
  //   },
  //   welcome: {
  //     fontSize: 20,
  //     textAlign: 'center',
  //     margin: 10,
  //   },
  instructions: {
    fontSize: 12,
    textAlign: "center",
    color: "#888",
    marginBottom: 5,
  },
  //   data: {
  //     padding: 15,
  //     marginTop: 10,
  //     backgroundColor: '#ddd',
  //     borderColor: '#888',
  //     color: '#777'
  //   },
  register: {
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: "green",
  },
  info: {
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 15,
    paddingVertical: 40,
    paddingHorizontal: 20,
    width: "90%",
    marginVertical: 60,
    marginHorizontal: "auto",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    zIndex: 3,
  },
});
export { GenderInput };
