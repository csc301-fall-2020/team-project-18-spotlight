import firebase from "firebase";

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
    console.log(e);
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
    await firebase.auth.signOut();
  } catch (e) {
    // This should never happen.
    console.log(e);
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
    console.log(e);
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

export { emailLogin, emailRegister, emailLogout };
