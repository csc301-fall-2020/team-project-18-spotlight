import React, { createContext, useState } from "react";
import firebase from "firebase";
import {
  emailLogin,
  emailRegister,
  emailLogout,
} from "../../../services/authService";

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
        emailRegister,
        emailLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
