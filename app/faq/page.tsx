// FAQ.tsx
"use client";
import { Card, CardContent, Typography, Box } from "@mui/material";
import FeedbackForm from "@/components/feedback-form";

const faqs = [
  {
    question: "How do I download the Chrome Extension?",
    answer:
      "Select the “AccessiScan” logo at the top left of the page to go to the “Home” page. From there, select “Download”",
  },
  {
    question: "What can I expect in the next release?",
    answer:
      "Navigate to our About page by selecting the link in the footer of this page.",
  },
  {
    question: "How do I download the Chrome Extension?",
    answer:
      "Select the “AccessiScan” logo at the top left of the page to go to the “Home” page. From there, select “Download”",
  },
];

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {faqs.map((faq, index) => (
          <Card
            key={index}
            sx={{
              backgroundColor: "#f9f9f9",
              border: "1px solid #e0e0e0",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              width: "100%",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "18pt",
                  fontWeight: "bold",
                  color: "#1b6aaa",
                }}
                gutterBottom
              >
                {faq.question}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "16pt",
                  color: "#555555",
                  lineHeight: "1.8",
                }}
              >
                {faq.answer}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Include Feedback Form component here */}
      <FeedbackForm />
    </div>
  );
}
