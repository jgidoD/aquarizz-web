import React, { useState } from "react";
import "./UserProfileButton.css";
import UserProfile from "./UserProfile";
export default function UserProfileButton(props) {
  const userProfileID = props.userProfileID;
  const userProfileName = props.userProfileName;
  const [show, setShow] = useState(false);
  const getProfile = () => {
    console.log(userProfileID);
  };
  return (
    <>
      <input
        className="userProfileBtn"
        type="button"
        value={userProfileName}
        onClick={() => {
          getProfile();
          setShow(true);
        }}
      />
      <UserProfile
        userProfileID={userProfileID}
        onClose={() => setShow(false)}
        show={show}
      />
    </>
  );
}
