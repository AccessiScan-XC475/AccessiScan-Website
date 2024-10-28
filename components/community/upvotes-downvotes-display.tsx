"use client";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { useState } from "react";
import { ThumbDown, ThumbUp } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function UpvotesDownvotesDisplay({
  upvotes,
  downvotes,
  userVote,
}: {
  upvotes: number;
  downvotes: number;
  userVote: boolean | null;
}) {
  const [vote, setVote] = useState<boolean | null>(userVote);

  return (
    <div className="flex items-center">
      <Button
        sx={{ padding: "0.1rem", width: "1rem" }}
        onClick={() => {
          if (vote === true) {
            setVote(null);
          } else {
            setVote(true);
          }
        }}
      >
        <span className="text-[#1B6AAA] mr-1">{upvotes}</span>
        {vote === true ? (
          <ThumbUp sx={{ color: "#1B6AAA" }} />
        ) : (
          <ThumbUpOffAltIcon sx={{ color: "#1B6AAA" }} />
        )}
      </Button>
      <Button
        sx={{ padding: "0.1rem" }}
        onClick={() => {
          if (vote === false) {
            setVote(null);
          } else {
            setVote(false);
          }
        }}
      >
        <span className="text-[#1B6AAA] ml-2">{downvotes}</span>
        {vote === false ? (
          <ThumbDown sx={{ color: "#1B6AAA" }} />
        ) : (
          <ThumbDownOffAltIcon style={{ color: "#1B6AAA" }} />
        )}
      </Button>
    </div>
  );
}
