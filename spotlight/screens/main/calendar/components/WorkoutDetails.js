import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";

const WorkoutDetails = (props) => {
  const [exercises, setExercises] = useState([
    {
      title: "Tap me to remove",
      weight: ":)",
      reps: "",
    },
  ]);
  const [title, setTitle] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");

  const addExercise = () => {
    var newExercise = { title: title, weight: weight, reps: reps };
    setExercises((exercises) => [...exercises, newExercise]);

    setTitle("");
    setWeight("");
    setReps("");
  };

  const removeExercise = (index) => {
    setExercises((exercises) => [
      ...exercises.slice(0, index),
      ...exercises.slice(index + 1),
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{props.muscle}</Text>

      <View
        style={{
          flexDirection: "row",
          height: 20,
          width: 300,
        }}
      >
        <Text style={{ flex: 0.6, textAlign: "center" }}>Title</Text>
        <Text style={{ flex: 0.2, textAlign: "center" }}>Lbs</Text>
        <Text style={{ flex: 0.2, textAlign: "center" }}>Reps</Text>
      </View>

      {exercises.map((exercise, index) => {
        return (
          <TouchableOpacity
            style={styles.exercise}
            onPress={() => removeExercise(index)}
          >
            <Text style={{ flex: 0.6, textAlign: "center", color: "white" }}>
              {exercise.title}
            </Text>
            <Text style={{ flex: 0.2, textAlign: "center", color: "white" }}>
              {exercise.weight}
            </Text>
            <Text style={{ flex: 0.2, textAlign: "center", color: "white" }}>
              {exercise.reps}
            </Text>
          </TouchableOpacity>
        );
      })}

      <View
        style={{
          flexDirection: "row",
          height: 30,
          width: 300,
        }}
      >
        <View style={{ flex: 0.6 }}>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={{ flex: 0.2 }}>
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={(text) => setWeight(text)}
          />
        </View>
        <View style={{ flex: 0.2 }}>
          <TextInput
            style={styles.input}
            value={reps}
            onChangeText={(text) => setReps(text)}
          />
        </View>
      </View>
      <TouchableHighlight style={styles.button} onPress={() => addExercise()}>
        <Text style={styles.textStyle}>Add</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 24,
    fontStyle: "normal",
    textAlign: "left",
    marginLeft: 5,
    color: "#fff",
  },
  container: {
    backgroundColor: "#d3d3d3",
    justifyContent: "flex-start",
    borderRadius: 10,
    marginBottom: 10,
  },
  input: {
    borderColor: "#d3d3d3",
    borderWidth: 1,
    backgroundColor: "#fafafa",
    borderRadius: 5,
    height: 30,
    margin: 5,
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
  exercise: {
    backgroundColor: "#888",
    borderRadius: 10,
    flexDirection: "row",
    height: 20,
    margin: 5,
    marginBottom: 1,
  },
});

export default WorkoutDetails;
