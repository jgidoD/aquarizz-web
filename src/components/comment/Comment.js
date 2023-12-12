import React, { useState, useEffect, useRef } from "react";
import "./Comment.css";
import { db } from "../../firebaseConfig";
import {
  serverTimestamp,
  doc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { UserAuth } from "../../context/AuthContext";
import { calcLength } from "framer-motion";
import { set } from "date-fns";
import UserProfileButton from "../userProfile/UserProfileButton";
import { formatDistanceToNow } from "date-fns";

export default function Comment(props) {
  const { user } = UserAuth();
  const postID = props.postID;
  const authorId = props.authorId;
  const [content, setContent] = useState("");
  const [comment, setComment] = useState("");
  const [userProfile, setUserProfile] = useState();
  const txt = useRef("");
  const handleChange = (e) => {
    setContent(e.target.value);
  };

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

  async function getComments() {
    const data = [];

    const postRef = doc(db, "posts", postID);
    const commentRef = collection(postRef, "comments");
    // const querySnapshot = await getDocs(commentRef)
    const querySnapshot = await getDocs(
      query(commentRef, orderBy("createdAt", "desc"), limit(5))
    );

    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });

    return data;
  }
  //getting the comments but suddenly becoming undefined
  useEffect(() => {
    fetchComments();

    // console.log(comment)
  }, [user]);

  const fetchComments = async () => {
    const comments = await getComments();
    setComment(comments);
  };
  const notify = async () => {
    const postRef = doc(db, "posts", postID);

    const subcollectionNotifRef = collection(postRef, "postNotification");
    await addDoc(subcollectionNotifRef, {
      recipientUserID: authorId,
      content: content,
      authorId: user?.uid,
      datePosted: Date.now(),
      createdAt: serverTimestamp(),
    });

    console.log(`you commented on ${authorId}'s post `);
  };
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    txt.current.value = "";

    // const obj = {
    //   postContent: content,
    //   authorId: user?.uid,
    //   name: userProfile.name,
    //   // datePosted: Date.now(),
    //   datePosted: Date.now(),
    //   createdAt: serverTimestamp(),
    // };
    try {
      const postRef = doc(db, "posts", postID);
      const commentRef = collection(postRef, "comments");
      await addDoc(commentRef, {
        content: content,
        authorID: user?.uid,
        name: userProfile.name,
        datePosted: Date.now(),
        createdAt: serverTimestamp(),
        recipientUserID: authorId,
      });

      setContent("");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="commentFormContainer">
      <div>
        {comment &&
          comment.map((doc) => (
            <div className="commentContainer" key={doc.id}>
              <div className="usernameContainer">
                <UserProfileButton
                  userProfileID={doc.authorID}
                  userProfileName={doc.name}
                />
                <span className="timePosted">
                  {formatDistanceToNow(doc.datePosted)}
                </span>
              </div>

              <p className="commentContent">{doc.content}</p>
            </div>
          ))}
      </div>
      <form onSubmit={handleSubmitComment} className="commentForm">
        <textarea
          className="commentInput"
          type="text"
          name="commentContent"
          rows={2}
          cols={50}
          onChange={handleChange}
          ref={txt}
        />

        <div className="postCommentBtn">
          <input
            className="postContentBtn"
            type="submit"
            value="Comment"
            onClick={() => {
              fetchComments();
              notify();
            }}
            disabled={!content || content === " " || content === "  "}
          />
        </div>
      </form>
    </div>
  );
}
