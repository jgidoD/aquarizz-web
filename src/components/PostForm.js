import "./PostForm.css";

import React from "react";
import { useState, useRef, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { UserAuth } from "../context/AuthContext";
import { serverTimestamp, doc, getDoc } from "firebase/firestore";
import { db, storage } from "../firebaseConfig";
import { useStepContext } from "@chakra-ui/react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import Swal from "sweetalert2";

const PostForm = (props) => {
  const [content, setContent] = useState("");
  const { user, createPost, showPosts } = UserAuth();
  const [userProfile, setUserProfile] = useState();
  const [postTitle, setPostTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [imageURL, setImageURL] = useState(" ");
  const [uploadState, setUploadState] = useState("");
  const [progress, setProgress] = useState(0);

  const txt = useRef("");
  const clear = useRef("");
  const clearImgURL = useRef("");

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
    clearImgURL.current.value = "";

    const obj = {
      postTitle: postTitle,
      postContent: content,
      authorId: user?.uid,
      name: userProfile.name,
      // datePosted: Date.now(),
      datePosted: Date.now(),
      createdAt: serverTimestamp(),
      postImg: imageURL,
    };
    try {
      setIsLoading(true);
      await createPost(obj);
      setContent("");
      setPostTitle("");
      setImageURL(clearImgURL);
      setImageURL(" ");
    } catch (err) {
      console.log(err.message);
    }
    setIsLoading(false);
  };

  const handleOldImage = async () => {
    const previousImgURL = imageURL;

    const prevRef = ref(storage, previousImgURL);
    await deleteObject(prevRef)
      .then(() => {
        // File deleted successfully
        console.log("success");
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error.message);
      });
  };

  const handleImageChange = (e) => {
    try {
      const imageRef = ref(
        storage,
        `postImages/ ${e.target.files[0].name + "_" + userProfile.name} `
      );
      // console.log(e.target.files[0]);
      // setImageUpload(e.target.files[0]);
      // await uploadBytes(imageRef, e.target.files[0]).then((data) => {
      //   getDownloadURL(data.ref).then((value) => {
      //     console.log(value);
      //     setImageURL(value);
      //   });
      // });

      const uploadTask = uploadBytesResumable(imageRef, e.target.files[0]);

      uploadTask.on("state_changed", (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
        setProgress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            setUploadState("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            setUploadState("Uploading image...");
            Swal.fire({
              title: "Uploading Image...",
              icon: "info",
            });
            break;
        }

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          if (downloadURL === null) {
            console.log("error");
          }
          setImageURL(downloadURL);
        });
      });
      setUploadState("");
    } catch (err) {
      console.log(err.message);
    }
    setImageURL("");
  };

  return (
    <div className="postFormContainer">
      <span
        className="postAddedSpan"
        style={{
          zIndex: "2",
          position: "absolute",
          left: "50%",
          top: "60px",
          transform: "translateX(-50%)",
          backgroundColor: "#5cb85c",
          padding: "8px 18px",
          display: isLoading ? "block" : "none",
          color: "#fff",
        }}
      >
        Post Added
      </span>
      <form className="postForm" onSubmit={handleSubmitPost}>
        <input
          className="postTitleInput"
          placeholder="Post Title"
          onChange={(e) => setPostTitle(e.target.value)}
          ref={clear}
        />
        <textarea
          className="inputArea"
          type="text"
          placeholder="Share something today!"
          name="postContent"
          rows={4}
          cols={40}
          onChange={(e) => setContent(e.target.value)}
          ref={txt}
        />
        <div className="postBtnWrapper">
          <div className="imageBtnWrapper">
            <input
              type="file"
              onChange={(e) => handleImageChange(e)}
              ref={clearImgURL}
              onClick={() => {
                setImageURL((clearImgURL.current.value = ""));
              }}
            />
            {/* <input
              type="button"
              onClick={handleUploadImage}
              value="upload"
              ref={clearImgURL}
            /> */}
          </div>
          {/* {uploadState === "Uploading image..." && (
            <div>
              <p
                style={{
                  display: progress === 100 ? "none" : "block",
                  fontSize: "12px",
                  backgroundColor: "#5cb85c",
                  color: "#fff",
                  padding: "4px 8px",
                  position: "absolute",
                  right: "15%",
                  top: "25%",
                }}
              >
                {uploadState}
              </p>
            </div>
          )} */}
          <input
            disabled={!content || content === " "}
            className="postBtn"
            type="submit"
            value="Post"
            onClick={(e) => {
              props.doThis();
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default PostForm;
