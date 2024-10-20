"use client";
import { MenuItem, Select } from "@mui/material";
import { useState } from "react";
import ResourceCard from "@/components/resourceCard";

/* example */
const overviewResources = [
  {
    title: "What does accessibility mean?",
    description: "What does accessibility mean? How should we think about disability? And what role can design play in making your social media content accessible?",
    link: "https://www.youtube.com/watch?v=BQUIF4nBqOk&t=49s",
    imageUrl: "https://example.com/image1.jpg", // Replace with icon
  },
  {
    title: "Your Complete Guide to an Inclusive Web",
    description: "In this playlist, we cover all four principles of WCAG 2.1 - Perceivable, Operable, Understandable, and Robust - and their corresponding success criteria.",
    link: "https://www.youtube.com/playlist?list=PLBF3XTmgreLHH77gQOEa6xCCT2M0IWxo6",
    imageUrl: "https://example.com/image2.jpg", // Replace with your image URL
  },
  {
    title: "Understanding Accessibility: WCAG’s 13 Guidelines with Kasey Bonifacio",
    description: "Accessibility is critical, but it can be confusing. Kasey Bonafacio will demystify the 13 WCAG guidelines and show examples of each guideline in action, empowering you to improve accessibility in your projects.",
    link: "https://www.youtube.com/watch?v=RjpvOqZigao",
    imageUrl: "https://example.com/image3.jpg", // Replace with your image URL
  },
  {
    title: "Designing for Web Accessibility",
    description: "Web Design - Dyslexia, Autistic, Hearing, Low Vision, Anxiety",
    link: "https://www.youtube.com/watch?v=ou8kT9G5ZN4",
    imageUrl: "https://example.com/image3.jpg", // Replace with your image URL
  },
];

const visualResources = [
  {
    title: "Make Your Images and Videos Accessible",
    description: "Learn how to use colors, select inclusive images, and design videos in accessible ways for your social media. This video will show you how to adapt posts for colorblind people and how to create accessible captions for videos, enhancing everyone’s experience.",
    link: "https://www.youtube.com/watch?v=FiB3203dwss",
    imageUrl: "https://example.com/image3.jpg", // Replace with your image URL
  },
  {
    title: "Understanding Accessible Typography",
    description: "An accessible font means using a typeface designed for easy reading by a diverse audience, including individuals with visual impairments such as low vision or reading disability such as dyslexia. Accessible typography ensures that textual information is accessible to all users, irrespective of their abilities or disabilities.",
    link: "https://www.section508.gov/develop/fonts-typography/",
    imageUrl: "https://example.com/image3.jpg", // Replace with your image URL
  },
]

export default function HomePage() {
  const [selection, setSelection] = useState("");

  return (
    <div className="flex flex-col items-center">
      <h2 className="headline">Build a website better, together</h2>
      <h3 className="tagline">The most supportive community of developers</h3>
      <div className="flex flex-col items-center">
        <div className="flex items-center p-1 m-2">
          <p className="p-1">Choose your goal</p>
          <Select
            value={selection}
            label="Goal"
            className="w-32 p-0.25"
            onChange={(e) => setSelection(e.target.value)}
          >
            <MenuItem value={"visual"}>Visual</MenuItem>
            <MenuItem value={"audio"}>Audio</MenuItem>
            <MenuItem value={"mobility"}>Mobility</MenuItem>
          </Select>
        </div>
        <button
          onClick={() => {
            // sent to backend for statistics
            fetch(`/api/accessibility-selection?name=${selection}`, {
              method: "POST",
            });
          }}
          className="py-2 px-6 m-4 bg-green-500 rounded-xl"
        >
          Go!
        </button>
        <div>
          <h2 className="resources-title">Resources</h2>
          <h3>Accessibility Overview</h3>
          <div className="flex flex-wrap justify-center">
            {overviewResources.map((resource, index) => (
              <ResourceCard
                key={index}
                title={resource.title}
                description={resource.description}
                link={resource.link}
                imageUrl={resource.imageUrl} // Pass image URL if available
              />
            ))}
          </div>
          <h3>Visual Accessibility</h3>
          <div className="flex flex-wrap justify-center">
            {visualResources.map((resource, index) => (
              <ResourceCard
                key={index}
                title={resource.title}
                description={resource.description}
                link={resource.link}
                imageUrl={resource.imageUrl} // Pass image URL if available
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
