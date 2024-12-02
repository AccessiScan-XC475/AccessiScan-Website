"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import FeedbackForm from "../faq/feedbackform";  // Import the FeedbackForm component

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch feedback from the server
    fetch("/api/feedbackform", {
      credentials: "include", // Ensure session-based authentication
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch feedback. You may not have access.");
        }
        return res.json();
      })
      .then((data) => setFeedbacks(data))
      .catch((err) => setError(err.message));
  }, []);

  // Handle new feedback submission
  const handleFeedbackSubmit = (newFeedback: any) => {
    // Optionally, send the new feedback to the server here
    setFeedbacks((prevFeedbacks) => [...prevFeedbacks, newFeedback]);
  };

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

      {/* Include Feedback Form component here */}
      <FeedbackForm onFeedbackSubmit={handleFeedbackSubmit} />

      {/* Display All Feedbacks */}
      <Box sx={{ marginTop: "40px" }}>
        <Typography variant="h6" sx={{ fontSize: "18pt", fontWeight: "bold", color: "#1b6aaa" }}>
          Submitted Feedback
        </Typography>
        <Box sx={{ marginTop: "16px" }}>
          {feedbacks.length === 0 ? (
            <Typography variant="body1" sx={{ fontSize: "16pt", color: "#555" }}>
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
                    sx={{ fontWeight: "bold", color: "#1b6aaa", marginBottom: "8px" }}
                  >
                    {item.name}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: "16pt", color: "#555" }}>
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
