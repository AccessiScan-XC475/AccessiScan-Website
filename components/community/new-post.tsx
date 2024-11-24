import { useState } from "react";

export default function NewPost({
  submitFunc,
}: {
  submitFunc: (title: string, content: string, tag: string) => Promise<boolean>;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("");

  const availableTags = ["Color contrast", "Text size", "Labeled images", "Resources", "Profile", "Other"];

  return (
    <div className="border-2 bg-white rounded-xl p-4 mx-auto my-2 max-w-4xl flex flex-col shadow-lg" 
    style={{ borderColor: "#8275C9" }}>
      <h4 className="text-2xl p-1 m-1 text-[#1B6AAA]"><b>Create a new post</b></h4>
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
            className={`px-4 py-2 rounded-xl ${selectedTag === tag ? "text-white" : "bg-gray-200 text-gray-700"}`}
            style={{
              backgroundColor: selectedTag === tag ? "#1B6AAA" : "", 
            }}
          >
            {tag}
          </button>
        ))}
      </div>
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
        className={`rounded-xl p-2 bg-[#1B6AAA] disabled:bg-gray-200 m-2 ${
          title.length === 0 || content.length === 0 ? 'text-[#1B6AAA]' : 'text-white'
        }`}
        disabled={title.length === 0 || content.length === 0}
      >
        Create
      </button>
    </div>
  );
}
