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
        {
          ...newPost,
          id: await res.text(),
        },
        ...replies,
      ]);
      return true;
    }

    return false;
  };

  return (
    <div className="bg-[#C7EBD9] p-6 mx-auto my-4 max-w-4xl">
      <div>
        <h3 className="text-3xl font-semibold text-[#1B6AAA]">{post.title}</h3>
        <p className="text-[#1B6AAA]">{post.content}</p>
      </div>
      <div className="absolute bottom-4 right-4">
        <UpvotesDownvotesDisplay
          upvotes={post.upvotes}
          downvotes={post.downvotes}
        />
      </div>
      <div className="bg-white p-2 my-2 rounded-xl">
        <h4 className="text-xl font-medium text-[#1B6AAA]">Replies</h4>
        <NewReply submitFunc={createNewReply} />
        {replies.map((reply, i) => (
          <CommunityPostReply postReply={reply} key={i} />
        ))}
      </div>
    </div>
  );
}
