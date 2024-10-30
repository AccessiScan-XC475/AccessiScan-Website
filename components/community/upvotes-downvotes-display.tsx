import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { ThumbDown, ThumbUp } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function UpvotesDownvotesDisplay({
  id,
  upvotes,
  downvotes,
  userVote,
  setUserVote,
}: {
  id: string;
  upvotes: number;
  downvotes: number;
  userVote: boolean | null;
  setUserVote: (v: string) => void;
}) {
  const sendVote = async (v: string) => {
    if (userVote === true && v === "upvote") {
      v = "remove";
    } else if (userVote === false && v === "downvote") {
      v = "remove";
    }
    const res = await fetch(`/api/community-post?id=${id}&vote=${v}`, {
      method: "PUT",
    });
    if (res.status !== 200) {
      return;
    }

    setUserVote(v);
  };

  return (
    <div className="flex items-center">
      <Button
        sx={{ padding: "0.1rem", width: "1rem" }}
        onClick={() => sendVote("upvote")}
      >
        <span className="text-[#1B6AAA] mr-1">{upvotes}</span>
        {userVote === true ? (
          <ThumbUp sx={{ color: "#1B6AAA" }} />
        ) : (
          <ThumbUpOffAltIcon sx={{ color: "#1B6AAA" }} />
        )}
      </Button>
      <Button sx={{ padding: "0.1rem" }} onClick={() => sendVote("downvote")}>
        <span className="text-[#1B6AAA] ml-2">{downvotes}</span>
        {userVote === false ? (
          <ThumbDown sx={{ color: "#1B6AAA" }} />
        ) : (
          <ThumbDownOffAltIcon style={{ color: "#1B6AAA" }} />
        )}
      </Button>
    </div>
  );
}
