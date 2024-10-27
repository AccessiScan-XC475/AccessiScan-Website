import { useState } from "react";

export default function NewReply({
  submitFunc,
}: {
  submitFunc: (content: string) => Promise<boolean>;
}) {
  const [content, setContent] = useState("");

  return (
    <div className="bg-blue-200 rounded-xl p-4 mx-auto my-2 max-w-4xl flex flex-col">
      <h4 className="text-2xl p-1 m-1">Reply to post</h4>
      <textarea
        value={content}
        placeholder="Content"
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={() => {
          submitFunc(content).then((success) => {
            if (success) {
              setContent("");
            }
          });
        }}
        className="rounded-xl p-2 bg-green-200 disabled:bg-gray-200 m-2"
        disabled={content.length === 0}
      >
        Reply
      </button>
    </div>
  );
}
