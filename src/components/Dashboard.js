import "./Dashboard.css";
import Logo from "../assets/logo2.png";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faSortDesc,
  faStore,
  faUser,
  faSignOut,
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
import NotificationList from "./NotificationList";
import Swal from "sweetalert2";
export default function Dashboard() {
  const [show, setShow] = useState(false);
  const { logout, user, showPosts } = UserAuth();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  // function handleSignOut() {
  //   signOut(auth).then(() => navigate(LANDINGPAGE));
  // }

  function gotoDashboard() {
    if (user) {
      navigate("/dashboard");
    }
  }
  const data = [];

  const handleLogout = async () => {
    try {
      await Swal.fire({
        title: "Are you sure you want to logout?",
        icon: "info",
        showConfirmButton: true,
        showDenyButton: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await logout();
          navigate("/");
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const getProfile = async () => {
      const data = [];

      try {
        setLoading(true);
        if (!user) {
          // Handle the case when user is not defined
          console.log("can't get user");
          return;
        }
        const docRef = doc(db, "users1", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfile((profile) => {
            return { ...profile, ...docSnap.data() };
          });
        }
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    getProfile();
    gotoDashboard();
  }, [user]);

  return (
    <div className="wrapper">
      <header
        className="headerDashboard"
        style={{ display: isLoading ? "none" : "block" }}
      >
        {/* logo */}
        <div className="headerSticky">
          <div className="headBar">
            <div
              className="navBarIconContainer home"
              onClick={() => window.location.reload(false)}
            >
              <FontAwesomeIcon className="navBarIcon" icon={faHouse} />
            </div>
            {/* searchbar */}
            {/* <div className="searchBarContainer">
              <SearchBar />
            </div> */}

            {/* profile */}
            {/* <NotificationList /> */}

            {profile && (
              <div className="profileContainer">
                <button
                  onClick={() => {
                    setShow(true);
                  }}
                  className=" user"
                >
                  <FontAwesomeIcon className="profile" icon={faUser} />
                  <label>{profile.name}</label>
                </button>

                <ProfileModal onClose={() => setShow(false)} show={show} />
                <button className="logoutBtn" onClick={handleLogout}>
                  <FontAwesomeIcon className="profile" icon={faSignOut} />
                </button>
              </div>
            )}
          </div>

          {/* writepost */}
        </div>
      </header>

      <main
        className="mainContent"
        style={{ height: isLoading ? "100vh" : "", margin: 0 }}
      >
        {/* postcard */}
        {isLoading && <span className="loader"></span>}

        <div
          className="postCardContainer"
          style={{ display: isLoading ? "none" : "block" }}
        >
          <DisplayPosts />
        </div>
      </main>
    </div>
  );
}
