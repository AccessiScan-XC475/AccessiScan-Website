"use client";
import CommunityPostFull, {
  CommunityPostFullProps,
} from "@/components/community-post-full";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

export default function CommunityPostPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  const [fullPost, setFullPost] = useState<CommunityPostFullProps | null>(null);

  useEffect(() => {
    fetch(`/api/community-post?id=${id}`)
      .then((res) => res.json())
      .then((postData) => setFullPost(postData));
  }, []);

  return (
    <div>
      {fullPost ? <CommunityPostFull post={fullPost} /> : <CircularProgress />}
    </div>
  );
}
