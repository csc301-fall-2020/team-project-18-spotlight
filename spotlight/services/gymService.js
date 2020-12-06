import firebase from "firebase/app";
import "firebase/firestore";
import { getUser } from "./userService";

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
 * @property {string} id
 */

/**
 * @param {string} gymID
 * @param {string} userID
 * @returns {boolean} Whether the given gym has been favorited by the user.
 * @throws {Error} If the given user does not exist.
 */
const isGymFavorited = async (gymID, userID) => {
  const db = firebase.firestore();
  const user = await db.collection("users").doc(userID).get();
  if (!user.exists) {
    throw new Error("User does not exist.");
  }

  const userFavoriteGyms = user.data().favoriteGyms ?? [];

  return userFavoriteGyms.map((ref) => ref.id).includes(gymID);
};

/**
 * @param {string} userID
 * @returns {string} id of gym that user is attending
 */

const getGymUserAttending = async (userID) => {
  const db = firebase.firestore();
  const userRef = db.collection("users").doc(userID);
  const userDoc = await userRef.get();

  return userDoc.get("attending") ? userDoc.get("attending").id : null;
};

/**
 * @param {firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>} gymDocument
 * @returns {GymCoordinate}
 */
const processGymDocument = (gymDocument) => {
  const gym = gymDocument.data();

  return {
    longlat: gym.longlat,
    title: gym.title,
    address: gym.address,
    id: gymDocument.id,
  };
};
/**
 * Get an array of gyms which includes whether the gym is favorited by the user.
 * DEPRECATED
 * @returns {Promise<GymCoordinate[]>}
 * @throws {Error} if something goes wrong
 */
const getAllGyms = async () => {
  console.log("Getting all gyms from firestore.");
  const db = firebase.firestore();
  const gymsRef = db.collection("gyms");

  try {
    const allGyms = await gymsRef.get();
    return allGyms.docs.map(processGymDocument);
  } catch (e) {
    throw new Error(
      "Something went wrong while attempting to retrieve all gyms: " + e.message
    );
  }
};

/**
 * Get an array of gyms which includes whether the gym is favorited by the user.
 *
 * @param {string} userID
 * @param {(gyms: GymCoordinate[]) => void} callback that takes the processed gyms and does something with it
 * @returns {() => void} unsubscribe function
 */
const subscribeAllGyms = (callback) => {
  console.log("Getting all gyms from firestore.");
  const db = firebase.firestore();
  const gymsRef = db.collection("gyms");

  // Subscribe to gyms, return the unsubscribe function
  return gymsRef.onSnapshot((allGyms) => {
    callback(allGyms.docs.map(processGymDocument));
  });
};

/**
 * Subscribe to the IDs of the gyms that the userId has favorited
 *
 * @param {string} userID
 * @param {(gymIDs: string[]) => void} callback that takes the list of favorited gymIDS and does something
 * @returns {() => void} unsubscribe function
 */
const subscribeFavorites = (userID, callback) => {
  const db = firebase.firestore();
  const userRef = db.collection("users").doc(userID);
  return userRef.onSnapshot((user) => {
    const favorites = user.get("favoriteGyms") || [];
    callback(favorites.map((f) => f.id));
  });
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

  // Will have to check if it crashes if a gym does not have the "users" field

  // arrayUnion and arrayRemove are done automically, so we don't have to use transactions.

  try {
    console.log(`${userID} is attending gym ${gymID}`);
    await userRef.update({
      attending: gymRef,
    });
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
      users: firebase.firestore.FieldValue.arrayRemove(userRef),
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
        return getUser(userRef.id);
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
  subscribeAllGyms,
  subscribeFavorites,
  getGymUserAttending,
  isGymFavorited,
  getGymByAddress,
  addFavoriteGym,
  removeFavoriteGym,
  attendGym,
  unattendGym,
  getUsersInGym,
  getUsersInGymSnapshot,
};
