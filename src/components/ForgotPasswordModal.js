import React, { useState } from "react";
import "./ForgotPasswordModal.css";
import { UserAuth } from "../context/AuthContext";
import { auth } from "../firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import Swal from "sweetalert2";
const ForgotPasswordModal = (props) => {
  const [emailForgot, setEmaiForgot] = useState("");

  const forgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, emailForgot);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Password reset email sent!",
      });
    } catch (error) {
      console.error(error);
      alert("Error sending password reset email!");
    }
    console.log(emailForgot);
  };

  if (!props.show) {
    return null;
  }
  return (
    <div className="forgotPasswordContainer">
      <div className="forgotPasswordCard">
        <form onSubmit={forgotPasswordSubmit}>
          <label>
            <strong>Enter Email</strong>{" "}
          </label>
          <input
            className="emailForgot"
            type="email"
            onChange={(e) => {
              setEmaiForgot(e.target.value);
            }}
          />
          <input
            style={{
              backgroundColor: "#ffc947",
              border: "none",
              cursor: "pointer",
              padding: "5px 10px",
            }}
            type="submit"
            value="Reset Password"
          />
        </form>

        <div>
          <input
            className="closeForgot"
            type="button"
            value="Close"
            onClick={props.onClose}
          />
        </div>
      </div>
    </div>
  );
};
export default ForgotPasswordModal;
