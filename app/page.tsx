"use client";
import DLExtension from "@/components/dlExtension";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center px-4 md:px-8 lg:px-16 py-8">
      <h2 style={{ color: "#1B6AAA", fontSize: "24pt", fontWeight: 800 }}>
        Build a website better, together
      </h2>
      <h3 style={{ color: "#7468B6", fontSize: "16pt" }}>
        Empowering developers for accessible websites
      </h3>
      <DLExtension />
    </div>
  );
}
