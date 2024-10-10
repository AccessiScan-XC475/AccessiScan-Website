"use client";
import { useState, useEffect } from "react";
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
    <div>
      <h3 className="text-center text-2xl">Results</h3>
      <p className="text-center mb-4">
        This page displays how often people choose certain accessibility
        options. We, as a team, are curious to see which options get chosen the
        most. We will use this data to improve our platform and the information
        we offer.
      </p>
      <div className="w-96 m-12">
        {results.length > 0 && (
          <BarChart
            dataset={results} // Data to be displayed in the chart
            series={[{ dataKey: "count" }]} // Data key for the y-axis
            xAxis={[{ scaleType: "band", dataKey: "name" }]} // Data key for the x-axis
            height={400}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          />
        )}
      </div>
    </div>
  );
}
