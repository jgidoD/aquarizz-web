import "./DisplayPosts.css";
import React, { useReducer } from "react";
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { UserAuth } from "../context/AuthContext";
import PostForm from "./PostForm";
import { formatDistanceToNow } from "date-fns";
import UserProfileButton from "./userProfile/UserProfileButton";
export default function DisplayPosts() {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const { user } = UserAuth();

  async function showPosts() {
    const colRef = collection(db, "posts");
    const querySnapshot = await getDocs(
      query(colRef, orderBy("createdAt", "desc"))
    );
    const q = query(colRef, orderBy("date", "desc"), limit(5));
    const data = [];

    // onSnapshot(colRef, (snapshot) => {
    //   snapshot.docs.forEach((doc) => {
    //     data.push({ ...doc.data(), id: doc.id });
    //   });
    // });

    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });

    return data;
  }
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (e) => {
    const userDataPosts = await showPosts();
    setPosts(userDataPosts);
  };
  return (
    <div className="contentWrapper">
      {/* {posts.map((post) => (
        <div key={post.id}>{post.postContent}</div>
      ))} */}

      <div className="addPostContainer">
        <PostForm doThis={fetchData} />
      </div>

      {loading ? (
        console.log("loading")
      ) : (
        <div className="postWrapper">
          {posts &&
            posts.map((post) => (
              <div className="post" key={post.id}>
                <div className="usernameWrapper">
                  {/* <button className="username">{post.name}</button> */}
                  {/* <h5>{post.authorId}</h5> */}
                  <UserProfileButton
                    userProfileID={post.authorId}
                    userProfileName={post.name}
                  />

                  <span className="timePosted">
                    {formatDistanceToNow(post.datePosted)}
                    {/* {post.datePosted.toDate().toString()} */}
                  </span>
                </div>
                <div className="postContentWrapper">{post.postContent}</div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
