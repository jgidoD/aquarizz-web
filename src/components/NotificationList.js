import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { doc, collection, getDocs } from "firebase/firestore";

const NotificationModal = (props) => {
  if (!props.showNotif) {
    return null;
  }
  return (
    <div className="notifWrapper" style={{ position: "relative" }}>
      <div
        className="notifCard"
        style={{
          position: "absolute",
          backgroundColor: "#fff",
          top: "0",
          left: "0",
          border: "1px solid #3b3b3b",
        }}
      >
        hatdog
      </div>
    </div>
  );
};
const NotificationList = () => {
  const [showNotif, setShowNotif] = useState(false);
  const { user } = UserAuth();
  const [notification, setNotification] = useState();

  const handleToggle = () => {
    setShowNotif(!showNotif);
  };

  return (
    <>
      <input type="button" value="Notification" onClick={handleToggle} />
      <NotificationModal showNotif={showNotif} />
    </>
  );
};
export default NotificationList;
