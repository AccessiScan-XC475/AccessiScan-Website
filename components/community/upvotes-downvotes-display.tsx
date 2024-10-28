"use client";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { useState } from "react";
import { ThumbDown, ThumbUp } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function UpvotesDownvotesDisplay({
  id,
  upvotes,
  downvotes,
  userVote,
}: {
  id: string;
  upvotes: number;
  downvotes: number;
  userVote: boolean | null;
}) {
  const [vote, setVote] = useState<boolean | null>(userVote);
  const [numUp, setNumUp] = useState(upvotes);
  const [numDown, setNumDown] = useState(downvotes);

  const sendVote = async (v: string) => {
    if (vote === true && v === "upvote") {
      v = "remove";
    } else if (vote === false && v === "downvote") {
      v = "remove";
    }
    const res = await fetch(`/api/community-post?id=${id}&vote=${v}`, {
      method: "PUT",
    });
    if (res.status !== 200) {
      return;
    }

    // clear old status
    if (vote === true) {
      setNumUp(numUp - 1);
    } else if (vote === false) {
      setNumDown(numDown - 1);
    }

    // update with new status
    if (v === "upvote") {
      setVote(true);
      setNumUp(numUp + 1);
    } else if (v === "downvote") {
      setVote(false);
      setNumDown(numDown + 1);
    } else {
      setVote(null);
    }
  };

  return (
    <div className="flex items-center">
      <Button
        sx={{ padding: "0.1rem", width: "1rem" }}
        onClick={() => sendVote("upvote")}
      >
        <span className="text-[#1B6AAA] mr-1">{numUp}</span>
        {vote === true ? (
          <ThumbUp sx={{ color: "#1B6AAA" }} />
        ) : (
          <ThumbUpOffAltIcon sx={{ color: "#1B6AAA" }} />
        )}
      </Button>
      <Button sx={{ padding: "0.1rem" }} onClick={() => sendVote("downvote")}>
        <span className="text-[#1B6AAA] ml-2">{numDown}</span>
        {vote === false ? (
          <ThumbDown sx={{ color: "#1B6AAA" }} />
        ) : (
          <ThumbDownOffAltIcon style={{ color: "#1B6AAA" }} />
        )}
      </Button>
    </div>
  );
}
