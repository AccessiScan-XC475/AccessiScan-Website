"use client";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, ButtonBase } from "@mui/material";

export default function Secret() {
  const [showSecret, setShowSecret] = useState(false);
  const [secret, setSecret] = useState<string | null>(null);

  const getSecret = async () => {
    setShowSecret(true);
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
    <div className="flex flex-col justify-start h-32">
      <h4 className="text-base">
        {!showSecret ? (
          <button onClick={getSecret}>
            <VisibilityOff />
          </button>
        ) : (
          <button onClick={() => setShowSecret(false)}>
            <Visibility />
          </button>
        )}
        Super Secret Key:{" "}
        <span className="flex justify-center">
          {showSecret && (
            <ButtonBase
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "0.25rem",
              }}
              onClick={() => {
                navigator.clipboard.writeText(secret ?? "");
              }}
            >
              {secret}
              <p className="text-sm">click to copy</p>
            </ButtonBase>
          )}
        </span>
      </h4>
      {showSecret && (
        <Button
          onClick={refreshSecret}
          variant="outlined"
          sx={{ margin: "0.5rem" }}
        >
          Refresh Secret
        </Button>
      )}
    </div>
  );
}
