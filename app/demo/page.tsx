import Link from "next/link";

export default function DemoSelectionPage() {
  const linkStyles = "text-2xl p-3 m-1 transition-all";
  return (
    <div className="flex flex-col items-center m-1 p-6">
      <h1 className="text-4xl font-bold m-4 text-[#1B6AAA]">
        What would you like to work on?
      </h1>
      <p className="text-2xl m-2 text-center">
        Once you’ve installed the Chrome extension, use one of these scanners to test specific accessibility features and get actionable feedback based on WCAG guidelines.
      </p>
      <div className="grid grid-cols-2 gap-6 mt-6">
        <Link href="/demo/color-contrast" className={linkStyles}>
          <div
            className="flex flex-col items-center"
            style={{
              padding: "20px",
              borderRadius: "15px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Adds shadow effect
              backgroundColor: "#ffffff", // Optional background color
            }}
          >
            <div
              style={{
                display: "block",
                width: "250px",
                borderRadius: "30px",
                padding: "3px",
                background: "linear-gradient(45deg, #1b6aaa, #54bd86, #9b8bf4, #8babf1)",
              }}
            >
              <button
                style={{
                  fontSize: "16pt",
                  fontFamily: "'Lexend', sans-serif",
                  fontWeight: 500,
                  color: "#1b6aaa",
                  borderRadius: "30px",
                  backgroundColor: "#ffffff",
                  border: "none",
                  width: "100%",
                  padding: "10px 20px",
                }}
              >
                Contrasting Colors
              </button>
            </div>
            <p className="mt-2 text-center text-gray-600">
              This scanner reveals text that’s hard to read against its 
              background and evaluates whether your color choices meet WCAG 2.1 
              standards. Perfect for ensuring accessibility with contrast ratios 
              of 4.5:1 for regular text and 3:1 for larger text!
            </p>
          </div>
        </Link>

        <Link href="/demo/alt-text" className={linkStyles}>
          <div
            className="flex flex-col items-center"
            style={{
              padding: "20px",
              borderRadius: "15px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Adds shadow effect
              backgroundColor: "#ffffff",
            }}
          >
            <div
              style={{
                display: "block",
                width: "250px",
                borderRadius: "30px",
                padding: "3px",
                background: "linear-gradient(45deg, #1b6aaa, #54bd86, #9b8bf4, #8babf1)",
              }}
            >
              <button
                style={{
                  fontSize: "16pt",
                  fontFamily: "'Lexend', sans-serif",
                  fontWeight: 500,
                  color: "#1b6aaa",
                  borderRadius: "30px",
                  backgroundColor: "#ffffff",
                  border: "none",
                  width: "100%",
                  padding: "10px 20px",
                }}
              >
                Labeled Images
              </button>
            </div>
            <p className="mt-2 text-center text-gray-600">
              Ever wonder how screen readers interpret your images? This scanner 
              checks if your images include descriptive alt text, helping you meet
               WCAG 1.1.1 standards and ensure your visuals are accessible to everyone.
            </p>
          </div>
        </Link>

        <Link href="/demo/text-size" className={linkStyles}>
          <div
            className="flex flex-col items-center"
            style={{
              padding: "20px",
              borderRadius: "15px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Adds shadow effect
              backgroundColor: "#ffffff",
            }}
          >
            <div
              style={{
                display: "block",
                width: "250px",
                borderRadius: "30px",
                padding: "3px",
                background: "linear-gradient(45deg, #1b6aaa, #54bd86, #9b8bf4, #8babf1)",
              }}
            >
              <button
                style={{
                  fontSize: "16pt",
                  fontFamily: "'Lexend', sans-serif",
                  fontWeight: 500,
                  color: "#1b6aaa",
                  borderRadius: "30px",
                  backgroundColor: "#ffffff",
                  border: "none",
                  width: "100%",
                  padding: "10px 20px",
                }}
              >
                Text Size
              </button>
            </div>
            <p className="mt-2 text-center text-gray-600">
              Is your text big enough for everyone? Use this scanner to test 
              if your text meets WCAG standards for size by checking if it’s at 
              least 16px for regular text. Make your content better by making it 
              effortlessly readable!
            </p>
          </div>
        </Link>

        <Link href="/demo/line-spacing" className={linkStyles}>
          <div
            className="flex flex-col items-center"
            style={{
              padding: "20px",
              borderRadius: "15px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Adds shadow effect
              backgroundColor: "#ffffff",
            }}
          >
            <div
              style={{
                display: "block",
                width: "250px",
                borderRadius: "30px",
                padding: "3px",
                background: "linear-gradient(45deg, #1b6aaa, #54bd86, #9b8bf4, #8babf1)",
              }}
            >
              <button
                style={{
                  fontSize: "16pt",
                  fontFamily: "'Lexend', sans-serif",
                  fontWeight: 500,
                  color: "#1b6aaa",
                  borderRadius: "30px",
                  backgroundColor: "#ffffff",
                  border: "none",
                  width: "100%",
                  padding: "10px 20px",
                }}
              >
                Line Spacing
              </button>
            </div>
            <p className="mt-2 text-center text-gray-600">
              Crowded or poorly spaced text can ruin readability. This scanner 
              highlights line spacing issues and ensures compliance with WCAG 
              1.4.12—think 1.5x line spacing and 2x between paragraphs for a clean, 
              accessible layout.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
