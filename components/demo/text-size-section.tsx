"use client";
import DemoComponent from "./demo-components";
import { useState } from "react";

export default function TextSizeSection({
  heading,
  content,
}: {
  heading: string;
  content: string;
}) {
  const [hSize, setHSize] = useState(10);
  const [pSize, setPSize] = useState(8);

  return (
    <div className="p-6">
      <DemoComponent
        value={hSize}
        setter={(c) => setHSize(Number(c))}
        label="heading text size"
      >
        <h2 className="text-4xl w-fit" style={{ fontSize: hSize }}>
          {heading}
        </h2>
      </DemoComponent>
      <DemoComponent
        value={pSize}
        setter={(c) => setPSize(Number(c))}
        label="content text size"
      >
        <p style={{ fontSize: pSize }}>{content}</p>
      </DemoComponent>
    </div>
  );
}
