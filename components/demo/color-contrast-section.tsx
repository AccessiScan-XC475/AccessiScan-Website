"use client";
import DemoComponent from "./demo-components";
import { useEffect, useState } from "react";

function randomColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor.padStart(6, "0")}`;
}

export default function ColorContrastSection({
  heading,
  content,
}: {
  heading: string;
  content: string;
}) {
  const [bgColor, setBgColor] = useState("");
  const [hColor, setHColor] = useState("");
  const [pColor, setPColor] = useState("");

  useEffect(() => {
    setBgColor(randomColor());
    setHColor(randomColor());
    setPColor(randomColor());
  }, []);

  return (
    <div className="flex">
      <div style={{ backgroundColor: bgColor }} className="p-6">
        <DemoComponent
          value={hColor}
          setter={(c) => setHColor(c as string)}
          label="heading text color"
        >
          <h2 className="text-4xl w-fit" style={{ color: hColor }}>
            {heading}
          </h2>
        </DemoComponent>
        <DemoComponent
          value={pColor}
          setter={(c) => setPColor(c as string)}
          label="content text color"
        >
          <p style={{ color: pColor }}>{content}</p>
        </DemoComponent>
      </div>
      <div>
        <div className="w-28 text-center p-4 text-black">
          <h3 className="">Background Color</h3>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
