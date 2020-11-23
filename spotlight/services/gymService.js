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

  const userFavoriteGyms = user.data().favoriteGyms;

  return userFavoriteGyms.map((ref) => ref.id).includes(gymID);
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
      allGyms.docs.map(async (gymDocument) => {
        const gymObj = gymDocument.data();
        const isFavorite = await isGymFavorited(gymDocument.id, userID);
        return {
          title: gymObj.title,
          address: gymObj.address,
          longitude: gymObj.longlat.longitude,
          latitude: gymObj.longlat.latitude,
          isFavorite,
        };
      })
    );
  } catch (e) {
    throw new Error(
      "Something went wrong while attempting to retrieve all gyms: " + e.message
    );
  }
};

export { getAllGyms, isGymFavorited };
