import React, { createContext, useState } from "react";
import {
  emailLogin,
  emailRegister,
  emailLogout,
  googleLogin,
} from "../../../services/authService";

/**
 * This provider is created
 * to access user in whole app
 */

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isNewUser,
        setIsNewUser,
        emailLogin,
        emailRegister,
        emailLogout,
        googleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
