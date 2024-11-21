"use client";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function Secret() {
  const [secret, setSecret] = useState<string | null>(null);

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

  return (
    <div className="flex flex-col items-center">
      <h4 className="">
        Super Secret Key:{" "}
        <span>
          {secret === null ? (
            <button onClick={getSecret}>
              <VisibilityOff />
            </button>
          ) : (
            <>
              <button onClick={() => setSecret(null)}>
                <Visibility />
              </button>
              {secret}
            </>
          )}
        </span>
      </h4>
      {secret !== null && (
        <Button onClick={refreshSecret}>Refresh Secret</Button>
      )}
    </div>
  );
}
