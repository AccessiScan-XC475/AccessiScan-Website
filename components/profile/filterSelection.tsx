import { Button } from "@mui/material";

export default function FilterSelection({
  selected,
  options,
  setFilter,
  allName,
}: {
  selected: string | null;
  options: string[];
  setFilter: (opt: string | null) => void;
  allName: string;
}) {
  return (
    <div className="m-4 p-1 flex flex-wrap gap-2 ">
      {[null, ...options].map((opt) => (
        <Button
          variant="contained"
          key={opt}
          onClick={() => setFilter(opt)}
          sx={
            selected === opt
              ? { backgroundColor: "#54BD86", color: "white" }
              : { backgroundColor: "#E5E7EB", color: "#374151" }
          }
        >
          <span
            style={{
              overflow: "hidden",
              textWrap: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {opt ?? allName}
          </span>
        </Button>
      ))}
    </div>
  );
}
