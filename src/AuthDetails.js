import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from "./firebaseConfig";
import { Link } from "react-router-dom";

const AuthDetails = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      user ? setUserData(user) : setUserData(null);
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth).then(() => {
      console.log("Signed out successfully").catch((error) => {
        console.log(error);
      });
    });
  };

  return (
    <div>{userData ? console.log("Signed in") : console.log("Signed Out")}</div>
  );
};

export default AuthDetails;
