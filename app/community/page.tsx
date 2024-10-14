"use client";
import CommunityPostPreview, {
  CommunityPostPreviewProps,
} from "@/components/community-post-preview";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import NewPost from "@/components/new-post";

export default function CommunityPage() {
  const [postPreviewList, setpostPreviewList] = useState<
    CommunityPostPreviewProps[]
  >([]);

  const createNewPost = async (
    title: string,
    content: string,
  ): Promise<boolean> => {
    const newPost = {
      author: "anonymous",
      title: title,
      content: content,
      upvotes: 0,
      downvotes: 0,
      numReplies: 0,
    };

    const res = await fetch("/api/community-post", {
      method: "POST",
      body: JSON.stringify(newPost),
    });

    if (res.status === 200) {
      setpostPreviewList([
        ...postPreviewList,
        {
          ...newPost,
          id: await res.text(),
        },
      ]);
      return true;
    }

    return false;
  };

  useEffect(() => {
    fetch("/api/community-post")
      .then((res) => res.json())
      .then((posts) => setpostPreviewList(posts));
  }, []);

  return (
    <div>
      <h1 className="text-5xl font-bold">Community Board</h1>
      <div>
        <NewPost submitFunc={createNewPost} />
        {postPreviewList.length !== 0 ? (
          postPreviewList.map((preview) => (
            <CommunityPostPreview postPreview={preview} key={preview.id} />
          ))
        ) : (
          <CircularProgress />
        )}
      </div>
    </div>
  );
}
