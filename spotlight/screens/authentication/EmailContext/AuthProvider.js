import React, { createContext, useState } from "react";
import firebase from "firebase";
import { emailLogin } from "../../../services/authService";

/**
 * This provider is created
 * to access user in whole app
 */

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        emailLogin,
        emailRegister: async (email, password) => {
          try {
            await firebase
              .auth()
              .createUserWithEmailAndPassword(email, password);
            // .then(() => {
            //     console.log('User account created & signed in!');
            // }).catch(error => {
            //     if (error.code === 'auth/email-already-in-use') {
            //     alert('That email address is already in use!');
            //     }

            //     if (error.code === 'auth/invalid-email') {
            //     alert('That email address is invalid!');
            //     }

            //     console.log(error);
            // });
          } catch (e) {
            alert(e);
          }
        },

        emailLogout: async () => {
          try {
            await firebase.auth().signOut();
          } catch (e) {
            console.error(e);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
