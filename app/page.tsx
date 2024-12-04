"use client";
import DLExtension from "@/components/dlExtension"; // Adjust as needed
import { Book, Visibility, Group, AccountCircle } from "@mui/icons-material"; // Importing MUI icons
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 md:px-16 py-20">
        <h1
          className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight"
          style={{ color: "#1B6AAA" }}
        >
          Build a Website Better, Together
        </h1>
        <p
          className="text-lg md:text-2xl text-gray-600 mt-6 max-w-2xl"
          style={{ color: "#54BD86" }}
        >
          Empowering developers for accessible websites
        </p>
        <DLExtension />
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
        <div className="flex-1">
          <img
            src="/images/demo-image.png" // Replace with your image path
            alt="Accessibility Demo"
            className="rounded-lg shadow-lg"
          />
        </div>
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
              <Book style={{ color: "#54BD86" }} />
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
