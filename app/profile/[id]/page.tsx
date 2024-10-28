"use client";
import { CircularProgress } from "@mui/material";
import { use, useEffect, useState } from "react";

export type AccessiScanProfileOther = {
  id: string;
  name: string;
  username: string;
};

export default function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [profile, setProfile] = useState<AccessiScanProfileOther | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/profile?id=${id}`)
      .then((res) => (res.status === 200 ? res.json() : null))
      .then((data) => setProfile(data))
      .catch((e) => console.error(e));
    setLoading(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return loading ? (
    <CircularProgress />
  ) : profile === null ? (
    <div>
      <p>User Not Found</p>
    </div>
  ) : (
    <div>
      <p>{profile.id}</p>
      <p>{profile.name}</p>
      <p>{profile.username}</p>
    </div>
  );
}
