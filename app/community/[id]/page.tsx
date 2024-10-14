"use client";
import CommunityPostFull, {
  CommunityPostFullProps,
} from "@/components/community-post-full";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CommunityPostPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const id = params.id;

  const [fullPost, setFullPost] = useState<CommunityPostFullProps | null>(null);

  useEffect(() => {
    try {
      fetch(`/api/community-post?id=${id}`)
        .then((res) => res.json())
        .then((postData) => setFullPost(postData));
    } catch {
      // if invalid id, push to community board
      router.push("/community");
    }
  }, []);

  return (
    <div>
      {fullPost ? <CommunityPostFull post={fullPost} /> : <CircularProgress />}
    </div>
  );
}
