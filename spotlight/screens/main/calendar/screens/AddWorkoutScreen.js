import React, { useState } from "react";
import { Text, View, Button, StyleSheet, ScrollView } from "react-native";
import WorkoutDetails from "../components/WorkoutDetails";
//import MuscleSelector from '../components/MuscleSelector';

/*  const [modalVisible, setModalVisible] = useState(false);

<Button
title="+"
color="#000"
onPress={() => {
  setModalVisible(true);
}}/>

<MuscleSelector modalVisible={modalVisible}/>*/

const AddWorkoutScreen = ({ route, navigation }) => {
  const { day } = route.params;
  const muscles = [
    "Arms",
    "Abs",
    "Back",
    "Glutes",
    "Legs",
    "Shoulders",
    "Cardio",
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{day}</Text>
      <Button
        title="Back"
        color="#A20A0A"
        onPress={() => navigation.navigate("Calendar Stack")}
      />

      <ScrollView style={styles.scrollable}>
        {muscles.map((muscle) => {
          return <WorkoutDetails muscle={muscle} />;
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 36,
    fontStyle: "normal",
    textAlign: "center",
    paddingTop: "12%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  scrollable: {
    marginTop: 10,
  },
});

export default AddWorkoutScreen;
