import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import { useState } from "react";
import { DASHBOARD } from "../lib/routes";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useToast } from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom";

export function useAuth() {
  const [authUser, error, checker] = useAuthState(auth);
  return { user: authUser, error: error, checker: checker };
}

export function useLogin() {
  const [user, setUser] = useState(true);
  // const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function login({ email, password, redirectTo = DASHBOARD }) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // setUser(auth.user.uid);
      navigate(redirectTo);
    } catch (error) {
      return false;
    }

    return true;
  }

  return { login };
}
