"use client";
import { MenuItem, Select } from "@mui/material";
import { useState } from "react";

export default function HomePage() {
  const [selection, setSelection] = useState("");

  return (
    <div className="flex flex-col items-center">
      <h2>Welcome to AccessiScan</h2>
      <div className="flex flex-col items-center">
        <div className="flex items-center p-1 m-2">
          <p className="p-1">Choose your goal</p>
          <Select
            value={selection}
            label="Goal"
            className="w-32 p-0.25"
            onChange={(e) => setSelection(e.target.value)}
          >
            <MenuItem value={"visual"}>Visual</MenuItem>
            <MenuItem value={"audio"}>Audio</MenuItem>
            <MenuItem value={"mobility"}>Mobility</MenuItem>
          </Select>
        </div>
        <button
          onClick={() => {
            fetch(`/api/accessibility-selection?name=${selection}`, {
              method: "POST",
            });
          }}
          className="py-2 px-6 m-4 bg-green-500 rounded-xl"
        >
          Go!
        </button>
      </div>
    </div>
  );
}
