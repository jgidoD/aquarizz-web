import React, { useEffect, useRef, useState } from "react";
import "./Contact.css";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { sub } from "date-fns";
const Contact = (props) => {
  const form = useRef();
  const [email, setEmail] = useState();
  const [subject, setSubject] = useState();
  const [name, setName] = useState();
  const [message, setMessage] = useState();
  const [isActive, setIsActive] = useState(false);
  const clear = useRef();
  useEffect(() => {}, []);

  const sendEmail = (e) => {
    clear.current.value = "";
    e.preventDefault();

    emailjs
      .sendForm(
        "service_zbm3m2j",
        "template_s82d8as",
        form.current,
        "NPe_0DyLrlq0ymvL9"
      )
      .then(
        (result) => {
          console.log(result.text);
          Swal.fire({
            icon: "success",
            title: "Email sent successfully!",
            text: "Your email has been sent. Please wait for the customer service to contact you.",
          });
        },
        (error) => {
          console.log(error.text);
        }
      );

    e.target.reset();
  };

  const handleResize = () => {
    if (window.innerWidth <= 380) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);
  if (!props.show) {
    return null;
  }
  return (
    <div className="contactWrapper" onClick={props.onClose}>
      <div className="contactCard" onClick={(e) => e.stopPropagation()}>
        <form className="customerServiceForm" ref={form} onSubmit={sendEmail}>
          <div className="emailbox">
            <label>Email:</label>
            <input
              type="email"
              name="user_email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              ref={clear}
            />
          </div>
          <div className="Subject">
            <label>Subject:</label>

            <input
              type="text"
              name="subject"
              onChange={(e) => {
                setSubject(e.target.value);
              }}
              ref={clear}
            />
          </div>
          <div className="namebox">
            <label>Name:</label>
            <input
              type="text"
              name="user_name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              ref={clear}
            />
          </div>
          <div className="messagebox">
            <label>Message:</label>
            <textarea
              name="message"
              className="emailMsg"
              type="text"
              cols={window.innerWidth <= 380 ? "40" : "66"}
              rows={6}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </div>
          <input
            className="sendEmailBtn"
            type="submit"
            value="Send Email"
            disabled={!email || !subject || !name || !message}
          />
        </form>
        <input
          type="button"
          value="Close"
          className="close"
          onClick={props.onClose}
        />
      </div>
    </div>
  );
};

export default Contact;
