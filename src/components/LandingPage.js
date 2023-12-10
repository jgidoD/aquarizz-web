import "./LandingPage.css";
import Logo from "../assets/logo.svg";
import Button from "./Button.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUser,
  faLock,
  faXmark,
  faContactCard,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
// import { Routes, Route, Link, Outlet } from "react-router-dom";
import RegisterModal from "./RegisterModal";
import { useEffect, useRef, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
// import AuthDetails from "../AuthDetails";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useStepContext } from "@chakra-ui/react";
import { UserAuth } from "../context/AuthContext.js";
import ForgotPasswordModal from "./ForgotPasswordModal.js";
// import { useLogin } from "./ProtectRoutes/protectRoutes.js";
export default function LandingPage() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { signIn, user } = UserAuth();
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  // const [activeUser, setActiveUser] = useState(true);
  // const [initializing, setInitializing] = useState();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // const { login } = useLogin();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      await signIn(email, password);

      navigate("/dashboard");
    } catch (err) {
      console.log(err.message);
      setError(true);
    }
    setLoading(false);
  };
  return (
    <div className="container">
      <header className="header">
        <span>
          <img src={Logo} alt="aquarizz-logo" />
        </span>
        <div className="contactUsBtnContainer">
          {/* <input className="contactUsBtn" type="button" value="Contact us" />
          <FontAwesomeIcon className="contactUsIcon" icon={faEnvelope} /> */}
          <FontAwesomeIcon icon={faContactCard} className="contactLogo" />

          <button className="contactBtn">Contact us</button>
        </div>
      </header>
      <main className="hero">
        <div className="heroText">
          <span className="heroHeader">
            <span>
              <h2>Connecting</h2>
              <p className="italic">for the Love of Healthy Fish</p>
            </span>
          </span>
          <span className="heroFooter">
            A Social media community to connect and sell your items.
          </span>
          <br />
          <br />
          <button className="signUpBtn" onClick={() => setShow(true)}>
            Join Now!
            <FontAwesomeIcon icon={faArrowRight} className="arrowIcon" />
          </button>
          <RegisterModal onClose={() => setShow(false)} show={show} />
        </div>
        <div className="heroForm">
          <div className="card">
            {error && (
              <span
                style={{
                  color: "#d9534f",
                  margin: "0 0 12px 0",
                  fontWeight: "600",
                  position: "absolute",
                  top: "60px",
                }}
              >
                <FontAwesomeIcon
                  className="errorMark"
                  icon={faXmark}
                  style={{
                    margin: "0 8px 0 0",
                  }}
                />
                Invalid User!
              </span>
            )}
            <h1>Login</h1>
            <form onSubmit={handleSignIn}>
              <div className="inputBoxes usernameBox">
                <input
                  className="usernameFld"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  // {...register("email", emailValidate)}
                />
                <FontAwesomeIcon className="icon" icon={faUser} />
              </div>
              <div className="inputBoxes passwordBox">
                <input
                  className="passwordFld"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // {...register("password", passwordValidate)}
                />
                <FontAwesomeIcon className="icon" icon={faLock} />
              </div>

              <input
                type="submit"
                className="loginBtn"
                value={loading ? "Logging in..." : "Login"}
              />
            </form>
            <button
              className="forgotPasswordBtn"
              onClick={() => setShowForgotPassword(true)}
            >
              Forgot Password
            </button>
            <ForgotPasswordModal
              onClose={() => setShowForgotPassword(false)}
              show={showForgotPassword}
            />
          </div>
        </div>
      </main>
      <footer className="footer"></footer>
    </div>
  );
}
