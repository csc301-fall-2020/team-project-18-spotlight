import * as firebase from "firebase";
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

const getAllUsers = () => {
  return [];
};

export { getAllUsers, createNewUser };
