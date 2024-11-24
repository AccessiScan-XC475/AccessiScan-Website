"use client";
import { Dispatch, SetStateAction, useState } from "react";
import CommunityPostReply, { CommunityPostReplyProps } from "./community-post-reply";
import NewReply from "./new-reply";
import UpvotesDownvotesDisplay from "./upvotes-downvotes-display";

export type CommunityPostFullProps = {
  id: string;
  author: string;
  title: string;
  content: string;
  upvotes: number;
  downvotes: number;
  userVote: boolean | null;
  replies: CommunityPostReplyProps[];
  tag?: string; // Optional single tag
};

/**
 * post and setPost must both refer to the same type of either CommunityPostFullProps or CommunityPostReplyProps
 */
export const changeUserVote = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setPost: Dispatch<SetStateAction<any>>,
  v: string
) => {
  let numUp = post.upvotes;
  let numDown = post.downvotes;

  if (post.userVote === true) {
    numUp--;
  } else if (post.userVote === false) {
    numDown--;
  }

  // update with new status
  let vote = null;
  if (v === "upvote") {
    vote = true;
    numUp++;
  } else if (v === "downvote") {
    vote = false;
    numDown++;
  } else {
    vote = null;
  }
  setPost({
    ...post,
    upvotes: numUp,
    downvotes: numDown,
    userVote: vote,
  });
};

export default function CommunityPostFull({
  inputPost,
}: {
  inputPost: CommunityPostFullProps;
}) {
  const [post, setPost] = useState(inputPost);
  const [replies, setReplies] = useState(inputPost.replies);

  const setIthReply = (i: number, r: CommunityPostReplyProps) => {
    setReplies(
      replies.map((reply, j) => {
        if (i !== j) {
          return reply;
        }
        return r;
      })
    );
  };

  const createNewReply = async (content: string): Promise<boolean> => {
    const newPost = {
      parentId: inputPost.id,
      author: "anonymous replier",
      content: content,
      upvotes: 0,
      downvotes: 0,
      userVote: null,
    };

    const res = await fetch(`/api/community-post?parentId=${inputPost.id}`, {
      method: "POST",
      body: JSON.stringify(newPost),
    });

    if (res.status === 200) {
      setReplies([{ ...newPost, id: await res.text() }, ...replies]);
      return true;
    }

    return false;
  };

  return (
    <div className="flex justify-center mt-4">
      <div className="border-2 bg-white p-6 m-2 w-[60vw] rounded-xl shadow-lg"
      style={{ borderColor: "#54BD86" }}>
        <div>
          <h3 className="text-3xl font-semibold text-[#1B6AAA] leading-7">
            {inputPost.title}
          </h3>
          <p className="text-[#1B6AAA] leading-7">{inputPost.content}</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <UpvotesDownvotesDisplay
            id={inputPost.id}
            upvotes={post.upvotes}
            downvotes={post.downvotes}
            userVote={post.userVote}
            setUserVote={(v: string) => changeUserVote(post, setPost, v)}
          />
          {inputPost.tag && (
            <span className="text-white px-3 py-1 rounded-full text-sm inline-block mb-2"
            style={{ backgroundColor: "#1B6AAA" }}>
            {inputPost.tag}
          </span>
          )}
        </div>
        <div className="bg-white p-2 my-2 rounded-xl">
          <h4 className="text-xl font-medium text-[#1B6AAA]">Replies</h4>
          <NewReply submitFunc={createNewReply} />
          {replies.map((reply, i) => (
            <CommunityPostReply
              inputReply={reply}
              key={i}
              setReply={(r: CommunityPostReplyProps) => setIthReply(i, r)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
