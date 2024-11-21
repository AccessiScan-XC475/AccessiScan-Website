"use client";
import { LineChart } from "@mui/x-charts";

export default function ScoreHistory({ history }: { history: number[] }) {
  return (
    <div className="p-4">
      <h3 className="text-xl">Score History</h3>
      <LineChart
        xAxis={[
          {
            data: history.map((_, i) => i + 1),
            scaleType: "point",
            tickLabelStyle: {
              fontSize: 16,
            },
          },
        ]}
        yAxis={[
          {
            tickLabelStyle: {
              fontSize: 16,
            },
            min: 0,
            max: 100,
          },
        ]}
        series={[
          {
            data: history.map((score) => score),
            color: "#54BD86",
          },
        ]}
        width={750}
        height={300}
        slotProps={{
          noDataOverlay: { message: "No score history" },
        }}
      />
    </div>
  );
}
