import firebase from "firebase/app";
import "firebase/firestore";

/**
 * Adds workout data to userID.
 * Each date will be a document in the "workout" collection, and each date will possess data.
 * @param {*} userID
 * @param {*} date
 * @param {*} data
 */
const addWorkout = async (userID, date, data) => {
  const db = firebase.firestore();
  const userRef = db.collection("users").doc(userID);
  const workoutRef = userRef.collection("workouts").doc(date);
  try {
    const workoutDoc = await workoutRef.get();
    if (!workoutDoc.exists) {
      await workoutRef.set(data);
    } else {
      await workoutRef.update(data);
    }

    console.log("Successfully added workout.");
  } catch (e) {
    console.log("Something went wrong in addWorkout:", e.message);
  }
};

const getWorkoutNotes = async (userID, date) => {
  const db = firebase.firestore();
  const workoutRef = db
    .collection("users")
    .doc(userID)
    .collection("workouts")
    .doc(date);
  try {
    const workoutDoc = await workoutRef.get();
    return workoutDoc.data();
  } catch (e) {
    throw new Error("Something went wrong in getWorkoutNotes:", e.message);
  }
};

export { addWorkout, getWorkoutNotes };
