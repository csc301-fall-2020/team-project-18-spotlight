import firebase from "firebase/app";
import "firebase/firestore";
import uuid from "uuid";

const db = firebase.firestore();

const createNewUser = async (userID) => {
  console.log("Trying to add user", userID);
  const data = { userID: userID };
  try {
    const userRef = db.collection("users").doc(userID);
    userRef.get().then((doc) => {
      if (!doc.exists) {
        userRef.set(data);
      }
    });
  } catch (e) {
    console.log("createNewUser:", e.message);
  }
};

const uploadUserImage = async (uri) => {
  // Snippet was taken from https://github.com/expo/examples/blob/master/with-firebase-storage-upload/App.js

  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const ref = firebase.storage().ref().child(uuid.v4());
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
};

const createUserInfo = async (userData, userID) => {
  const userRef = db.collection("users").doc(userID);
  try {
    await userRef.set(userData);
  } catch (e) {
    console.log("updateUserInfo: ", e.message);
  }
};

const updateUserInfo = async (userData, userID) => {
  const userRef = db.collection("users").doc(userID);
  try {
    await userRef.update(userData);
  } catch (e) {
    console.log("updateUserInfo: ", e.message);
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
    bio: user.bio,
  };
};

/**
 * @param {string} userID
 * @returns {User}
 */
const getUser = async (userID) => {
  const userRef = db.collection("users").doc(userID);
  const userDoc = await userRef.get();
  return processUserDoc(userDoc);
};

/**
 * @param {string} query
 * @returns {Promise<User[]>} array of users whose names partially match the query
 */
const queryUserByName = async (query) => {
  const allUsers = await db.collection("users").get();

  const processedUsers = allUsers.docs.map((userDoc) =>
    processUserDoc(userDoc)
  );

  return processedUsers.filter((user) => {
    const { firstName, lastName } = user;
    const fullName = `${firstName} ${lastName}`;
    return fullName.includes(query);
  });
};

/**
 * @returns {Promise<User[]>}
 */
const getAllUsers = async () => {
  const db = firebase.firestore();
  const allUsers = await db.collection("users").get();

  return allUsers.docs.map((userDoc) => processUserDoc(userDoc));
};

export {
  getAllUsers,
  createNewUser,
  uploadUserImage,
  createUserInfo,
  getUser,
  updateUserInfo,
  queryUserByName,
};
