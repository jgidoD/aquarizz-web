// import { React, useContext, useState, userEffect } from "react";
// import { auth } from "./Firebase"; //import the auth module
// const AuthContext = React.createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState();

//   function signup(email, password) {
//     return auth.createUserWithEmailAndPassword(email, password);
//   }

//   userEffect(() => {
//     const unsubscribe = auth.onStateChanged((user) => {
//       setCurrentUser(user);
//     });
//     return unsubscribe;
//   }, []);

//   const value = {
//     currentUser,
//     signup,
//   };
//   return <AuthProvider value={value}>{children}</AuthProvider>;
// }
