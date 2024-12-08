import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="w-full flex"
      style={{
        flexDirection: "column",
        alignItems: "center",
        borderTop: "3px solid transparent",
        borderImage:
          "linear-gradient(45deg, #1b6aaa, #54bd86, #9b8bf4, #8babf1) 1",
        borderImageSlice: 1,
        height: "fit-content",
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <Link href="/about" target="_blank" rel="noopener noreferrer">
          About Us
        </Link>
        <Link href="/faq" target="_blank" rel="noopener noreferrer">
          FAQ
        </Link>
        <Link
          href="/AccessiScan Terms of Service.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms of Service
        </Link>
        <Link
          href="/AccessiScan Privacy Policy.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy
        </Link>
        <Link
          href="/AccessiScan Code of Conduct.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Code of Conduct
        </Link>
        <Link
          href="https://github.com/AccessiScan-XC475"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </Link>
      </div>
      <Image
        src="/updated_logo_horizontal.png"
        alt="AccessiScan logo"
        height={75.585}
        width={225}
      />
    </footer>
  );
}
