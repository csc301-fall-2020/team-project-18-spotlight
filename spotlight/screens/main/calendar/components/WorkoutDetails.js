import React, { useState } from "react";
import { useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from "react-native";

import { addWorkout } from "../../../../services/workoutService";
import { AuthContext } from "../../../authentication/EmailContext/AuthProvider";

const WorkoutDetails = ({ muscle, day, notes }) => {
  const [savedNotes, setSavedNotes] = useState(notes);
  const [editNotes, setEditNotes] = useState("");
  const [editMode, toggleEditMode] = useState(false);
  const [firstTime, toggleFirstTime] = useState(true);
  const { user } = useContext(AuthContext);

  const saveNotes = () => {
    (async () => {
      await setSavedNotes(editNotes);
      await addWorkout(user.uid, day, { [muscle]: editNotes });
      await setEditNotes(notes);
      await toggleEditMode(false);
    })();
  };

  const cancelEdit = () => {
    toggleEditMode(false);
  };

  const firstSave = () => {
    (async () => {
      await setSavedNotes(editNotes);
      await addWorkout(user.uid, day, { [muscle]: editNotes });
      await setEditNotes(notes);
      await toggleEditMode(false);
    })();
    toggleFirstTime(false);
  };

  const enterFirstEdit = () => {
    setEditNotes(notes);
    toggleEditMode(true);
  };

  const enterEdit = () => {
    setEditNotes(savedNotes);
    toggleEditMode(true);
  };

  return (
    <View style={styles.container}>
      {editMode && firstTime && (
        <View>
          <View
            style={{
              flexDirection: "row",
              height: 50,
              width: 320,
            }}
          >
            <View style={{ flex: 0.6 }}>
              <Text style={styles.header}>{muscle}</Text>
            </View>
            <View style={{ flex: 0.05 }}>
              <TouchableHighlight
                style={styles.cancel}
                onPress={() => cancelEdit()}
              >
                <Text style={styles.textStyle}>x</Text>
              </TouchableHighlight>
            </View>
            <View style={{ flex: 0.2 }}>
              <TouchableHighlight
                style={styles.clear}
                onPress={() => setEditNotes("")}
              >
                <Text style={styles.textStyle}>Clear</Text>
              </TouchableHighlight>
            </View>
            <View style={{ flex: 0.1 }}>
              <TouchableHighlight
                style={styles.button}
                onPress={() => firstSave()}
              >
                <Text style={styles.textStyle}>Save</Text>
              </TouchableHighlight>
            </View>
          </View>

          <View
            style={{
              margin: 10,
            }}
          >
            <TextInput
              style={styles.input}
              value={editNotes}
              onChangeText={(text) => setEditNotes(text)}
            />
          </View>
        </View>
      )}

      {editMode && !firstTime && (
        <View>
          <View
            style={{
              flexDirection: "row",
              height: 50,
              width: 320,
            }}
          >
            <View style={{ flex: 0.6 }}>
              <Text style={styles.header}>{muscle}</Text>
            </View>
            <View style={{ flex: 0.05 }}>
              <TouchableHighlight
                style={styles.cancel}
                onPress={() => cancelEdit()}
              >
                <Text style={styles.textStyle}>x</Text>
              </TouchableHighlight>
            </View>
            <View style={{ flex: 0.2 }}>
              <TouchableHighlight
                style={styles.clear}
                onPress={() => setEditNotes("")}
              >
                <Text style={styles.textStyle}>Clear</Text>
              </TouchableHighlight>
            </View>
            <View style={{ flex: 0.1 }}>
              <TouchableHighlight
                style={styles.button}
                onPress={() => saveNotes()}
              >
                <Text style={styles.textStyle}>Save</Text>
              </TouchableHighlight>
            </View>
          </View>

          <View
            style={{
              margin: 10,
            }}
          >
            <TextInput
              style={styles.input}
              value={editNotes}
              onChangeText={(text) => setEditNotes(text)}
            />
          </View>
        </View>
      )}

      {!editMode && firstTime && (
        <View>
          <View
            style={{
              flexDirection: "row",
              height: 50,
              width: 320,
            }}
          >
            <View style={{ flex: 0.8 }}>
              <Text style={styles.header}>{muscle}</Text>
            </View>
            <View style={{ flex: 0.2 }}>
              <TouchableHighlight
                style={styles.button}
                onPress={() => enterFirstEdit()}
              >
                <Text style={styles.textStyle}>Edit</Text>
              </TouchableHighlight>
            </View>
          </View>

          <View style={styles.notesBox}>
            <Text style={styles.notes}>{notes}</Text>
          </View>
        </View>
      )}

      {!editMode && !firstTime && (
        <View>
          <View
            style={{
              flexDirection: "row",
              height: 50,
              width: 320,
            }}
          >
            <View style={{ flex: 0.8 }}>
              <Text style={styles.header}>{muscle}</Text>
            </View>
            <View style={{ flex: 0.2 }}>
              <TouchableHighlight
                style={styles.button}
                onPress={() => enterEdit()}
              >
                <Text style={styles.textStyle}>Edit</Text>
              </TouchableHighlight>
            </View>
          </View>

          <View style={styles.notesBox}>
            <Text style={styles.notes}>{savedNotes}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 24,
    fontStyle: "normal",
    textAlign: "left",
    marginLeft: 10,
    marginTop: 10,
    color: "#000",
  },
  container: {
    backgroundColor: "#d3d3d3",
    justifyContent: "center",
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
    marginTop: 15,
    marginBottom: 5,
  },
  cancel: {
    backgroundColor: "#A20A0A",
    alignSelf: "center",
    justifyContent: "center",
    width: 25,
    height: 20,
    borderRadius: 20,
    elevation: 2,
    marginTop: 15,
    marginBottom: 5,
  },
  clear: {
    backgroundColor: "#888",
    alignSelf: "center",
    justifyContent: "center",
    width: 45,
    height: 20,
    borderRadius: 20,
    elevation: 2,
    marginTop: 15,
    marginBottom: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 9,
  },
  exercise: {
    backgroundColor: "#888",
    borderRadius: 10,
    flexDirection: "row",
    height: 20,
    margin: 5,
    marginBottom: 1,
  },
  notesBox: {
    margin: 10,
    backgroundColor: "#aaa",
    borderRadius: 10,
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
  },
  notes: {
    margin: 10,
    color: "white",
  },
});

/*const [exercises, setExercises] = useState([
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
  
        <View
        style={{
          flexDirection: "row",
          height: 20,
          width: 320,
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
          width: 320,
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
      </View>*/

export default WorkoutDetails;
