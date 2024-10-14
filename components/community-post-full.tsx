import CommunityPostReply, {
  CommunityPostReplyProps,
} from "./community-post-reply";
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
        {post.replies.map((reply) => (
          <CommunityPostReply postReply={reply} />
        ))}
      </div>
    </div>
  );
}
