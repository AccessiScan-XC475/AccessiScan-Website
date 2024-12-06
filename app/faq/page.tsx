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
      "Navigate to our “About” page by selecting the link in the footer of this page.",
  },
  {
    question: "Where can I learn more about accessibility in technology?",
    answer:
      "Navigate to our “Resources” page from the navigation bar at the top of the page. This page contains various resources.",
  },
  {
    question: "What does it mean if I got a score below 50% after scanning my wesbite?",
    answer:
      "This means that elements in your website are not considered accessible according to official guidelines. Take a look at our Resources page to learn more about these guidelines and why are they important.",
  },
];

export default function FAQ() {
  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-12 py-8">
      <h3
          className="text-4xl md:text-4xl font-semibold leading-tight text-primary text-center py-6"
        >
          Frequently Asked Questions
        </h3>
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
                className="text-secondary"
                sx={{
                  fontSize: "18pt",
                  fontWeight: "bold",
                  fontFamily: '"Lexend", sans-serif',
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
                  fontFamily: '"Lexend", sans-serif',
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
