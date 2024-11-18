"use client";
import Image from "next/image";
import DemoComponent from "./demo-components";
import { useState } from "react";

export default function AltTextSection({
  src,
  show,
}: {
  src: string;
  show: boolean;
}) {
  const [altText, setAltText] = useState("");

  return (
    <div className="p-6 m-1">
      <DemoComponent
        value={altText}
        setter={(c) => setAltText(c as string)}
        label="Alt text for image n"
      >
        <Image
          src={show ? src : "/no-image-here"}
          alt={altText}
          width={225}
          height={150}
        />
      </DemoComponent>
    </div>
  );
}
