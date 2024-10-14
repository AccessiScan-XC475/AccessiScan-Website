import { useState } from "react";

export default function NewPost({
  submitFunc,
}: {
  submitFunc: (title: string, content: string) => Promise<boolean>;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="bg-blue-200 rounded-xl p-4 m-2 flex flex-col">
      <h4 className="text-2xl p-1 m-1">Create a new post</h4>
      <input
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        value={content}
        placeholder="Content"
        onChange={(e) => setContent(e.target.value)}
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
        className="rounded-xl p-2 bg-green-200 disabled:bg-gray-200 m-2"
        disabled={title.length === 0 && content.length === 0}
      >
        Create
      </button>
    </div>
  );
}
