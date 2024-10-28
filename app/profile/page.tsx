"use client";
import { CircularProgress } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import Link from "next/link";
import { useEffect, useState } from "react";

export type AccessiScanProfileSelf = {
  id: string;
  name: string;
  username: string;
  scoreHistory: number[];
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<AccessiScanProfileSelf | null>(null);
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
      <Link href={"/api/login/github"}>Sign In with GitHub</Link>
    </div>
  ) : (
    <div>
      <p>{profile.id}</p>
      <p>{profile.name}</p>
      <p>{profile.username}</p>
      <div className="bg-sky-100 rounded-xl p-4">
        <h3 className="text-xl">Score History</h3>
        {profile.scoreHistory.length === 0 ? (
          <p>No Score History</p>
        ) : (
          <LineChart
            xAxis={[{ data: profile.scoreHistory.map((_, i) => i + 1) }]}
            series={[
              {
                data: profile.scoreHistory.map((score) => score),
              },
            ]}
            width={500}
            height={300}
          />
        )}
      </div>
    </div>
  );
}
