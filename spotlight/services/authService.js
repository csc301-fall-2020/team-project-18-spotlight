import firebase from "firebase";
import * as Google from "expo-google-app-auth";
import "firebase/firestore";
import {
  androidExpoClientId,
  iosExpoClientIdAuth,
  androidStandaloneAppClientId,
  iosStandaloneAppClientId,
} from "../config";

/**
 * @param {string} email
 * @param {string} password
 * @returns {void}
 * @throws {Error} With a message of what went wrong in the login process.
 */
const emailLogin = async (email, password) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (e) {
    console.error(e);
    switch (e.code) {
      case "auth/invalid-email":
        throw new Error("Invalid Email.");
      case "auth/user-not-found":
        throw new Error("User not found.");
      case "auth/wrong-password":
        throw new Error("Invalid password.");
    }
  }
};

const emailLogout = async () => {
  try {
    await firebase.auth().signOut();
  } catch (e) {
    // This should never happen.
    console.error(e);
  }
};

/**
 * @param {string} email
 * @param {string} password
 * @returns {void}
 * @throws {Error} With a message of what went wrong in the registration process.
 */
const emailRegister = async (email, password) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  } catch (e) {
    console.error(e);
    switch (e.code) {
      case "auth/email-already-in-use":
        throw new Error("Email already in use.");
      case "auth/invalid-email":
        throw new Error("Invalid email.");
      case "auth/weak-password":
        throw new Error("Please enter a stronger password.");
    }
  }
};

const googleLogin = async () => {
  try {
    const result = await Google.logInAsync({
      androidClientId: androidExpoClientId,
      iosClientId: iosExpoClientIdAuth,
      androidStandaloneAppClientId: androidStandaloneAppClientId,
      iosStandaloneAppClientId: iosStandaloneAppClientId,
      scopes: ["profile", "email"],
      behaviour: "web",
    });

    if (result.type === "success") {
      onSignIn(result);

      let email = "";
      if (result.user.email !== undefined) {
        email = result.user.email;
      }

      let isNewUser = false;
      if (await googleIsNew(email)) {
        isNewUser = true;
      }

      return {
        accessToken: result.accessToken,
        cancelled: false,
        firstName: result.user.givenName,
        lastName: result.user.familyName,
        email: email,
        isNewUser: isNewUser,
      };
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    console.log(e);
    return { error: true };
  }
};

const onSignIn = (googleUser) => {
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  let unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
    unsubscribe();

    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      let credential = firebase.auth.GoogleAuthProvider.credential(
        googleUser.idToken,
        googleUser.accessToken
      );
      // Sign in with credential from the Google user.
      firebase
        .auth()
        .signInWithCredential(credential)
        // TODO: ADD INFORMATION ABOUT THE USER INTO OUR OWN DATABASE (SAMUEL)
        // .then(function(result) {
        //   console.log('user signed in ');
        //   if (result.additionalUserInfo.isNewUser) {
        //     firebase
        //       .database()
        //       .ref('/users/' + result.user.uid)
        //       .set({
        //         gmail: result.user.email,
        //         profile_picture: result.additionalUserInfo.profile.picture,
        //         first_name: result.additionalUserInfo.profile.given_name,
        //         last_name: result.additionalUserInfo.profile.family_name,
        //         created_at: Date.now()
        //       })
        //   } else {
        //     firebase
        //       .database()
        //       .ref('/users/' + result.user.uid)
        //       .update({
        //         last_logged_in: Date.now()
        //       });
        //   }
        // })
        .catch((error) => {
          // Handle Errors here.
          let errorCode = error.code;
          let errorMessage = error.message;
          // The email of the user's account used.
          let email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          let credential = error.credential;
          // ...
          console.error("errorCode: " + errorCode);
          console.error("errorMessage: " + errorMessage);
          console.error("email: " + email);
          console.error("credential: " + credential);
        });
    } else {
      console.log("User already signed-in Firebase.");
    }
  });
};

const isUserEqual = (googleUser, firebaseUser) => {
  if (firebaseUser) {
    let providerData = firebaseUser.providerData;
    for (let i = 0; i < providerData.length; i++) {
      if (
        providerData[i].providerId ===
          firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
        providerData[i].uid === googleUser.getBasicProfile().getId()
      ) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
};

const googleIsNew = async (email) => {
  const db = firebase.firestore();
  const allUsers = db.collection("users");

  try {
    let query = null;
    query = allUsers.where("email", "==", email);
    const querySnapshot = await query.get();

    if (querySnapshot.empty) {
      console.log("NEW USER");
      return true;
    }
    console.log("OLD USER");
    return false;
  } catch {
    console.error("Something went wrong with the googleIsNew request.");
    return [];
  }
};

export { emailLogin, emailRegister, emailLogout, googleLogin };
