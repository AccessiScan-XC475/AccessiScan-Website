import { changeUserVote } from "./community-post-full";
import UpvotesDownvotesDisplay from "./upvotes-downvotes-display";

export type CommunityPostReplyProps = {
  parentId: string;
  id: string;
  author: string;
  content: string;
  upvotes: number;
  downvotes: number;
  userVote: boolean | null;
};

export default function CommunityPostReply({
  inputReply,
  setReply,
}: {
  inputReply: CommunityPostReplyProps;
  setReply: (r: CommunityPostReplyProps) => void;
}) {
  return (
    <div className="border-2 bg-[#F8F8F8] rounded-xl p-2 mx-auto my-2 w-[60vw] shadow-lg"
    style={{ borderColor: "#E7E7E7" }}>
      <h4 className="text-lg font-medium text-[#1B6AAA]">
        {inputReply.author}
      </h4>
      <p className="text-[#1B6AAA]">{inputReply.content}</p>
      <UpvotesDownvotesDisplay
        id={inputReply.id}
        upvotes={inputReply.upvotes}
        downvotes={inputReply.downvotes}
        userVote={inputReply.userVote}
        setUserVote={(v: string) => changeUserVote(inputReply, setReply, v)}
      />
    </div>
  );
}
