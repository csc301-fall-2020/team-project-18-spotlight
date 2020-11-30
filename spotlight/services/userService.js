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
 * @typedef {Object} User
 * @property {string} address
 * @property {number} age
 * @property {string} city
 * @property {string} country
 * @property {string} dateOfBirth
 * @property {string} email
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} gender
 * @property {string} phoneNumber
 * @property {string} profilePicture
 * @property {string} province
 * @property {string} userID
 * @property {string} username
 * @property {string} zip
 */

/**
 * @param {firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>} userDoc
 * @returns {User}
 */
const processUserDoc = (userDoc) => {
  const user = userDoc.data();
  return {
    address: user.address,
    age: user.age,
    city: user.city,
    country: user.country,
    dateOfBirth: user.dateOfBirth,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    gender: user.gender,
    phoneNumber: user.phoneNumber,
    profilePicture: user.profilePicture,
    province: user.province,
    userID: user.userID,
    username: user.username,
    zip: user.zip,
  };
};

/**
 * @param {string} userID
 * @returns {User}
 */
const getUser = async (userID) => {
  const db = firebase.firestore();
  const userRef = db.collection("users").doc(userID);
  const userDoc = await userRef.get();
  return processUserDoc(userDoc);
};

/**
 * @returns {User[]}
 */
const getAllUsers = async () => {
  const db = firebase.firestore();
  const allUsers = await db.collection("users").get();

  return allUsers.docs.map((userDoc) => processUserDoc(userDoc));
};

export { getAllUsers, createNewUser, getUser };
