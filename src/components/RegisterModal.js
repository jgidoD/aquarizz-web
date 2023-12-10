import "./RegisterModal.css";
import Button from "./Button.js";
import { useRef, useState, useEffect } from "react";
import { useAuth } from "../AuthContexts";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  validatePassword,
} from "firebase/auth";
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
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";

const RegisterModal = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [successReg, setSuccessReg] = useState(false);
  const [valid, setValid] = useState(true);

  const { createUser, createUserProfile } = UserAuth();
  const navigate = useNavigate();
  const { user } = UserAuth();
  const emailClear = useRef("");
  const nameClear = useRef("");
  const passwordClear = useRef("");
  const confirmPassClear = useRef("");
  const locationClear = useRef("");
  const phoneClear = useRef("");

  if (!props.show) {
    return null;
  }
  // const handlePhoneChange = (e) => {
  //   try {
  //     setPhone(e.target.value);
  //     setValid(validatePhoneNumber(e.target.value));
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };
  const sendVerification = async (e) => {
    e.preventDefault();
    await sendEmailVerification(auth.currentUser).then(() => {
      alert("Email verification sent!");
    });
  };
  // const validatePhoneNumber = (phoneNumber) => {
  //   const numberPattern = /^d{10}$/;
  //   return numberPattern.test(phoneNumber);
  // };
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    emailClear.current.value = "";
    nameClear.current.value = "";
    passwordClear.current.value = "";
    confirmPassClear.current.value = "";
    locationClear.current.value = "";

    try {
      setSuccessReg(true);

      const create = await createUser(email, password);
      const user = create.user;

      // handleCreateUserProfile(name, email, password, create.user.uid);
      setDoc(doc(db, "users1", create.user.uid), {
        email: email,
        name: name,
        password: password,
        location: location,
        phone: phone.toString(),
        userID: create.user.uid,
        dateCreated: Date.now(),
        createdAt: serverTimestamp(),
      });
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setLocation("");
      setPhone("");
      console.log("success");
      console.log(create.user.uid);
    } catch (err) {
      setError(err.message);
    }
    setSuccessReg(false);
  };

  return (
    <div className="overlayContainer" onClick={props.onClose}>
      <div className="overlayCard" onClick={(e) => e.stopPropagation()}>
        <header className="headerOverlay">
          {successReg && (
            <span
              className="regPrompt"
              style={{
                backgroundColor: "#5cb85c",
                color: "#fff",
                padding: "4px 8px",
                borderRadius: "4px",
              }}
            >
              Success Registered!
            </span>
          )}
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
                ref={nameClear}
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
                ref={emailClear}
              />
            </div>

            <div className="inputBoxes locationBox">
              <input
                placeholder="Enter Town/Province"
                className="locationFld"
                type="text"
                // ref={emailRegRef}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                ref={locationClear}
              />
            </div>

            <div className="inputBoxes numberBox">
              <label
                style={{
                  color: "#3b3b3b",
                  fontSize: "12px",
                }}
              >
                Enter phone number
              </label>
              <PhoneInput
                onChange={(phone) => setPhone("+" + phone)}
                value={phone}
                country="ph"
                inputProps={{
                  name: "phone",
                  required: true,
                  autoFocus: true,
                }}
              />
              {/* <input
                placeholder="Enter phone number (+63)"
                className="phoneFld"
                type="text"
                // ref={passRegRef}
                value={phone}
                onChange={handlePhoneChange}
                ref={phoneClear}
              /> */}
            </div>

            {phone.length !== 13 && (
              <p className="passwordMatching">Enter valid phone number</p>
            )}

            <div className="inputBoxes passwordBox">
              <input
                placeholder="Create a password"
                className="passwordRegFld"
                type="password"
                // ref={passRegRef}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ref={passwordClear}
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
                ref={confirmPassClear}
              />
              {password !== confirmPassword && (
                <p className="passwordMatching">Password does not Match</p>
              )}
            </div>
            <input
              type="submit"
              className="registerBtnForm"
              value="Register"
              // onClick={verify}
              disabled={
                !name ||
                !email ||
                !password ||
                !confirmPassword ||
                !location ||
                !phone ||
                password !== confirmPassword
              }
            />

            <input
              value="Close"
              type="button"
              className="close"
              onClick={props.onClose}
            />
          </form>
        </main>

        <footer className="footer"></footer>
      </div>
    </div>
  );
};
export default RegisterModal;
