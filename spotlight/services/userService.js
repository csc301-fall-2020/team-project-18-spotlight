import firebase from "firebase/app";
import "firebase/firestore";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

/**
DEPRECATED, DO NOT USE 
 */
const createNewUser = async (userID) => {
  console.log("Trying to add user", userID);
  const data = { userID: userID };
  try {
    const db = firebase.firestore();
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
  const ref = firebase.storage().ref().child(uuidv4());
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
};

const createUserInfo = async (userData, userID) => {
  const db = firebase.firestore();
  const userRef = db.collection("users").doc(userID);
  try {
    await userRef.set(userData);
  } catch (e) {
    console.log("updateUserInfo: ", e.message);
  }
};

const updateUserInfo = async (userData, userID) => {
  const db = firebase.firestore();
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
 * @property {string} attending
 * @property {string} nickname
 */

/**
 * @param {firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>} userDoc
 * @returns {User}
 */
const processUserDoc = (userDoc) => {
  const user = userDoc.data();
  return {
    userID: userDoc.id,
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
    username: user.username,
    zip: user.zip,
    bio: user.bio,
    attending: user.attending,
    nickname: user.nickname,
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
 * @param {string} query
 * @returns {Promise<User[]>} array of users whose names partially match the query
 */
const queryUserByName = async (query) => {
  const db = firebase.firestore();
  const allUsers = await db.collection("users").get();

  const processedUsers = allUsers.docs.map((userDoc) =>
    processUserDoc(userDoc)
  );

  return processedUsers.filter((user) => {
    try {
      const { firstName, lastName, nickname } = user;
      const fullName = `${firstName.toLowerCase()} ${lastName.toLowerCase()}`;
      return (
        fullName.includes(query.toLowerCase()) ||
        nickname.includes(query.toLowerCase())
      );
    } catch (e) {
      return false;
    }
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

const subscribeUserInfo = (userID, onSnapshot) => {
  const db = firebase.firestore();
  const userRef = db.collection("users").doc(userID);
  const unsubscribe = userRef.onSnapshot((userDoc) => {
    onSnapshot(processUserDoc(userDoc));
  });
  return unsubscribe;
};

export {
  getAllUsers,
  createNewUser,
  uploadUserImage,
  createUserInfo,
  getUser,
  updateUserInfo,
  queryUserByName,
  subscribeUserInfo,
};
