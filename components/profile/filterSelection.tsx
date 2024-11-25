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
    <div className="mb-4 flex flex-wrap gap-2 justify-center">
      <button
        onClick={() => setFilter(null)}
        className={`px-4 py-2 rounded-xl ${
          selected === null ? "text-white" : "bg-gray-200 text-gray-700"
        }`}
        style={
          selected === null
            ? { backgroundColor: "#1B6AAA", color: "white" }
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
              ? { backgroundColor: "#1B6AAA", color: "white" }
              : {}
          }
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
