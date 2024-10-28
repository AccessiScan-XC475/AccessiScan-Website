import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

export default function UpvotesDownvotesDisplay({
  upvotes,
  downvotes,
}: {
  upvotes: number;
  downvotes: number;
}) {
  return (
    <div className="flex items-center">
      <span className="text-[#1B6AAA] mr-1">{upvotes}</span>
      <ThumbUpOffAltIcon style={{ color: '#1B6AAA' }} />
      <span className="text-[#1B6AAA] ml-2">{downvotes}</span>
      <ThumbDownOffAltIcon style={{ color: '#1B6AAA' }} />
    </div>
  );
}
