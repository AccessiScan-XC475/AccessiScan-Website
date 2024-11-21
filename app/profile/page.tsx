"use client";
import { Button, CircularProgress } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
  const [secret, setSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getSecret = async () => {
    if (secret !== null) return;
    const res = await fetch("/api/auth/chromeExtensionSecret");
    if (res.status === 200) {
      setSecret(await res.text());
    }
  };

  const refreshSecret = async () => {
    const res = await fetch("/api/auth/chromeExtensionSecret", {
      method: "POST",
    });
    if (res.status === 200) {
      setSecret(await res.text());
    }
  };

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
      <div className="flex p-8">
        <Image
          src={profile.githubProfile.avatarUrl}
          alt="github avatar"
          width={300}
          height={300}
          style={{ borderRadius: "50%", padding: "0.75rem" }}
        />
        <div className="flex flex-col justify-end">
          <p>{profile.name}</p>
          <p>{profile.githubProfile.email}</p>
          <p>{profile.username}</p>
        </div>
      </div>
      <div className="flex flex-col items-center p-2 m-1">
        <h4 className="p-2">
          Super Secret Key:{" "}
          <span>
            {secret === null ? (
              <button onClick={getSecret}>
                <Visibility />
              </button>
            ) : (
              <>
                {secret}
                <button onClick={() => setSecret(null)} className="p-1">
                  <VisibilityOff />
                </button>
              </>
            )}
          </span>
        </h4>
        {secret !== null && (
          <Button onClick={refreshSecret}>Refresh Secret</Button>
        )}
      </div>

      <div className="rounded-xl p-4">
        <h3 className="text-xl">Score History</h3>
        <LineChart
          xAxis={[
            {
              data: profile.scoreHistory.map((_, i) => i + 1),
              scaleType: "point",
              tickLabelStyle: {
                fontSize: 16,
              },
            },
          ]}
          yAxis={[
            {
              tickLabelStyle: {
                fontSize: 16,
              },
              min: 0,
              max: 100,
            },
          ]}
          series={[
            {
              data: profile.scoreHistory.map((score) => score),
              color: "#54BD86",
            },
          ]}
          width={750}
          height={350}
          slotProps={{
            noDataOverlay: { message: "No score history" },
          }}
        />
      </div>
    </div>
  );
}
