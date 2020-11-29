import * as firebase from "firebase";
import "firebase/firestore";
import useFirestoreQuery from "../hooks/useFirestoreQuery";
import { Alert } from "react-native";

/**
 * @typedef {Object} LongLat
 * @property {number} longitude
 * @property {number} latitude
 */
/**
 * @typedef {Object} GymCoordinate
   @property {LongLat} longlat
 * @property {string} title
 * @property {string} address
 * @property {boolean} isFavorite
 * @property {array} users
 */

/**
 * @param {string} gymID
 * @param {string} userID
 * @returns {boolean} Whether the given gym has been favorited by the user.
 * @throws {Error} If the given user does not exist.
 */
const isGymFavorited = async (gymID, userID) => {
  const db = firebase.firestore();
  const userRef = await db.collection("users").doc(userID);
  userRef.onSnapshot;
  const user = await db.collection("users").doc(userID).get();
  if (!user.exists) {
    throw new Error("User does not exist.");
  }

  const userFavoriteGyms = user.data().favoriteGyms ?? [];

  return userFavoriteGyms.map((ref) => ref.id).includes(gymID);
};

/**
 * @param {string} gymID
 * @param {string} userID
 * @returns {boolean} Whether the user is attending the gym.
 * @throws {Error} If the given user does not exist.
 */
const isGymAttended = async (gymID, userID) => {
  const db = firebase.firestore();
  const gymRef = db.collection("gyms").doc(gymID);
  const userRef = await db.collection("users").doc(userID);
  userRef.onSnapshot;
  const user = await db.collection("users").doc(userID).get();
  const gymDocSnapshot = await gymRef.get();

  if (!user.exists) {
    throw new Error("User does not exist.");
  }
  if (!gymDocSnapshot.exists) {
    throw new Error(`${gymID} is not a valid gymID!`);
  }

  const userAttendGym = gymDocSnapshot.data().users ?? [];
  return userAttendGym.map((ref) => ref.id).includes(userID);
};

/**
 * @param {firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>} gymDocument
 * @param {string} userID
 * @returns {GymCoordinate}
 */
const processGymDocument = async (gymDocument, userID) => {
  const db = firebase.firestore();
  const gymObj = gymDocument.data();
  const isFavorite = await isGymFavorited(gymDocument.id, userID);
  const isHere = await isGymAttended(gymDocument.id, userID);
  const userRef = db.collection("users").doc(userID);
  const userDocSnapshot = await userRef.get();
  const attending = userDocSnapshot.data().attending;

  return {
    id: gymDocument.id,
    title: gymObj.title,
    address: gymObj.address,
    longlat: gymObj.longlat,
    isFavorite,
    users: gymObj.users,
    isHere,
    attending,
  };
};
/**
 * Get an array of gyms which includes whether the gym is favorited by the user.
 *
 * @param {string} userID
 * @returns {GymCoordinate[]}
 * @throws {Error} if something goes wrong
 */
const getAllGyms = async (userID) => {
  console.log("Getting all gyms from firestore.");
  const db = firebase.firestore();
  const gymsRef = db.collection("gyms");

  try {
    const allGyms = await gymsRef.get();
    return await Promise.all(
      allGyms.docs.map((gymDoc) => processGymDocument(gymDoc, userID))
    );
  } catch (e) {
    throw new Error(
      "Something went wrong while attempting to retrieve all gyms: " + e.message
    );
  }
};

/**
 * @param {string} address
 * @param {string} userID
 * @return {GymCoordinate}
 * @throws {Error} if gym was not found
 */
const getGymByAddress = async (address, userID) => {
  const db = firebase.firestore();
  const gymsRef = db.collection("gyms");
  const foundGyms = await gymsRef.where("address", "==", address).get();
  if (foundGyms.empty) {
    throw new Error("Could not find gym.");
  }

  const foundGym = foundGyms.docs()[0];
  return await processGymDocument(foundGym, userID);
};

