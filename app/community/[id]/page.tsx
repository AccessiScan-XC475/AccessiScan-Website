"use client";
import { useRouter } from "next/navigation";
import { use, useState, useEffect } from "react";
import CommunityPostFull, {
  CommunityPostFullProps,
} from "@/components/community/community-post-full";
import { CircularProgress } from "@mui/material";

export default function CommunityPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const [post, setPost] = useState<CommunityPostFullProps | null>(null);

  useEffect(() => {
    async function getPostById() {
      const res = await fetch(`/api/community-post?id=${id}`);
      if (res.status !== 200) {
        router.push("/community");
      }
      setPost(await res.json());
    }
    try {
      getPostById();
    } catch (e) {
      console.error(e);
      router.push("/community");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return post === null ? (
    <CircularProgress />
  ) : (
    <CommunityPostFull inputPost={post} />
  );
}
