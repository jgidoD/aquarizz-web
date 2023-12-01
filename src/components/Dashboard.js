import "./Dashboard.css";
import Logo from "../assets/logo2.png";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faSortDesc,
  faStore,
  faUser,
  faSignOut
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
  const [isLoading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  // function handleSignOut() {
  //   signOut(auth).then(() => navigate(LANDINGPAGE));
  // }
  const data = [];

  const handleLogout = async () => {
    try {
     
      if(window.confirm("Do you wish to logout?")){
        await logout();
        navigate("/");
      }

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
  }, [user]);
  return (
    <div className="wrapper">
      <header className="headerDashboard">
        {/* logo */}
        <div className="headerSticky">
          <div className="headBar">
            <div className="logoContainer">
              <img className="logoDashboard" src={Logo} />
            </div>

            <div
            className="navBarIconContainer home"
            onClick={() => window.location.reload(false)}
          >
            <FontAwesomeIcon className="navBarIcon" icon={faHouse} />
          </div>
            {/* searchbar */}
            <div className="searchBarContainer">
            
              <SearchBar />
            </div>

            {/* profile */}

            {
              profile && 
            <div className="profileContainer">

              <button
                onClick={() => {
                  setShow(true);
                }} className=" user"
              >
              <FontAwesomeIcon className="profile"  icon={faUser} />
                <label>{profile.name}</label>
              </button>

              <ProfileModal onClose={() => setShow(false)} show={show} />
              <button className="logoutBtn" onClick={handleLogout}>       
              <FontAwesomeIcon className="profile"  icon={faSignOut} />
              </button>
            </div>
          }

          </div>

          {/* writepost */}

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
