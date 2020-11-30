import firebase from "firebase/app";
import "firebase/firestore";

const createNewUser = async (userID) => {
  console.log("Trying to add user", userID);
  const data = { userID: userID };
  const db = firebase.firestore();
  try {
    const userRef = db.collection("users").doc(userID);
    userRef.get().then((doc) => {
      if (!doc.exists) {
        userRef.set(data);
      }
    });
  } catch (e) {
    console.log(e);
  }
};

/**
 * @param {string} userID
 */
const getUser = async (userID) => {
  const db = firebase.firestore();
  const userRef = db.collection("users").doc(userID);
  return await userRef.get();
};

const getAllUsers = () => {
  return [];
};

export { getAllUsers, createNewUser, getUser };
