import "./RegisterModal.css";
import Button from "./Button.js";
import { useRef, useState } from "react";
import { useAuth } from "../AuthContexts";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { UserAuth } from "../context/AuthContext.js";
import { useNavigate } from "react-router-dom";
import {
  serverTimestamp,
  setDoc,
  doc,
  collection,
  addDoc,
} from "firebase/firestore";

const RegisterModal = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { createUser, createUserProfile } = UserAuth();
  const navigate = useNavigate();
  const { user } = UserAuth();

  // const nameRegRef = useRef();
  // const emailRegRef = useRef(null);
  // const passRegRef = useRef();
  // const confirmPassRegRef = useRef();
  // const { signup } = useAuth();

  //modal controller
  if (!props.show) {
    return null;
  }

  // function handleSubmit(e) {
  //   e.preventDefault();

  //   signup(emailRegRef.current.value, passRegRef.current.value);
  //   console.log(emailRegRef.current.value);
  // }

  // const handleCreateUserProfile = async (e) => {
  //   e.preventDefault();
  //   const obj = {
  //     email: email,
  //     name: name,
  //     password: password,
  //     userID: user?.uid,
  //     dateCreated: Date.now(),
  //     createdAt: serverTimestamp(),
  //   };
  //   try {
  //     await createUserProfile(obj);
  //     console.log(obj);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  async function handleCreateUserProfile(name, email, password, uid) {
    const uiduser = uid;
    const obj = {
      email: email,
      name: name,
      password: password,
      userID: uid,
      dateCreated: Date.now(),
      createdAt: serverTimestamp(),
    };
    try {
      setDoc(doc(db, "users1", uiduser), {
        email: email,
        name: name,
        password: password,
        userID: user.uid,
        dateCreated: Date.now(),
        createdAt: serverTimestamp(),
      });
      // addDoc(collection(db, "users"), {
      //   email: email,
      //   name: name,
      //   password: password,
      //   userID: user?.uid,
      //   dateCreated: Date.now(),
      //   createdAt: serverTimestamp(),
      // });
    } catch (err) {
      console.log(err.message);
    }
  }

  // const handleSituation = async (e) => {
  //   e.preventDefault();
  //   setError("");

  //   try {
  //     await handleSignUp();
  //     await handleCreateUserProfile();
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const create = await createUser(name, email, password);
      navigate("/dashboard");

      // handleCreateUserProfile(name, email, password, create.user.uid);
      setDoc(doc(db, "users1", create.user.uid), {
        email: email,
        name: name,
        password: password,
        userID: create.user.uid,
        dateCreated: Date.now(),
        createdAt: serverTimestamp(),
      });
      console.log("success");
      console.log(create.user.uid);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="overlayContainer" onClick={props.onClose}>
      <div className="overlayCard" onClick={(e) => e.stopPropagation()}>
        <header className="headerOverlay">
          <h1>Register</h1>
        </header>

        <main className="contents">
          <form className="registerForm" onSubmit={handleSignUp}>
            <div className="inputBoxes fullNameBox">
              <input
                placeholder="Enter your name"
                className="fullNameFld"
                // ref={nameRegRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="inputBoxes emailBox">
              <input
                placeholder="Enter your email"
                className="emailFld"
                type="email"
                // ref={emailRegRef}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="inputBoxes passwordBox">
              <input
                placeholder="Create a password"
                className="passwordRegFld"
                type="password"
                // ref={passRegRef}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="inputBoxes confirmPassBox">
              <input
                placeholder="Confirm a password"
                className="confirmPassFld"
                type="password"
                // ref={confirmPassRegRef}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <input
              type="submit"
              className="registerBtnForm"
              onClick={handleSignUp}
              value="Register"
            />
            <input value="Close" className="close" onClick={props.onClose} />
          </form>
        </main>

        <footer className="footer"></footer>
      </div>
    </div>
  );
};
export default RegisterModal;
