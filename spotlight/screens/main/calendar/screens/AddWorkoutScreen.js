import React, { useState, useContext } from "react";
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
} from "react-native";
import WorkoutDetails from "../components/WorkoutDetails";
import { AuthContext } from "../../../authentication/EmailContext/AuthProvider";
import { useEffect } from "react";
import { getWorkoutNotes } from "../../../../services/workoutService";
import { AntDesign } from "@expo/vector-icons";

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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          height: 100,
          width: "100%",
          marginBottom: 10,
        }}
      >
        <View style={{ flex: 0.2 }}>
          <TouchableHighlight
            style={styles.button}
            onPress={() => navigation.navigate("Calendar Stack")}
          >
            <AntDesign name="leftcircle" size={30} color="#A20A0A" />
          </TouchableHighlight>
        </View>

        <View style={{ flex: 0.8 }}>
          <Text style={styles.header}>{day}</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollable}>
        {muscles.map((muscle, key) => {
          return (
            <View key={key}>
              <WorkoutDetails
                muscle={muscle}
                day={day}
                notes={findNotes(muscle)}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 50,
    fontStyle: "normal",
    color: "#000",
    position: "absolute",
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
  button: {
    position: "absolute",
    left: "25%",
    top: "20%",
  },
});

export default AddWorkoutScreen;
