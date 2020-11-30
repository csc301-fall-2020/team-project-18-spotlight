import firebase from "firebase/app";
import "firebase/firestore";
import uuid from "uuid";

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

const updateUserInfo = async (userData, userID) => {
  const db = firebase.firestore();
  const userRef = db.collection("users").doc(userID);
  try {
    await userRef.update(userData);
  } catch (e) {
    console.log(e.message);
  }

/**
 * @param {string} userID
 */
const getUser = async (userID) => {
  const db = firebase.firestore();
  const userRef = db.collection("users").doc(userID);
  return await userRef.get();
};

const getAllUsers = () => {
  return [];
};

export { getAllUsers, createNewUser, uploadUserImage, updateUserInfo, getUser };
