import Link from "next/link";

export default function DemoSelectionPage() {
  const linkStyles = "text-2xl p-3 m-1 transition-all";
  return (
    <div className="flex flex-col items-center m-1 p-6">
      <h1 className="text-4xl font-medium m-2 p-3 text-[#1B6AAA]">
        Which type of accessibility would you like to work on?
      </h1>
      <div className="grid grid-cols-2 gap-4">
        <Link
          href="/demo/color-contrast"
          className={linkStyles}
        >
          <div
            style={{
              display: "inline-block",
              borderRadius: "30px",
              padding: "3px",
              background: "linear-gradient(45deg, #1b6aaa, #54bd86, #9b8bf4, #8babf1)",
            }}
          >
            <button
              style={{
                fontSize: "16pt",
                fontFamily: "'Lexend', sans-serif",
                fontWeight: 400,
                color: "#1b6aaa",
                borderRadius: "30px",
                backgroundColor: "#ffffff",
                border: "none",
                padding: "10px 20px",
              }}
            >
              Color Contrast
            </button>
          </div>
        </Link>
        <Link
          href="/demo/alt-text"
          className={linkStyles}
        >
          <div
            style={{
              display: "inline-block",
              borderRadius: "30px",
              padding: "3px",
              background: "linear-gradient(45deg, #1b6aaa, #54bd86, #9b8bf4, #8babf1)",
            }}
          >
            <button
              style={{
                fontSize: "16pt",
                fontFamily: "'Lexend', sans-serif",
                fontWeight: 400,
                color: "#1b6aaa",
                borderRadius: "30px",
                backgroundColor: "#ffffff",
                border: "none",
                padding: "10px 20px",
              }}
            >
              Labeled Images
            </button>
          </div>
        </Link>
        <Link
          href="/demo/text-size"
          className={linkStyles}
        >
          <div
            style={{
              display: "inline-block",
              borderRadius: "30px",
              padding: "3px",
              background: "linear-gradient(45deg, #1b6aaa, #54bd86, #9b8bf4, #8babf1)",
            }}
          >
            <button
              style={{
                fontSize: "16pt",
                fontFamily: "'Lexend', sans-serif",
                fontWeight: 400,
                color: "#1b6aaa",
                borderRadius: "30px",
                backgroundColor: "#ffffff",
                border: "none",
                padding: "10px 20px",
              }}
            >
              Text Size
            </button>
          </div>
        </Link>
        <Link
          href="/demo/line-spacing"
          className={linkStyles}
        >
          <div
            style={{
              display: "inline-block",
              borderRadius: "30px",
              padding: "3px",
              background: "linear-gradient(45deg, #1b6aaa, #54bd86, #9b8bf4, #8babf1)",
            }}
          >
            <button
              style={{
                fontSize: "16pt",
                fontFamily: "'Lexend', sans-serif",
                fontWeight: 400,
                color: "#1b6aaa",
                borderRadius: "30px",
                backgroundColor: "#ffffff",
                border: "none",
                padding: "10px 20px",
              }}
            >
              Line-Spacing
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}
