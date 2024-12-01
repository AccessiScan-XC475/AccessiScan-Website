import { useState } from "react";
import { Create } from "@mui/icons-material";

export default function NewReply({
  submitFunc,
}: {
  submitFunc: (content: string) => Promise<boolean>;
}) {
  const [content, setContent] = useState("");

  const handleCancel = () => {
    setContent("");
  };

  return (
    <div className="border-2 bg-[#F8F8F8] rounded-xl p-4 mx-auto my-2 max-w-4xl flex flex-col shadow-lg "
    style={{ borderColor: "#E7E7E7" }}>
      <h4 className="text-2xl text-center p-1 m-1 text-[#1B6AAA]"><Create /> Write a Reply</h4>
      <textarea
        value={content}
        placeholder="Content"
        onChange={(e) => setContent(e.target.value)}
        className="mb-2 text-[#1B6AAA] rounded-xl border border-gray-300 p-2"
        
      />
      <div className="flex justify-end">
        <button
          onClick={handleCancel}
          className="rounded-xl px-6 p-2 text-[#1B6AAA] hover:bg-gray-300 m-2"
        >
          Cancel
        </button>
      <button
        onClick={() => {
          submitFunc(content).then((success) => {
            if (success) {
              setContent("");
            }
          });
        }}
        className={`rounded-xl border px-10 p-2 bg-[#1B6AAA] disabled:bg-[#81ABCE] m-2 ${
          content.length === 0 ? 'text-white' : 'text-white'
        }`}
        disabled={content.length === 0}
      >
        Reply
        </button>
      </div>
    </div>
  );
}
