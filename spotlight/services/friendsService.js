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

/**
 *
 * @param {string} from UserID of user sending request
 * @param {string} to UserID of user receiving request
 */
const sendFriendRequest = async (from, to) => {
  const db = firebase.firestore();
  const fromRef = db.collection("users").doc(from);
  const toRef = db.collection("users").doc(to);
  try {
    const batch = db.batch();
    // Add sent friend request to from's document
    batch.update(fromRef, {
      pendingSentRequests: firebase.firestore.FieldValue.arrayUnion(toRef),
    });
    // Add pending friend request to to's document
    batch.update(toRef, {
      pendingReceivedRequests: firebase.firestore.FieldValue.arrayUnion(
        fromRef
      ),
    });

    await batch.commit();
  } catch (e) {
    console.log("Send Friend Request error: ", e.message);
  }
};

/**
 *
 * @param {string} from userID of person who sent the friend request
 * @param {string} to userID of person who is receiving the friend request
 */
const acceptFriendRequest = async (from, to) => {
  const db = firebase.firestore();
  const fromRef = db.collection("users").doc(from);
  const toRef = db.collection("users").doc(to);

  try {
    const batch = db.batch();
    // Remove pending friend requests from both users
    batch.update(fromRef, {
      pendingSentRequests: firebase.firestore.FieldValue.arrayRemove(toRef),
    });
    batch.update(toRef, {
      pendingReceivedRequests: firebase.firestore.FieldValue.arrayRemove(
        fromRef
      ),
    });

    // add both users to their respective list of friends
    batch.update(fromRef, {
      friends: firebase.firestore.FieldValue.arrayUnion(toRef),
    });
    batch.update(toRef, {
      friends: firebase.firestore.FieldValue.arrayUnion(fromRef),
    });

    await batch.commit();
  } catch (e) {
    console.log(e.message);
  }
};

const rejectFriendRequest = async (from, to) => {
  const db = firebase.firestore();
  const fromRef = db.collection("users").doc(from);
  const toRef = db.collection("users").doc(to);
  try {
    const batch = db.batch();
    // Remove pending friend requests from both users
    batch.update(fromRef, {
      pendingSentRequests: firebase.firestore.FieldValue.arrayRemove(toRef),
    });
    batch.update(toRef, {
      pendingReceivedRequests: firebase.firestore.FieldValue.arrayRemove(
        fromRef
      ),
    });
    await batch.commit();
  } catch (e) {
    console.log(e.message);
  }
};

/**
 *
 * @param {string} userID
 * @param {string} friendToRemove
 */
const removeFriend = async (userID, friendToRemove) => {
  const db = firebase.firestore();
  const userRef = db.collection("users").doc(userID);
  const loserRef = db.collection("users").doc(friendToRemove);

  const batch = db.batch();
  try {
    batch.update(userRef, {
      friends: firebase.firestore.FieldValue.arrayUnion(loserRef),
    });
    batch.update(loserRef, {
      friends: firebase.firestore.FieldValue.arrayUnion(userRef),
    });

    await batch.commit();
  } catch (e) {
    console.log("removeFriend error: ", e.message);
  }
};

const getFriendRequests = async (userID) => {
  const db = firebase.firestore();
  const userRef = db.collection("users").doc(userID);
  try {
    const userDoc = await userRef.get();
    const friendRequests = userDoc.get("pendingReceivedRequests");
    const processedFriendRequests = await Promise.all(
      friendRequests.map((friendRequestRef) => {
        return getUser(friendRequestRef.id);
      })
    );
    return processedFriendRequests;
  } catch (e) {
    console.log("getFriendRequests error: ", e.message);
  }
};

const subscribeToFriends = (userID, onSnapshot) => {
  const db = firebase.firestore();
  const userRef = db.collection("users").doc(userID);
  const unsubscribe = userRef.onSnapshot((userDoc) => {
    (async () => {
      const friends = userDoc.get("friends");
      if (friends) {
        const processedFriends = await Promise.all(
          friends.map((friendRef) => {
            return getUser(friendRef.id);
          })
        );
        onSnapshot(processedFriends);
      }
    })();
  });
  return unsubscribe;
};

const subscribeToFriendRequests = (userID, onSnapshot) => {
  const db = firebase.firestore();
  const userRef = db.collection("users").doc(userID);
  const unsubscribe = userRef.onSnapshot((userDoc) => {
    (async () => {
      const friendRequests = userDoc.get("pendingReceivedRequests");
      if (friendRequests) {
        const processedFriendRequests = await Promise.all(
          friendRequests.map((friendRequestRef) => {
            return getUser(friendRequestRef.id);
          })
        );
        onSnapshot(processedFriendRequests);
      }
    })();
  });
  return unsubscribe;
};

export {
  getFriends,
  removeFriend,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriendRequests,
  subscribeToFriends,
  subscribeToFriendRequests,
};
