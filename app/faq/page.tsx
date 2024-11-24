"use client";
import { Card, CardContent, Typography } from "@mui/material";

export default function FAQ() {
  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-12 py-8">
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          my: 4,
          color: "#54BD86",
          fontWeight: 800,
          fontSize: "2rem",
        }}
      >
        Frequently Asked Questions
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: "left",
          mx: "auto",
          maxWidth: "700px",
          my: 6,
          lineHeight: 1.6,
          fontSize: "1.1rem",
          color: "#333",
        }}
      >
        Hello, testing
      </Typography>
    </div>
  );
}
