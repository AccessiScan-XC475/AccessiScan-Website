"use client";
import { useState } from "react";
import { TextField, Button, Box, Snackbar } from "@mui/material";

export type FeedbackProps = {
  name: string;
  email: string;
  message: string;
};

export default function FeedbackForm() {
  const [feedback, setFeedback] = useState<FeedbackProps>({
    name: "",
    email: "",
    message: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFeedback({
      ...feedback,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback.name && feedback.message) {
      const res = await fetch("/api/feedback", {
        method: "POST",
        body: JSON.stringify(feedback),
      });

      const message = await res.text();
      if (message == "success") {
        // Show snackbar success message
        setSnackbarOpen(true);

        // Reset the form after submission
        setFeedback({ name: "", email: "", message: "" });
      } else {
        console.log(message);
      }
    }
  };

  return (
    <Box
      sx={{
        marginTop: "40px",
        backgroundColor: "#f9f9f9",
        border: "1px solid #e0e0e0",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        padding: "20px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: "16px",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              required
              value={feedback.name}
              onChange={handleInputChange}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextField
              label="Email (Optional)"
              name="email"
              fullWidth
              value={feedback.email}
              onChange={handleInputChange}
            />
          </Box>
        </Box>
        <Box sx={{ marginTop: "16px" }}>
          <TextField
            label="Your Feedback"
            name="message"
            multiline
            rows={4}
            fullWidth
            required
            value={feedback.message}
            onChange={handleInputChange}
          />
        </Box>
        <Box sx={{ textAlign: "center", marginTop: "16px" }}>
          <Button type="submit" variant="contained" color="primary">
            Submit Feedback
          </Button>
        </Box>
      </form>

      {/* Snackbar to show success message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Thank you for your feedback!"
      />
    </Box>
  );
}
