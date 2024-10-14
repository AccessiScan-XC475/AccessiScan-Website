"use client";
import CommunityPostPreview, {
  CommunityPostPreviewProps,
} from "@/components/community-post-preview";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

export default function CommunityPage() {
  const [postPreviewList, setpostPreviewList] = useState<
    CommunityPostPreviewProps[]
  >([]);

  useEffect(() => {
    fetch("/api/community-post")
      .then((res) => res.json())
      .then((posts) => setpostPreviewList(posts));
  }, []);

  return (
    <div>
      <h1 className="text-5xl font-bold">Community Board</h1>
      <div>
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
