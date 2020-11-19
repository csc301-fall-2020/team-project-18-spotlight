import * as firebase from "firebase";
import "firebase/firestore";

const getFriends = async (userID) => {
  const db = firebase.firestore();
  const friendsRef = db.collection("users").doc(userID).collection("friends");

  try {
    const allFriends = await friendsRef.get();
    if (!allFriends.empty) {
      return allFriends.docs.map((queryDocumentSnapshot) => {
        return queryDocumentSnapshot.data();
      });
    } else {
      return [];
    }
  } catch {
    console.log("Something went wrong with the friends request.");
    return [];
  }
};

export default getFriends;
