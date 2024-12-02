"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { FeedbackProps } from "@/components/feedback-form";

export default function FeedbackSubmissionsPage() {
  const [feedbacks, setFeedbacks] = useState<FeedbackProps[]>([]);

  useEffect(() => {
    // Fetch feedback from the server
    fetch("/api/feedback-submissions", {
      credentials: "include", // Ensure session-based authentication
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch feedback. You may not have access.");
        }
        return res.json();
      })
      .then((data) => setFeedbacks(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-12 py-8">
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          marginBottom: "20px",
          fontWeight: "bold",
          color: "#54BD86",
        }}
      >
        Feedback Submissions
      </Typography>

      {/* Display All Feedbacks */}
      <Box sx={{ marginTop: "40px" }}>
        <Typography
          variant="h6"
          sx={{ fontSize: "18pt", fontWeight: "bold", color: "#1b6aaa" }}
        >
          Submitted Feedback
        </Typography>
        <Box sx={{ marginTop: "16px" }}>
          {feedbacks.length === 0 ? (
            <Typography
              variant="body1"
              sx={{ fontSize: "16pt", color: "#555" }}
            >
              No feedback submitted yet.
            </Typography>
          ) : (
            feedbacks.map((item, index) => (
              <Card
                key={index}
                sx={{
                  marginBottom: "10px",
                  backgroundColor: "#f9f9f9",
                  border: "1px solid #e0e0e0",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                }}
              >
                <CardContent>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "bold",
                      color: "#1b6aaa",
                      marginBottom: "8px",
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "16pt", color: "#555" }}
                  >
                    {item.message}
                  </Typography>
                </CardContent>
              </Card>
            ))
          )}
        </Box>
      </Box>
    </div>
  );
}
