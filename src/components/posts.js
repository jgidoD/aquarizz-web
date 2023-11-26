import { useState } from "react";
import { uuidv4 } from "@firebase/util";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
export function useAddPost() {
  const [isloading, setLoading] = useState(false);

  async function addPost(post) {
    setLoading(true);
    const id = uuidv4;
    await setDoc(doc(db, "posts", id), {
      ...post,
      id,
      date: Date.now(),
      likes: [],
    });
  }

  return { addPost, isloading };
}
