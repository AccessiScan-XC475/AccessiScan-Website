"use client";
import { useEffect, useState } from "react";

export default function AppendPage() {
  const [score, setScore] = useState(90);

  useEffect(() => {
    if (score < 0) {
      setScore(0);
    } else if (score > 100) {
      setScore(100);
    }
  }, [score]);

  return (
    <div>
      <h3>Append score to history</h3>
      <input
        className="bg-blue-200 m-2 p-4"
        type="number"
        value={score}
        onChange={(e) => setScore(Number(e.target.value))}
      />
      <button
        className="bg-green-200 p-4 rounded-xl"
        onClick={() => {
          fetch(`/api/auth/append?score=${score}`, { method: "POST" });
        }}
      >
        Append
      </button>
    </div>
  );
}
