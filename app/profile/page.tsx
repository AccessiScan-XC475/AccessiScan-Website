"use client";
import { DOMAIN } from "@/domain";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

export type AccessiScanProfile = {
  id: string;
  name: string;
  username: string;
  scoreHistory: number[];
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<AccessiScanProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/profile")
      .then((res) => (res.status === 200 ? res.json() : null))
      .then((data) => setProfile(data))
      .catch((e) => console.error(e));
    setLoading(false);
  }, []);

  return loading ? (
    <CircularProgress />
  ) : profile === null ? (
    <div>
      <Link href={DOMAIN + "/api/login/github"}>Sign In with GitHub</Link>
    </div>
  ) : (
    <div>
      <p>{profile.id}</p>
      <p>{profile.name}</p>
      <p>{profile.username}</p>
      <p>{profile.scoreHistory}</p>
    </div>
  );
}
