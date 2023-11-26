import "./Dashboard.css";
import Logo from "../assets/logo2.png";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faSortDesc,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import PostForm from "./PostForm";
import DisplayPosts from "./DisplayPosts";
import PostsLists from "./PostsLists";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { UserAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import ProfileModal from "./ProfileModal";
import { getDoc, doc } from "firebase/firestore";
import UserProfile from "./userProfile/UserProfile";
export default function Dashboard() {
  const [show, setShow] = useState(false);
  const { logout, user, showPosts } = UserAuth();
  const navigate = useNavigate();
  // function handleSignOut() {
  //   signOut(auth).then(() => navigate(LANDINGPAGE));
  // }
  const data = [];

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="wrapper">
      <header className="headerDashboard">
        {/* logo */}
        <div className="headerSticky">
          <div className="headBar">
            <div className="logoContainer">
              <img className="logoDashboard" src={Logo} />
            </div>

            {/* searchbar */}
            <div className="searchBarContainer">
              <SearchBar />
            </div>

            {/* profile */}
            <div className="profileContainer">
              <h5>settings</h5>

              <button
                onClick={() => {
                  setShow(true);
                }}
              >
                profile
              </button>

              <ProfileModal onClose={() => setShow(false)} show={show} />
              <button onClick={handleLogout}>logout</button>
            </div>
          </div>

          {/* writepost */}
          <div className="navBarContainer">
            <div className="navBar">
              <div
                className="navBarIconContainer home"
                onClick={() => window.location.reload(false)}
              >
                <FontAwesomeIcon className="navBarIcon" icon={faHouse} />
              </div>
              <div className="navBarIconContainer market">
                <FontAwesomeIcon className="navBarIcon" icon={faStore} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mainContent">
        {/* postcard */}
        <div className="postCardContainer">
          <DisplayPosts />
        </div>
      </main>
    </div>
  );
}
