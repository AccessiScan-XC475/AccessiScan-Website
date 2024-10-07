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
    fetch("/api/accessibility-selection")
      .then((res) => res.json())
      .then((data) => setResults(data));
  }, []);

  return (
    <div>
      <h3 className="text-center text-2xl">Results</h3>
      <div className="w-96 m-12">
        {results.length > 0 && (
          <BarChart
            dataset={results}
            series={[{ dataKey: "count" }]}
            xAxis={[{ scaleType: "band", dataKey: "name" }]}
            height={400}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          />
        )}
      </div>
    </div>
  );
}
