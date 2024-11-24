import Link from "next/link";
import ForumIcon from "@mui/icons-material/Forum";
import { ThumbDown, ThumbUp } from "@mui/icons-material";

export type CommunityPostPreviewProps = {
  id: string;
  author: string;
  title: string;
  content: string;
  upvotes: number;
  downvotes: number;
  numReplies: number;
  tag?: string; // Optional single tag
};

export default function CommunityPostPreview({
  postPreview,
}: {
  postPreview: CommunityPostPreviewProps;
}) {
  return (
    <Link href={`/community/${postPreview.id}`}>
      <div className="border-2 bg-white rounded-xl p-4 mx-auto my-2 max-w-4xl shadow-lg relative"
      style={{ borderColor: "#54BD86" }}>
        <h4 className="text-xl font-semibold text-[#1B6AAA] leading-7">
          {postPreview.title}
        </h4>
        <p className="text-[#1B6AAA] leading-6">{postPreview.content}</p>
        <div className="flex items-center text-[#1B6AAA] gap-x-4 mt-4">
          <div>
            <span className="mr-1">{postPreview.upvotes}</span>
            <ThumbUp sx={{ color: "#1B6AAA" }} />
          </div>
          <div>
            <span className="ml-1">{postPreview.downvotes}</span>
            <ThumbDown sx={{ color: "#1B6AAA" }} />
          </div>
          <div className="text-[#1B6AAA]">
          {postPreview.numReplies}
          <ForumIcon />
        </div>
        </div>
        {postPreview.tag && (
          <span className="text-white px-3 py-1 rounded-full text-sm absolute bottom-2 right-2"
          style={{ backgroundColor: "#1B6AAA" }}>
            {postPreview.tag}
          </span>
        )}
      </div>
    </Link>
  );
}
