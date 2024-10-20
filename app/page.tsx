"use client";
import { MenuItem, Select } from "@mui/material";
import { useState } from "react";
import ResourceCard from "@/components/resourceCard";

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

const audioResources = [
  {
    title: "Make Your Text Accessible",
    description: "Learn about using alternative text to make your social media more accessible. We'll also show you how fonts impact legibility, and how to use emojis and hashtags to make your social media content more inclusive.",
    link: "https://www.youtube.com/watch?v=QHNVPlxpqKw",
    accessibilityType: "Audio", 
  },
  {
    title: "Web Accessibility Perspectives: Video Captions - Audio Described Version",
    description: "Importance of captions for videos",
    link: "https://www.youtube.com/watch?v=4qIordU8vT8",
    accessibilityType: "Audio", 
  },
  {
    title: "Crash Course: What is Deaf Accessibility?",
    description: "This 5 minute micro talk is a crash course on Deaf Accessibility in video games. During the talk, we will go over what deafness is; share how specific functional limitations apply to the context of games; provide most important UX and game design practices, including important tidbits for researchers who may be working with d/Deaf participants; and give recommended readings for those who would like to learn more.",
    link: "https://www.youtube.com/watch?v=2g7gKngJAgI",
    accessibilityType: "Audio", 
  },
  {
    title: "Labels and Headings that Offer Clear Direction",
    description: "A design that is logical and that has a nested heading structure is essential for accessibility. Descriptive headings help users find specific content and orient themselves in terms of where they are on a Web page and on the overall website. Visual headings also represent the content structure, and describe the content that follows them.",
    link: "https://www.wcag.com/authors/2-4-6-headings-and-labels/",
    accessibilityType: "Audio", 
  },
  {
    title: "Understanding Alt Text",
    description: "Designers ensure that images, graphics and other non-text information have alt text descriptions that clearly and succinctly describe their meaning. Alt text also serves the purpose of allowing screen readers to ignore images that are decorative and convey no meaning.",
    link: "https://www.wcag.com/designers/1-1-1-non-text-content/",
    accessibilityType: "Audio", 
  },
]

const mobilityResources = [
  {
    title: "Features for Mobility Impairments",
    description: "In this video, we provide developers with tips on making Android apps more accessible for users with motor impairments. We also discuss best practices for making your app easier to use and talk about testing for accessibility to improve your app's user experience for all users.",
    link: "https://www.youtube.com/watch?v=ElifzykHt7U",
    accessibilityType: "Mobility", 
  },
  {
    title: "Structuring Tab Flow in Logical Sequence",
    description: "The reading order should be logical and intuitive with clear focus indicators. People with mobility impairments who use keyboards only benefit from a logical, usable focus order. Reading also flows better for those who use assistive technology such as a screen magnifier, as they may interpret a field in the wrong context if the focus order isn’t logical.",
    link: "https://www.wcag.com/developers/2-4-3-focus-order/",
    accessibilityType: "Mobility", 
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
        </div>
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
                accessibilityType={resource.accessibilityType} 
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
                accessibilityType={resource.accessibilityType} 
              />
            ))}
          </div>
          <h3>Audio Accessibility</h3>
          <div className="flex flex-wrap justify-start items-stretch">
            {audioResources.map((resource, index) => (
              <ResourceCard
                key={index}
                title={resource.title}
                description={resource.description}
                link={resource.link}
                accessibilityType={resource.accessibilityType} 
              />
            ))}
          </div>
          <h3>Mobility Resources</h3>
          <div className="flex flex-wrap justify-start items-stretch">
            {mobilityResources.map((resource, index) => (
              <ResourceCard
                key={index}
                title={resource.title}
                description={resource.description}
                link={resource.link}
                accessibilityType={resource.accessibilityType} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
