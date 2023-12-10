import React from "react";
import DisplayPosts from "./DisplayPosts";
export default function PostsLists({ posts }) {
  return (
    <div>
      {posts?.length === 0
        ? "no posts"
        : posts?.map((post) => <DisplayPosts key={post.id} post={post} />)}

    </div>
  );
}
