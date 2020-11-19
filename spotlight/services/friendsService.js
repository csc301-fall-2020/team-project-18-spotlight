import * as firebase from "firebase";
import "firebase/firestore";


/**
 * Returns an array of friends. The structure of the object looks like: 
 * [
 *  {
 *    nickname: string,
 *    name: string, 
 *    uid: string,
 *    thumbnailURL: link to storage for image  // TO BE IMPLEMENTED
 *  }
 * ]
 * 
 * @param {string} userID the userID of the user that you want to get the friends of. 
 * You can get userID by following the snippet: 
 * 
 * import {AuthContext} from 'path here';
 * const {user} = useContext(AuthContext); 
 * user.uid
 * 
 */
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
