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
  const [filterTag, setFilterTag] = useState<string>("");

  const availableTags = ["Color contrast", "Text size", "Labeled images", "Resources", "Profile", "Other"];

  const createNewPost = async (
    title: string,
    content: string,
    tag: string
  ): Promise<boolean> => {
    const newPost = {
      author: "anonymous",
      title,
      content,
      upvotes: 0,
      downvotes: 0,
      numReplies: 0,
      tag: tag || null,
    };

    const res = await fetch("/api/community-post", {
      method: "POST",
      body: JSON.stringify(newPost),
    });

    if (res.status === 200) {
      const createdPost = {
  ...newPost,
  id: await res.text(),
  tag: tag || undefined,  // Change null to undefined if tag is not present
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

  const filteredPosts = filterTag
    ? postPreviewList?.filter((post) => post.tag === filterTag) || []
    : postPreviewList || [];

  return (
    <div>
      <h1 className="text-5xl font-bold text-center mt-8 mb-8" style={{ color: '#54BD86' }}>Community Board</h1>
      <div>
        <NewPost submitFunc={createNewPost} />

        <div className="mb-4 flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setFilterTag("")}
            className={`px-4 py-2 rounded-xl ${
              filterTag === "" ? "text-white" : "bg-gray-200 text-gray-700"
            }`}
            style={filterTag === "" ? { backgroundColor: "#1B6AAA", color: "white" } : {}}
          >
            All Posts
          </button>
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilterTag(tag)}
              className={`px-4 py-2 rounded-xl ${
                filterTag === tag ? "text-white" : "bg-gray-200 text-gray-700"
              }`}
              style={filterTag === tag ? { backgroundColor: "#1B6AAA", color: "white" } : {}}
            >
              {tag}
            </button>
          ))}
        </div>

        {postPreviewList === null ? (
          <div className="flex justify-center mt-8">
            <CircularProgress />
          </div>
        ) : filteredPosts.length === 0 ? (
          <p>There are no posts. Be the first to say something!</p>
        ) : (
          filteredPosts.map((preview) => (
            <CommunityPostPreview postPreview={preview} key={preview.id} />
          ))
        )}
      </div>
    </div>
  );
}
