"use client";
import { useState } from "react";
import CommunityPostReply, {
  CommunityPostReplyProps,
} from "./community-post-reply";
import NewReply from "./new-reply";
import UpvotesDownvotesDisplay from "./upvotes-downvotes-display";

export type CommunityPostFullProps = {
  id: string;
  author: string;
  title: string;
  content: string;
  upvotes: number;
  downvotes: number;
  replies: CommunityPostReplyProps[];
};

export default function CommunityPostFull({
  post,
}: {
  post: CommunityPostFullProps;
}) {
  const [replies, setReplies] = useState(post.replies);

  const createNewReply = async (content: string): Promise<boolean> => {
    const newPost = {
      parentId: post.id,
      author: "anonymous replier",
      content: content,
      upvotes: 0,
      downvotes: 0,
    };

    const res = await fetch(`/api/community-post?parentId=${post.id}`, {
      method: "POST",
      body: JSON.stringify(newPost),
    });

    if (res.status === 200) {
      setReplies([
        ...replies,
        {
          ...newPost,
          id: await res.text(),
        },
      ]);
      return true;
    }

    return false;
  };

  return (
    <div className="bg-emerald-300 p-6 m-2 w-[60vw]">
      <div>
        <h3 className="text-3xl font-semibold">{post.title}</h3>
        <p>{post.content}</p>
      </div>
      <UpvotesDownvotesDisplay
        upvotes={post.upvotes}
        downvotes={post.downvotes}
      />
      <div className="bg-blue-200 p-2 m-1">
        <h4 className="text-xl font-medium">Replies</h4>
        <NewReply submitFunc={createNewReply} />
        {replies.map((reply, i) => (
          <CommunityPostReply postReply={reply} key={i} />
        ))}
      </div>
    </div>
  );
}
