import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import { UserAuth } from "../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function UserProfile(props) {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const userProfileID = props.userProfileID;
  const [userProfile, setUserProfile] = useState(null);
  const { user } = UserAuth();

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
        const docRef = doc(db, "users1", userProfileID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserProfile((profile) => {
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

  if (!props.show) {
    return null;
  }

  return (
    <div className="overlayUserProfileModalContainer " onClick={props.onClose}>
      <div
        className="userProfileModalCard "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="headerUserProfileModalContainer">
          <p>
            <strong>UID:</strong> {userProfileID}
          </p>
        </div>
        <div className="userProfileContentsModal">
          {isLoading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {userProfile && (
            <div className="userProfileContents">
              {/* Display your data here */}
              <span className="userInformationTitle"></span>
              <h2 className="userInformation">{userProfile.name}</h2>
              <h4 className="userInformationTitle">Email:</h4>
              <p className="userInformation">{userProfile.email}</p>
              <h4 className="userInformationTitle">Location:</h4>
              <p className="userInformation">location here</p>
              <h4 className="userInformationTitle">Contact:</h4>
              <p className="userInformation">Contact me here</p>
            </div>
          )}
        </div>

        <div className="closeBtnContainer">
          <input
            type="button"
            value="Close"
            className="close"
            onClick={props.onClose}
          />
        </div>
      </div>
    </div>
  );
}
