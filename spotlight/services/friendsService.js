import firebase from "firebase/app";
import "firebase/firestore";
import { getUser } from "./userService";

/**
 * Returns an array of friend datas for user userID.
 * @param {*} userID
 */
const getFriends = async (userID) => {
  const db = firebase.firestore();
  const userRef = db.collection("users").doc(userID);
  try {
    const userDoc = await userRef.get();
    const friends = userDoc.get("friends") ?? []; // If no friends, return empty list

    const friendsData = await Promise.all(
      friends.map(async (friendsRef) => {
        return await getUser(friendsRef.id);
      })
    );
    return friendsData;
  } catch (e) {
    console.log(e.message);
  }
};

export default getFriends;
