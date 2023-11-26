import React, { useEffect, useState } from "react";
import "./ProfileModal.css";
import { UserAuth } from "../context/AuthContext";
import { auth, db } from "../firebaseConfig";
import { getDoc, doc, collection } from "firebase/firestore";
import { get } from "react-hook-form";

export default function ProfileModal(props) {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

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

  // const fetchData = async (e) => {
  //   const userData = await getProfile();
  //   setProfile(userData);
  // };

  if (!props.show) {
    return null;
  }
  return (
    <div className="overlayProfileModalContainer " onClick={props.onClose}>
      <div className="profileModalCard " onClick={(e) => e.stopPropagation()}>
        <div className="headerModalContainer">
          <p>
            <strong>UID:</strong> {user.uid}
          </p>
        </div>
        <div className="profileContentsModal">
          {isLoading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {profile && (
            <div className="profileContents">
              {/* Display your data here */}
              <span className="informationTitle">Name:</span>
              <p className="profileInformation"> {profile.name}</p>

              <span className="informationTitle">Email:</span>
              <p className="profileInformation"> {profile.email}</p>

              <span className="informationTitle">Location:</span>
              <p className="profileInformation">location here</p>

              <span className="informationTitle">Contact:</span>
              <p className="profileInformation">Contact me here</p>
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
