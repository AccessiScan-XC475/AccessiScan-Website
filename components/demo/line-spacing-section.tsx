"use client";
import DemoComponent from "./demo-components";
import { useState } from "react";

export default function LineSpacingSection({
  heading,
  content,
}: {
  heading: string;
  content: string;
}) {
  const [hSpacing, setHSpacing] = useState(3); // Default line spacing for heading
  const [pSpacing, setPSpacing] = useState(3); // Default line spacing for paragraph

  return (
    <div className="p-6">
      <DemoComponent
        value={hSpacing}
        setter={(c) => setHSpacing(Number(c))}
        label="Heading line spacing"
      >
        <h2 className="text-4xl w-fit" style={{ lineHeight: hSpacing }}>
          {heading}
        </h2>
      </DemoComponent>
      <DemoComponent
        value={pSpacing}
        setter={(c) => setPSpacing(Number(c))}
        label="Content line spacing"
      >
        <p style={{ lineHeight: pSpacing }}>{content}</p>
      </DemoComponent>
    </div>
  );
}
