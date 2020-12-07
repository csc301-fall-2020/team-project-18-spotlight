import React, { useState } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import CustomCalendar from "../components/CustomCalendar";

const CalendarScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState();

  const updateSelectedDate = (date) => {
    setSelectedDate(date);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Workouts</Text>
      <CustomCalendar updateSelected={updateSelectedDate} />

      {selectedDate && (
        <TouchableHighlight
          style={styles.button}
          onPress={() =>
            navigation.navigate("Add Workout", { day: selectedDate })
          }
        >
          <Text style={styles.textStyle}>Edit Workout</Text>
        </TouchableHighlight>
      )}

      {!selectedDate && (
        <TouchableHighlight style={styles.buttonLocked}>
          <Text style={styles.textStyleLocked}>Select A Date</Text>
        </TouchableHighlight>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 50,
    fontStyle: "normal",
    textAlign: "center",
    paddingTop: "20%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  button: {
    backgroundColor: "#000",
    alignSelf: "center",
    justifyContent: "center",
    width: 260,
    height: 50,
    borderRadius: 5,
    elevation: 2,
    marginTop: 10,
    marginBottom: 5,
  },
  buttonLocked: {
    backgroundColor: "#fff",
    borderColor: "#d3d3d3",
    alignSelf: "center",
    justifyContent: "center",
    width: 260,
    height: 50,
    borderRadius: 5,
    elevation: 2,
    marginTop: 10,
    marginBottom: 5,
    borderWidth: 1,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  textStyleLocked: {
    color: "#d3d3d3",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});

export default CalendarScreen;
