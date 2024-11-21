"use client";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import LoginLinks from "@/components/profile/loginLinks";
import SelfProfileDisplay from "@/components/profile/selfProfileDisplay";

export type AccessiScanProfileSelf = {
  id: string;
  name: string;
  username: string;
  scoreHistory: number[];
  githubProfile: {
    avatarUrl: string;
    name: string;
    email: string;
  };
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<AccessiScanProfileSelf | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/profile")
      .then((res) => (res.status === 200 ? res.json() : null))
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="flex justify-center">
      {loading ? (
        <CircularProgress />
      ) : profile === null ? (
        <LoginLinks />
      ) : (
        <SelfProfileDisplay profile={profile} />
      )}
    </div>
  );
}
