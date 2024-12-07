import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="w-full flex"
      style={{
        flexDirection: "column",
        alignItems: "center",
        border: "5px solid transparent",
        borderImage:
          "linear-gradient(45deg, #1b6aaa, #54bd86, #9b8bf4, #8babf1) 1",
        borderImageSlice: 1,
        height: "200px",
        paddingTop: "30px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          marginBottom: "40px",
        }}
      >
        <Link href="/about" target="_blank" rel="noopener noreferrer">
          About Us
        </Link>
        <Link href="/faq" target="_blank" rel="noopener noreferrer">
          FAQ
        </Link>
        <Link href="/AccessiScan Terms of Service.pdf" target="_blank" rel="noopener noreferrer">
          Terms of Service
        </Link>
        <Link href="/AccessiScan Privacy Policy.pdf" target="_blank" rel="noopener noreferrer">
          Privacy
        </Link>
        <Link href="/AccessiScan Code of Conduct.pdf" target="_blank" rel="noopener noreferrer">
          Code of Conduct
        </Link>
        <Link href="https://github.com/AccessiScan-XC475" target="_blank" rel="noopener noreferrer">
          GitHub
        </Link>
      </div>
      <Image
        src="/AccessiScan-logo.png"
        alt="AccessiScan logo"
        height={75.585}
        width={225}
      />
    </footer>
  );
}
