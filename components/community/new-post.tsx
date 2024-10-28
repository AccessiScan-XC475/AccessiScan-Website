import { useState } from "react";

export default function NewPost({
  submitFunc,
}: {
  submitFunc: (title: string, content: string) => Promise<boolean>;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="bg-[#C7EBD9] rounded-xl p-4 mx-auto my-2 max-w-4xl flex flex-col shadow-lg">
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
      <button
        onClick={() => {
          submitFunc(title, content).then((success) => {
            if (success) {
              setTitle("");
              setContent("");
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
