"use client";
import CommunityPostPreview, {
  CommunityPostPreviewProps,
} from "@/components/community/community-post-preview";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import NewPost from "@/components/community/new-post";

export default function CommunityPage() {
  const [postPreviewList, setPostPreviewList] = useState<
    CommunityPostPreviewProps[] | null
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
      const createdPost = {
        ...newPost,
        id: await res.text(),
      };
      if (postPreviewList === null) {
        setPostPreviewList([createdPost]);
      } else {
        setPostPreviewList([createdPost, ...postPreviewList]);
      }
      return true;
    }

    return false;
  };

  useEffect(() => {
    try {
      fetch("/api/community-post")
        .then((res) => res.json())
        .then((posts) => setPostPreviewList(posts));
    } catch {
      setPostPreviewList(null);
    }
  }, []);

  return (
    <div>
      <h1 className="text-5xl font-bold text-center mt-8 mb-8" style={{ color: '#54BD86' }}>Community Board</h1>
      <div>
        <NewPost submitFunc={createNewPost} />
        {postPreviewList === null ? (
          <p>There are no posts. Be the first to say something!</p>
        ) : postPreviewList.length !== 0 ? (
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
