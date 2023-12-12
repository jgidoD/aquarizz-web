import "./PostModalOptions.css";
import React, { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebaseConfig";
import { doc, deleteDoc, collection, getDocs } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleAd, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
const PostModalOptions = (props) => {
  const [show, setShow] = useState(false);
  const { user } = UserAuth();
  const userID = props.userID;
  const authorIdPost = props.authorIdPost;
  const postId = props.postId;
  const fetchData = props.doThis;

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      // const postRef = doc(db, "posts", postId);
      // //   const commentRef = collection(postRef, "comments");
      // await deleteDoc(postRef);
      // alert("Post deleted");
      await Swal.fire({
        title: "Do you want to delete post?",
        text: "All the contents of the post will be deleted.",
        icon: "info",
        showConfirmButton: true,
        showDenyButton: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const postRef = doc(db, "posts", postId);
          const commentRef = collection(postRef, "comments");
          await deleteDoc(postRef);
          Swal.fire({
            title: "Post deleted successfully!",
            icon: "success",
          });
        }
      });
      fetchData();
    } catch (err) {
      console.log(err.message);
    }

    // console.log(postId)
  };

  return (
    <div className="modalOptionsContainer">
      <div
        className="modalOptionsCard"
        style={{
          display: userID !== authorIdPost ? "none" : "block",
        }}
      >
        <div className="optionBtnContainer promotePost">
          <button disabled={userID !== authorIdPost}>
            <FontAwesomeIcon icon={faRectangleAd} />
            Promote
          </button>
        </div>
        <div className="optionBtnContainer deletePost">
          <button
            className="deleteBtn"
            onClick={handleDelete}
            disabled={userID !== authorIdPost}
          >
            <FontAwesomeIcon icon={faTrash} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default PostModalOptions;
