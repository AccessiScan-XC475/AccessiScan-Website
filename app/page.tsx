"use client";
import DLExtension from "@/components/dlExtension"; // Adjust as needed
import { FilePresent, Visibility, Group, AccountCircle, ArrowForward } from "@mui/icons-material"; // Importing MUI icons
import Link from "next/link";
import "./globals.css";
import Image from "next/image";
import { Card, CardContent, Typography, Box } from "@mui/material";

const pages = [
  {
    icon: <FilePresent />,
    title: " Resources",
    description:
      "Learn about accessibility through our recommended resources.",
    more: "Explore Resources",
  },
  {
    icon: <Visibility />,
    title: " Demo",
    description:
      "Once you’ve installed the AccessiScan Chrome Extension, test it out using these demo pages.",
    more: "Try the Demo",
  },
  {
    icon: <Group />,
    title: " Community",
    description:
      "Post questions about accessibility and receive help from other developers in the community.",
    more: "Join the Community",
  },
  {
    icon: <AccountCircle />,
    title: " Profile",
    description:
      "Track your progress by viewing your AccessiScan score history.",
    more: "Access your Profile",
  },
];

export default function HomePage() {
  return (
    <div className="w-full min-h-screen">
      {/* Tagline Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 md:px-16 py-20">
        <h1
          className="text-4xl md:text-4xl font-extrabold leading-tight text-primary"
        >
          Build a Website Better, Together
        </h1>
        <p
          className="text-lg md:text-2xl text-gray-600 mt-6 max-w-2xl text-secondary"
        >
          Empowering developers to build accessible websites
        </p>
      </section>
      {/* Download and Image Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-5 gap-0">
        {/* Left Content */}
        <DLExtension />
        {/* Right Visual */}
        <div className="flex-1 flex items-center justify-center">
        <Image
          src="/scan_textsize.png"
          alt="AccessiScan logo"
          height={100.78}
          width={300}
        />
        </div>
      </section>
      {/* Pages Section */}
      <section >
      <Box
        sx={{
          display: "flex", 
          flexDirection: "row", 
          justifyContent: "space-around", 
          alignItems: "center", 
          gap: "10px", 
          flexWrap: "wrap", // Allow wrapping for smaller screens
          padding: "20px",
        }}
      >
        {pages.map((page, index) => (
          <Card
            key={index}
            sx={{
              backgroundColor: "#f9f9f9",
              border: "1px solid #e0e0e0",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              width: "300px",
              height: "300px",
              display: "flex", 
              flexDirection: "column", 
              justifyContent: "space-between", 
              alignItems: "center",
              textAlign: "left",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                className="text-secondary font-bold"
                sx={{
                  fontSize: "18pt",
                  fontWeight: "bold",
                }}
                gutterBottom
              >
                {page.icon}
                {page.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "16pt",
                  lineHeight: "1.8",
                }}
              >
                {page.description}
              </Typography>
              <Typography
                variant="body2"
                className="text-primary text-align-bottom"
                sx={{
                  fontSize: "16pt",
                  lineHeight: "1.8",
                  textAlign: "right",
                }}
              >
                {page.more}
                <ArrowForward />
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      </section>
      {/* Why use AccessiScan section */}
      <section className="flex flex-col items-center justify-center text-center px-6 md:px-16 py-20">
      <h3
          className="text-4xl md:text-4xl font-semibold leading-tight text-primary"
        >
          Why use AccessiScan?
        </h3>
      </section>
      
      {/* Real-time accessibility analysis */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-5 gap-0">
        {/* Left Text */}
        <div className="flex-1">
          <h2 className="text-secondary font-semibold text-3xl">Real-time accessibility analysis</h2>
          <p className="text-lg mt-2">Scan your website on your localhost, or deployed version, and 
          receive near instant feedback on how accessible it is.</p>
        </div>
        {/* Right Visual */}
        <div className="flex-1 flex items-center justify-center">
        <Image
          src="/full_scan_textsize.png"
          alt="AccessiScan logo"
          height={201.56}
          width={600}
        />
        </div>
      </section>

      {/* Detailed Scores Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-5 gap-0">
        {/* Left Visual */}
        <div className="flex-1 flex items-center justify-center shadow-lg">
        <Image
          src="/scan_textsize.png"
          alt="Screenshot of scanning our demo page for text size"
          height={100.78}
          width={300}
        />
        </div>
        {/* Right Text */}
        <div className="flex-1">
          <h2 className="text-secondary font-semibold text-3xl">Detailed accessibility scores and suggestions for improvement</h2>
          <p className="text-lg mt-2">When you scan your website, we provide you a score for each accessibility type, and an brief 
          explanation on how you can improve your score.</p>
        </div>
      </section>
  
      {/* Learn Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-5 gap-0">
        {/* Left Text */}
        <div className="flex-1">
          <h2 className="text-secondary font-semibold text-3xl">Learn about accessibility in technology</h2>
          <p className="text-lg mt-2">Our resources page contains videos, articles, and documentation on what it means for technology to be accessible, 
            and how to implement it in your own projects.</p>
        </div>
        {/* Right Visual */}
        <div className="flex-1 flex items-center justify-center">
        <Image
          src="/resources.png"
          alt="Screenshot of the resources page"
          height={201.56}
          width={600}
        />
        </div>
      </section>

      {/* Scan on Localhost Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-5 gap-0">
        {/* Left Visual */}
        <div className="flex-1 flex items-center justify-center">
        <Image
          src="/scan_localhost.png"
          alt="Screenshot of scanning on localhost"
          height={201.56}
          width={600}
        />
        </div>
        {/* Right Text */}
        <div className="flex-1">
          <h2 className="text-secondary font-semibold text-3xl">Improve the accessibility of your website before deployment</h2>
          <p className="text-lg mt-2">The AccessiScan Chrome Extension can scan your website from a localhost -- meaning that you can check how accessible 
            your website is while you are developing it. No need to wait until you deploy or publish your website to start thinking 
            about how to make it accessible.</p>
        </div>
      </section>

      {/* Reach broader audiences */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-5 gap-0">
        {/* Left Text */}
        <div className="flex-1">
          <h2 className="text-secondary font-semibold text-3xl">Reach broader audiences</h2>
          <p className="text-lg mt-2">By using AccessiScan you will learn how to make your websites accessible to broader audiences.</p>
        </div>
        {/* Right Visual */}
        <div className="flex-1 flex items-center justify-center shadow-lg">
        <Image
          src="/scan_textsize.png"
          alt="AccessiScan logo"
          height={100.78}
          width={300}
        />
        </div>
      </section>

      {/* Join a Community */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-5 gap-0">
        {/* Left Visual */}
        <div className="flex-1 flex items-center justify-center">
        <Image
          src="/community_post.png"
          alt="Screenshot of a post on the community board"
          height={201.56}
          width={600}
        />
        </div>
        {/* Right Text */}
        <div className="flex-1">
          <h2 className="text-secondary font-semibold text-3xl">Join a community</h2>
          <p className="text-lg mt-2">Participate in the community by posting your accessibility related questions, replying to others, 
            and up-voting helpful posts!</p>
        </div>
      </section>

    </div>
  );
}
