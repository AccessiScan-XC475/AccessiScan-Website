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
    more: "learn more",
  },
  {
    icon: <Visibility />,
    title: " Demo",
    description:
      "Once you’ve installed the AccessiScan Chrome Extension, test it out using these demo pages.",
    more: "learn more",
  },
  {
    icon: <Group />,
    title: " Community",
    description:
      "Post questions about accessibility and receive help from other developers in the community.",
    more: "learn more",
  },
  {
    icon: <AccountCircle />,
    title: " Profile",
    description:
      "Track your progress by viewing your AccessiScan score history.",
    more: "learn more",
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
        <div className="flex-1 flex items-center justify-center shadow-lg">
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
          <h2 className="text-secondary font-semibold">Real-time accessibility analysis</h2>
          <p>Scan your website on your localhost, or deployed version, and 
          receive near instant feedback on how accessible it is.</p>
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

      {/* Detailed Scores Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-5 gap-0">
        {/* Left Visual */}
        <div className="flex-1 flex items-center justify-center shadow-lg">
        <Image
          src="/scan_textsize.png"
          alt="AccessiScan logo"
          height={100.78}
          width={300}
        />
        </div>
        {/* Right Text */}
        <div className="flex-1">
          <h2 className="text-secondary font-semibold">Detailed accessibility scores and suggestions for improvement</h2>
          <p>When you scan your website, we provide you a score for each accessibility type, and an brief 
          explanation on how you can improve your score.</p>
        </div>
      </section>
  
      {/* Accessibility in Tech Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-5 gap-0">
        {/* Left Text */}
        <div className="flex-1">
          <h2 className="text-secondary font-semibold">Learn about accessibility in technology</h2>
          <p>Our resources page contains videos, articles, and documentation on what it means for technology to be accessible, 
            and how to implement it in your own projects.</p>
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

      {/* Scan on Localhost Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-5 gap-0">
        {/* Left Visual */}
        <div className="flex-1 flex items-center justify-center shadow-lg">
        <Image
          src="/scan_textsize.png"
          alt="AccessiScan logo"
          height={100.78}
          width={300}
        />
        </div>
        {/* Right Text */}
        <div className="flex-1">
          <h2 className="text-secondary font-semibold">Improve the accessibility of your website before deployment</h2>
          <p>The AccessiScan Chrome Extension can scan your website from a localhost -- meaning that you can check how accessible 
            your website is while you are developing it. No need to wait until you deploy or publish your website to start thinking 
            about how to make it accessible.</p>
        </div>
      </section>

      {/* Reach broader audiences */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-5 gap-0">
        {/* Left Text */}
        <div className="flex-1">
          <h2 className="text-secondary font-semibold">Reach broader audiences</h2>
          <p>By using AccessiScan you will learn how to make your websites accessible to broader audiences.</p>
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
        <div className="flex-1 flex items-center justify-center shadow-lg">
        <Image
          src="/scan_textsize.png"
          alt="AccessiScan logo"
          height={100.78}
          width={300}
        />
        </div>
        {/* Right Text */}
        <div className="flex-1">
          <h2 className="text-secondary font-semibold">Join a community</h2>
          <p>Participate in the community by posting your accessibility related questions, replying to others, 
            and up-voting helpful posts!</p>
        </div>
      </section>

      {/* Split Layout Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-5 gap-0 bg-gray-50">
        {/* Left Content */}
        <div className="flex-1">
          <h2
            className="text-3xl font-bold text-gray-800 mb-6"
            style={{ color: "#1B6AAA" }}
          >
            Simplify Web Accessibility
          </h2>
          <p
            className="text-gray-600 text-lg mb-6"
            style={{ color: "#54BD86" }}
          >
            With AccessiScan, you can identify accessibility issues and ensure
            your website is inclusive for everyone.
          </p>
          <ul
            className="list-disc list-inside text-gray-600 space-y-3"
            style={{ color: "black" }}
          >
            <li>Real-time accessibility analysis</li>
            <li>Color contrast and text accessibility highlights</li>
            <li>Detailed accessibility scores and suggestions</li>
          </ul>
        </div>

        {/* Right Visual */}
        
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-16 px-6 md:px-16">
        <h3
          className="text-3xl font-bold text-center text-gray-800 mb-8"
          style={{ color: "#1B6AAA" }}
        >
          Explore Our Additional Services
        </h3>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Resources Page */}
          <div className="w-full md:w-1/3 bg-white p-6 shadow rounded-lg">
            <div className="flex items-center space-x-4">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">
                Resources Page
              </h4>
            </div>
            <p className="text-gray-600 text-lg mb-4">
              Our <strong>Resources Page</strong> provides a variety of links to
              external sources and in-depth guides about the accessibility
              features our scanner checks for. Learn more about important topics
              like color contrast, text size, labeled images, and line spacing
              to further improve your web accessibility knowledge.
            </p>
            <a href="/resources" className="text-[#54BD86] font-bold">
              Explore Resources
            </a>
          </div>

          {/* Demo Page */}
          <div className="w-full md:w-1/3 bg-white p-6 shadow rounded-lg">
            <div className="flex items-center space-x-4">
              <Visibility style={{ color: "#54BD86" }} />
              <h4 className="text-xl font-semibold text-gray-800 mb-4">
                Interactive Demo Pages
              </h4>
            </div>
            <p className="text-gray-600 text-lg mb-4">
              Our <strong>Demo Pages</strong> offer interactive experiences for
              each scanning function. These pages are designed to show users how
              to use the scanners and visually demonstrate what accessible
              features like color contrast, text size, line spacing, and labeled
              images should look like on a website.
            </p>
            <a href="/demo" className="text-[#54BD86] font-bold">
              Try the Demo
            </a>
          </div>

          {/* Community Board */}
          <div className="w-full md:w-1/3 bg-white p-6 shadow rounded-lg">
            <div className="flex items-center space-x-4">
              <Group style={{ color: "#54BD86" }} />
              <h4 className="text-xl font-semibold text-gray-800 mb-4">
                Community Board
              </h4>
            </div>
            <p className="text-gray-600 text-lg mb-4">
              Join our <strong>Community Board</strong> to interact with other
              users, get inspiration, ask for help, and share your experiences.
              A space where you can engage in meaningful discussions about
              accessibility and learn from each other.
            </p>
            <Link href="/community" className="text-[#54BD86] font-bold">
              Join the Community
            </Link>
          </div>

          {/* Profile Page */}
          <div className="w-full md:w-1/3 bg-white p-6 shadow rounded-lg">
            <div className="flex items-center space-x-4">
              <AccountCircle style={{ color: "#54BD86" }} />
              <h4 className="text-xl font-semibold text-gray-800 mb-4">
                Profile Page
              </h4>
            </div>
            <p className="text-gray-600 text-lg mb-4">
              The <strong>Profile Page</strong> lets users log in with their
              GitHub accounts and track their scan history. Keep track of your
              progress, see how your accessibility score evolves, and stay
              motivated as you improve your website&apos;s accessibility.
            </p>
            <Link href="/profile" className="text-[#54BD86] font-bold">
              Access Your Profile
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
