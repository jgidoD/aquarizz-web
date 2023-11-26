import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate, Navigate, Outlet } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import ProtectedRoutes from "./ProtectedRoutes";

export function useLogin() {
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  async function login(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(() => {
        setIsValid(true);
        <Navigate to={<ProtectedRoutes isValid={isValid} />} />;
        console.log("success");
      });
    } catch (error) {}
  }

  return { login };
}
