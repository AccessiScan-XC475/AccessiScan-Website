import { useState } from "react";

export default function NewReply({
  submitFunc,
}: {
  submitFunc: (content: string) => Promise<boolean>;
}) {
  const [content, setContent] = useState("");

  return (
    <div className="bg-[#C7EBD9] rounded-xl p-4 mx-auto my-2 max-w-4xl flex flex-col">
      <h4 className="text-2xl p-1 m-1 text-[#1B6AAA]">Reply to post</h4>
      <textarea
        value={content}
        placeholder="Content"
        onChange={(e) => setContent(e.target.value)}
        className="mb-2 text-[#1B6AAA] rounded-xl border border-gray-300 p-2"
        
      />
      <button
        onClick={() => {
          submitFunc(content).then((success) => {
            if (success) {
              setContent("");
            }
          });
        }}
        className={`rounded-xl p-2 bg-[#1B6AAA] disabled:bg-gray-200 m-2 ${
           content.length === 0 ? 'text-[#1B6AAA]' : 'text-white'
        }`}
        disabled={content.length === 0}
      >
        Reply
      </button>
    </div>
  );
}
