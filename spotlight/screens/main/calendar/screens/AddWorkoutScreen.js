import React, { useState, useContext } from "react";
import { Text, View, Button, StyleSheet, ScrollView } from "react-native";
import WorkoutDetails from "../components/WorkoutDetails";
import { AuthContext } from "../../../authentication/EmailContext/AuthProvider";
import { useEffect } from "react";
import { getWorkoutNotes } from "../../../../services/workoutService";

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

  const { user } = useContext(AuthContext);
  const [workoutData, setWorkoutData] = useState(
    getWorkoutNotes(user.uid, day)
  );

  /*
  Gets the data from firestore about today's workout notes from day. The structure of the data is as following: 
  {
    muscle: notes where muscle is one of the elements from muscles.
  }

  Note that not every muscle has data (which means the user has not inputted any data on that specific muscle).
  */
  useEffect(() => {
    (async () => {
      const data = await getWorkoutNotes(user.uid, day);
      await setWorkoutData(data);
    })();
  }, []);

  const findNotes = (muscle) => {
    if (workoutData == null || workoutData[muscle] == null) {
      return "Nothing here yet! Press edit to add something!";
    }
    return workoutData[muscle];
  };

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
          return (
            <WorkoutDetails
              muscle={muscle}
              day={day}
              notes={findNotes(muscle)}
            />
          );
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
