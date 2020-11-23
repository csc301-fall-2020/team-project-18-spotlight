import * as firebase from "firebase";
import "firebase/firestore";

/**
 * @typedef {Object} GymCoordinate
 * @property {number} longitude
 * @property {number} latitude
 * @property {string} title
 * @property {string} address
 * @property {boolean} isFavorite
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
 * @param {firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>} gymDocument
 * @param {string} userID
 * @returns {GymCoordinate}
 */
const processGymDocument = async (gymDocument, userID) => {
  const gymObj = gymDocument.data();
  const isFavorite = await isGymFavorited(gymDocument.id, userID);
  return {
    title: gymObj.title,
    address: gymObj.address,
    longitude: gymObj.longlat.longitude,
    latitude: gymObj.longlat.latitude,
    isFavorite,
  };
};
/**
 * Get an array of gyms which includes whether the gym is favorited by the user.
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

export { getAllGyms, isGymFavorited, getGymByAddress };
