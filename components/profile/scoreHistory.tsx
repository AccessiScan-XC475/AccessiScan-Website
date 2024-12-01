"use client";
import { ScoreElement } from "@/app/profile/page";
import { LineChart } from "@mui/x-charts";
import { useState } from "react";
import FilterSelection from "./filterSelection";

export default function ScoreHistory({
  inputHistory,
}: {
  inputHistory: ScoreElement[];
}) {
  const hrefList = Array.from(new Set(inputHistory.map((elem) => elem.href)));
  const typeList = Array.from(new Set(inputHistory.map((elem) => elem.type)));

  const [hrefFilter, setHrefFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  const history = inputHistory
    .filter((elem) => hrefFilter === null || elem.href === hrefFilter)
    .filter((elem) => typeFilter === null || elem.type === typeFilter);

  return (
    <div className="p-4 max-w-[46vw]">
      <h3 className="text-xl">Score History</h3>
      <FilterSelection
        selected={hrefFilter}
        options={hrefList}
        setFilter={setHrefFilter}
        allName="All Urls"
      />
      <FilterSelection
        selected={typeFilter}
        options={typeList}
        setFilter={setTypeFilter}
        allName="All Accessibility Types"
      />
      <div className="flex justify-center">
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
              data: history.map((elem) => elem.score),
              color: "#54BD86",
              // @ts-expect-error format tooltip
              valueFormatter: (_, { dataIndex: i }) => {
                const elem = history[i];
                return (
                  <span>
                    Score: {elem.score}
                    <br />
                    Type: {elem.type}
                    <br />
                    URL: {elem.href}
                  </span>
                );
              },
            },
          ]}
          width={750}
          height={300}
          slotProps={{
            noDataOverlay: { message: "No scores to display" },
          }}
        />
      </div>
    </div>
  );
}
