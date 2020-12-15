import React, { useState, useContext } from "react";
import {
  Text,
  View,
  Button,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
} from "react-native";
import WorkoutDetails from "../components/WorkoutDetails";
import { AuthContext } from "../../../authentication/EmailContext/AuthProvider";
import { useEffect } from "react";
import moment from "moment";
import { getWorkoutNotes } from "../../../../services/workoutService";
import { AntDesign } from "@expo/vector-icons";

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
      <Text style={styles.subheader}>{moment(day).format("dddd")}</Text>
      <Text style={styles.header}>{moment(day).format("MMMM D, YYYY")}</Text>
      <TouchableHighlight
        style={styles.back}
        underlayColor={"#A20A0A"}
        onPress={() => navigation.navigate("Calendar Stack")}
      >
        <Text style={styles.backText}>Back</Text>
      </TouchableHighlight>

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
    fontSize: 30,
    fontStyle: "normal",
    textAlign: "center",
    marginBottom: 10,
  },
  subheader: {
    fontSize: 24,
    color: "#A20A0A",
    fontWeight: "200",
    paddingTop: "10%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  scrollable: {
    marginTop: 15,
    width: "100%",
    backgroundColor: "#eee",
    padding: 10,
  },
  back: {
    borderColor: "#A20A0A",
    borderWidth: 1,
    padding: 3,
    borderRadius: 3,
  },
  backText: {
    fontSize: 10,
    color: "#A20A0A",
  },
});

export default AddWorkoutScreen;
