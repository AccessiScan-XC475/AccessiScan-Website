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
    accessibilityType: "General", 
  },
  {
    title: "Your Complete Guide to an Inclusive Web",
    description: "In this playlist, we cover all four principles of WCAG 2.1 - Perceivable, Operable, Understandable, and Robust - and their corresponding success criteria.",
    link: "https://www.youtube.com/playlist?list=PLBF3XTmgreLHH77gQOEa6xCCT2M0IWxo6",
    accessibilityType: "General", 
  },
  {
    title: "Understanding Accessibility: WCAG’s 13 Guidelines with Kasey Bonifacio",
    description: "Accessibility is critical, but it can be confusing. Kasey Bonafacio will demystify the 13 WCAG guidelines and show examples of each guideline in action, empowering you to improve accessibility in your projects.",
    link: "https://www.youtube.com/watch?v=RjpvOqZigao",
    accessibilityType: "General", 
  },
  {
    title: "Designing for Web Accessibility",
    description: "Web Design - Dyslexia, Autistic, Hearing, Low Vision, Anxiety",
    link: "https://www.youtube.com/watch?v=ou8kT9G5ZN4",
    accessibilityType: "General",
  },
];

const visualResources = [
  {
    title: "Make Your Images and Videos Accessible",
    description: "Learn how to use colors, select inclusive images, and design videos in accessible ways for your social media. This video will show you how to adapt posts for colorblind people and how to create accessible captions for videos, enhancing everyone’s experience.",
    link: "https://www.youtube.com/watch?v=FiB3203dwss",
    accessibilityType: "Visual", 
  },
  {
    title: "Understanding Accessible Fonts",
    description: "An accessible font means using a typeface designed for easy reading by a diverse audience, including individuals with visual impairments such as low vision or reading disability such as dyslexia. Accessible typography ensures that textual information is accessible to all users, irrespective of their abilities or disabilities.",
    link: "https://www.section508.gov/develop/fonts-typography/",
    accessibilityType: "Visual", 
  },
  {
    title: "Line Spacing",
    description: "Website designers recognize that low contrast can make it very difficult to read the words on a page. It’s even harder to read when the text is small or the font very thin. And if you have low vision, insufficient contrast can make it nearly impossible to make out the words on a Web page.",
    link: "https://www.wcag.com/designers/1-4-3-color-contrast/",
    accessibilityType: "Visual", 
  },
]

export default function HomePage() {
  const [selection, setSelection] = useState("");

  return (
    <div className="flex flex-col items-center px-4 md:px-8 lg:px-16 py-8">
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
          <div className="flex flex-wrap justify-start items-stretch">
            {overviewResources.map((resource, index) => (
              <ResourceCard
                key={index}
                title={resource.title}
                description={resource.description}
                link={resource.link}
                accessibilityType={resource.accessibilityType} // Pass image URL if available
              />
            ))}
          </div>
          <h3>Visual Accessibility</h3>
          <div className="flex flex-wrap justify-start items-stretch">
            {visualResources.map((resource, index) => (
              <ResourceCard
                key={index}
                title={resource.title}
                description={resource.description}
                link={resource.link}
                accessibilityType={resource.accessibilityType} // Pass image URL if available
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
