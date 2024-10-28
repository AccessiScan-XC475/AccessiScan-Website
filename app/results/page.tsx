"use client";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

type Result = {
  name: string;
  count: number;
};

export default function ResultsPage() {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    // Fetch accessibility selection data from the API
    fetch("/api/accessibility-selection")
      .then((res) => res.json())
      .then((data) => setResults(data)); // Update state with fetched data
  }, []); // only call this function on initial load

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-12 py-8">
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          my: 4,
          color: "#1B6AAA",
          fontWeight: 800,
          fontSize: "2rem",
        }}
      >
        Results
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          mx: "auto",
          maxWidth: "700px",
          my: 6,
          lineHeight: 1.6,
          fontSize: "1.1rem",
          color: "#333",
        }}
      >
        This page displays how often people choose certain accessibility options. We, as a team, are curious to see which options get chosen the most. We will use this data to improve our platform and the information we offer.
      </Typography>
      <div className="flex justify-center m-12">
        {results.length > 0 ? (
          <BarChart
            dataset={results} // Data to be displayed in the chart
            series={[{ dataKey: "count" }]} // Data key for the y-axis
            xAxis={[{ scaleType: "band", dataKey: "name" }]} // Data key for the x-axis
            height={400}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            sx={{
              backgroundColor: "#F5F5FA",
              borderRadius: "12px",
              boxShadow: "0 6px 10px rgba(0, 0, 0, 0.1)",
              borderColor: "#E0E0E0",
            }}
          />
        ) : (
          <Typography
            variant="body2"
            sx={{ textAlign: "center", color: "#888", fontSize: "1rem" }}
          >
            Loading results...
          </Typography>
        )}
      </div>
    </div>
  );
}
