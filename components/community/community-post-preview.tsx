import Link from "next/link";
import UpvotesDownvotesDisplay from "./upvotes-downvotes-display";
import ForumIcon from "@mui/icons-material/Forum";

export type CommunityPostPreviewProps = {
  id: string;
  author: string;
  title: string;
  content: string;
  upvotes: number;
  downvotes: number;
  numReplies: number;
};

export default function CommunityPostPreview({
  postPreview,
}: {
  postPreview: CommunityPostPreviewProps;
}) {
  return (
    <Link href={`/community/${postPreview.id}`}>
      <div className="bg-[#C7EBD9] rounded-xl p-4 mx-auto my-2 max-w-4xl">
        <h4 className="text-xl font-semibold text-[#1B6AAA]">{postPreview.title}</h4>
        <p className="text-[#1B6AAA]">{postPreview.content}</p>
        <UpvotesDownvotesDisplay
          upvotes={postPreview.upvotes}
          downvotes={postPreview.downvotes}
        />
        <div className="text-[#1B6AAA]">
          {postPreview.numReplies}
          <ForumIcon />
        </div>
      </div>
    </Link>
  );
}
