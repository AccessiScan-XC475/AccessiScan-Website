import CommunityPostFull from "@/components/community/community-post-full";
import { DOMAIN } from "@/domain";
import { redirect } from "next/navigation";

export default async function CommunityPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`${DOMAIN}/api/community-post?id=${id}`);

  if (res.status !== 200) {
    redirect("/community");
  }

  try {
    const fullPost = await res.json();
    return (
      <div>
        <CommunityPostFull post={fullPost} />
      </div>
    );
  } catch {
    redirect("/community");
  }
}
