import { createContext, useState } from "react";
import React from "react";

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
