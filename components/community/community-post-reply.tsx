import UpvotesDownvotesDisplay from "./upvotes-downvotes-display";

export type CommunityPostReplyProps = {
  parentId: string;
  id: string;
  author: string;
  content: string;
  upvotes: number;
  downvotes: number;
};

export default function CommunityPostReply({
  postReply,
}: {
  postReply: CommunityPostReplyProps;
}) {
  return (
    <div className="bg-blue-300 rounded-xl p-2 mx-auto my-2 max-w-4xl">
      <h4 className="text-lg font-medium">{postReply.author}</h4>
      <p>{postReply.content}</p>
      <UpvotesDownvotesDisplay
        upvotes={postReply.upvotes}
        downvotes={postReply.downvotes}
      />
    </div>
  );
}
