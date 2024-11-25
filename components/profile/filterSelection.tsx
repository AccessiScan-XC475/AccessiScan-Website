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
  const selectedColor = "#54BD86";
  return (
    <div className="m-4 p-1 flex flex-wrap gap-2 ">
      <button
        onClick={() => setFilter(null)}
        className={`px-4 py-2 rounded-xl ${
          selected === null ? "text-white" : "bg-gray-200 text-gray-700"
        }`}
        style={
          selected === null
            ? { backgroundColor: selectedColor, color: "white" }
            : {}
        }
      >
        {allName}
      </button>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => setFilter(opt)}
          className={`px-4 py-2 rounded-xl ${
            selected === opt ? "text-white" : "bg-gray-200 text-gray-700"
          }`}
          style={
            selected === opt
              ? { backgroundColor: selectedColor, color: "white" }
              : {}
          }
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
