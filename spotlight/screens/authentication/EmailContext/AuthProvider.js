import React, { createContext, useState } from 'react';
import * as firebase from 'firebase';

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
        emailLogin: async (email, password) => {
          try{
            if(password.length < 6){
                alert("Please enter at least 6 characters");
                return;
            }

            await firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                alert('User signed in!');
            }).catch(error => {
                // if (error.code === 'auth/email-already-in-use') {
                //     alert('That email address is already in use!');
                // }

                // if (error.code === 'auth/invalid-email') {
                //     alert('That email address is invalid!');
                // }

                // if (error.code === 'auth/invalid-password') {
                //   alert('That email password is invalid!');
                // }
                alert(error);
            });
          } catch (e){
            console.error(e);
          }
        },

        emailRegister: async (email, password, confirmPassword) => {
          try{
            if(password.length < 6){
                alert("Please enter at least 6 characters");
                return;
            }
      
            if(password !== confirmPassword){
                alert("Password and Confirm Password is not the same!");
                return;
            }
      
            await firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User account created & signed in!');
            }).catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                alert('That email address is already in use!');
                }
      
                if (error.code === 'auth/invalid-email') {
                alert('That email address is invalid!');
                }
      
                console.log(error);
            });
          } catch (e){
            console.error(e);
          }
        },

        emailLogout: async () => {
          try {
            await firebase.auth()
            .signOut()
            .then(() => {
                alert('User signed out!')
            });
          } catch (e) {
            console.error(e);
          }
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
