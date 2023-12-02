import "./PostForm.css";

import React from "react";
import { useState, useRef, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { UserAuth } from "../context/AuthContext";
import { serverTimestamp, doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useStepContext } from "@chakra-ui/react";
const PostForm = (props) => {
  const [content, setContent] = useState("");
  const { user, createPost, showPosts } = UserAuth();
  const [userProfile, setUserProfile] = useState();
  const [postTitle, setPostTitle] = useState("")

  const txt = useRef("");
  const clear = useRef("")


  //check and get the current user profile
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


  const handleSubmitPost = async (e) => {
    e.preventDefault();
    txt.current.value = "";
    clear.current.value = "";


    const obj = {
      postTitle: postTitle,
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
      setPostTitle("")
      alert("Post Added!")
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="postFormContainer">
      <form className="postForm" onSubmit={handleSubmitPost}>
        <input 
        className="postTitleInput"
        placeholder="Post Title"
        onChange={(e)=>setPostTitle(e.target.value)}
        ref={clear} 

        />
        <textarea
          className="inputArea"
          type="text"
          placeholder="Share something today!"
          name="postContent"
          rows={4}
          cols={40}
          onChange={(e)=>setContent(e.target.value)}
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
