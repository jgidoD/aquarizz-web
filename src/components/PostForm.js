import "./PostForm.css";

import React from "react";
import { useState, useRef, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { UserAuth } from "../context/AuthContext";
import { serverTimestamp, doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
const PostForm = (props) => {
  const [content, setContent] = useState("");
  const { user, createPost, showPosts } = UserAuth();
  const [userProfile, setUserProfile] = useState();

  const txt = useRef("");

  useEffect(() => {
    const getUserProfile = async () => {
      const data = [];

      try {
        if (!user) {
          // Handle the case when user is not defined
          console.log("can't get user");
          return;
        }
        const docRef = doc(db, "users1", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserProfile((userProfile) => {
            return { ...userProfile, ...docSnap.data() };
          });
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    getUserProfile();
  }, [user]);

  const handleChange = (e) => {
    setContent(e.target.value);
  };
  const handleSubmitPost = async (e) => {
    e.preventDefault();
    txt.current.value = "";

    const obj = {
      postContent: content,
      authorId: user?.uid,
      name: userProfile.name,
      // datePosted: Date.now(),
      datePosted: Date.now(),
      createdAt: serverTimestamp(),
    };
    try {
      await createPost(obj);
      setContent("");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="postFormContainer">
      <form className="postForm" onSubmit={handleSubmitPost}>
        <textarea
          className="inputArea"
          type="text"
          placeholder="Share something today!"
          name="postContent"
          rows={4}
          cols={40}
          onChange={handleChange}
          ref={txt}
        />
        <div className="postBtnWrapper">
          <input
            disabled={!content || content === " "}
            className="postBtn"
            type="submit"
            value="Post"
            onClick={props.doThis}
          />
        </div>
      </form>
    </div>
  );
};

export default PostForm;