const addFavoriteGym = async (gymID, userID) => {
  const db = firebase.firestore();
  const gymRef = db.collection("gyms").doc(gymID);
  const userRef = db.collection("users").doc(userID);
  const gymDocSnapshot = await gymRef.get();
  const userDocSnapshot = await userRef.get();

  // Guards
  if (!gymDocSnapshot.exists) {
    throw new Error(`${gymID} is not a valid gymID!`);
  }
  if (!userDocSnapshot.exists) {
    throw new Error(`${userID} is not a valid userID!`);
  }

  try {
    console.log("Adding gym ", gymID);
    // check if the user has no favoriteGyms attribute yet.
    if (userDocSnapshot.data().favoriteGyms == null) {
      await userRef.update({
        favoriteGyms: [],
      });
    }
    await userRef.update({
      favoriteGyms: firebase.firestore.FieldValue.arrayUnion(gymRef),
    });
  } catch (e) {
    throw new Error("Something went wrong in addFavoriteGym!", e.message);
  }
};

const removeFavoriteGym = async (gymID, userID) => {
  const db = firebase.firestore();
  const gymRef = db.collection("gyms").doc(gymID);
  const userRef = db.collection("users").doc(userID);
  const gymDocSnapshot = await gymRef.get();
  const userDocSnapshot = await userRef.get();

  // Guards
  // Are these necessary? Might just be taking up unnecessary bandwith.
  if (!gymDocSnapshot.exists) {
    throw new Error(`${gymID} is not a valid gymID!`);
  }
  if (!userDocSnapshot.exists) {
    throw new Error(`${userID} is not a valid userID!`);
  }

  try {
    console.log("Removing gymID ", gymID);
    await userRef.update({
      favoriteGyms: firebase.firestore.FieldValue.arrayRemove(gymRef),
    });
  } catch (e) {
    throw new Error("Something went wrong in removeFavoriteGym!", e.message);
  }
};

/**
 * Adds the userID to the user array in gymID
 * @param {*} gymID
 * @param {*} userID
 */
const attendGym = async (gymID, userID) => {
  const db = firebase.firestore();
  const gymRef = db.collection("gyms").doc(gymID);
  const userRef = db.collection("users").doc(userID);
  const userDocSnapshot = await userRef.get();

  // Will have to check if it crashes if a gym does not have the "users" field

  // arrayUnion and arrayRemove are done automically, so we don't have to use transactions.

  try {
    console.log(`${userID} is attending gym ${gymID}`);
    await userRef.update({
      attending: gymID,
    });
    const userDocSnapshot = await userRef.get();
    console.log(userDocSnapshot.get("attending"));
    await gymRef.update({
      users: firebase.firestore.FieldValue.arrayUnion(userRef),
    });
  } catch (e) {
    throw new Error("Something went wrong in attendGym!", e.message);
  }
};

/**
 * removes the userID from the user array in gymID.
 * @param {*} gymID
 * @param {*} userID
 */

const unattendGym = async (gymID, userID) => {
  const db = firebase.firestore();
  const gymRef = db.collection("gyms").doc(gymID);
  const userRef = db.collection("users").doc(userID);

  try {
    console.log(`${userID} is unattending gym ${gymID}`);
    await gymRef.update({
      users: firebase.firestore.FieldValue.arrayRemove({ userRef }),
    });
    await userRef.update({
      attending: null,
    });
  } catch (e) {
    throw new Error("Something went wrong in unattendGym!", e.message);
  }
};

const getUsersInGym = async (gymID) => {
  const db = firebase.firestore();
  const gymRef = db.collection("gyms").doc(gymID);

  try {
    console.log("Retrieving users from gymID!");
    const usersRefs = (await gymRef.get()).get("users");
    return await Promise.all(
      usersRefs.map((userRef) => {
        return userRef.get().data();
      })
    );
  } catch (e) {
    throw new Error("Something went wrong in getUsersInGym!", e.message);
  }
};
/**
 * Gets the users in a specific gymID, and executes onUsersChange on the
 * user data. Returns an unsubscribe function.
 *
 * This should be used in an effect.
 * @param {*} gymID
 * @param {*} onUsersChange
 */
const getUsersInGymSnapshot = async (gymID, onUsersChange) => {
  const db = firebase.firestore();
  const gymRef = db.collection("gyms").doc(gymID);

  const unsubscribe = gymRef.onSnapshot((gymDoc) => {
    (async () => {
      const usersRefs = gymDoc.get("users");
      const usersData = await Promise.all(
        usersRefs.map((userRef) => {
          return userRef.get().data();
        })
      );
      onUsersChange(usersData);
    })();
  });

  return unsubscribe;
};

export {
  getAllGyms,
  isGymFavorited,
  getGymByAddress,
  addFavoriteGym,
  removeFavoriteGym,
  attendGym,
  unattendGym,
  getUsersInGym,
  getUsersInGymSnapshot,
};
