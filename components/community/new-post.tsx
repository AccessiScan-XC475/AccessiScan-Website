import { useState } from "react";
import { Create } from "@mui/icons-material";

export default function NewPost({
  submitFunc,
}: {
  submitFunc: (title: string, content: string, tag: string) => Promise<boolean>;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("");

  const availableTags = ["Color contrast", "Text size", "Labeled images", "Resources", "Profile", "Other"];

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedTag("");
  };

  return (
    <div className="border-2 rounded-xl p-4 mx-auto my-2 max-w-4xl flex flex-col shadow-lg" 
    style={{ backgroundColor: "#F8F8F8", borderColor: "#E7E7E7" }}>
      <h4 className="text-2xl p-1 m-1 text-center text-[#1B6AAA] "><b><Create /> Create a new post</b></h4>
      <input
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        className="mb-2 text-[#1B6AAA] rounded-xl border border-gray-300 p-2"
      />
      <textarea
        value={content}
        placeholder="Content"
        onChange={(e) => setContent(e.target.value)}
        className="mb-2 text-[#1B6AAA] rounded-xl border border-gray-300 p-2"
      />
      <div className="flex gap-2 mb-2">
        {availableTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
            className={`px-4 py-2 rounded-3xl border-2 hover:bg-[#CCDCE8] m-2 transition-colors ${selectedTag === tag ? "bg-[#1B6AAA] text-white border-white" : "bg-white text-[#1B6AAA] border-[#1B6AAA]"}`}
            style={{
              backgroundColor: selectedTag === tag ? "#1B6AAA" : "", 
            }}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleCancel}
          className="rounded-xl px-6 p-2 text-[#1B6AAA] hover:bg-gray-300 m-2"
        >
          Clear
        </button>
      <button
        onClick={() => {
          submitFunc(title, content, selectedTag).then((success) => {
            if (success) {
              setTitle("");
              setContent("");
              setSelectedTag("");
            }
          });
        }}
        className={`rounded-xl border px-10 p-2 bg-[#1B6AAA] disabled:bg-[#81ABCE] m-2 ${
          title.length === 0 || content.length === 0 ? 'text-white' : 'text-white'
        }`}
        disabled={title.length === 0 || content.length === 0}
      >
        Create
        </button>
      </div>
    </div>
  );
}
