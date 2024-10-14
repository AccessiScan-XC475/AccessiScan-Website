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
    <div className="flex">
      <div>
        {upvotes} <ThumbUpOffAltIcon />
      </div>
      <div>
        {downvotes} <ThumbDownOffAltIcon />
      </div>
    </div>
  );
}
