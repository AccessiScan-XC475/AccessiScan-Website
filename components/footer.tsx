import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="w-screen flex"
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
        <Link href="/api/logout">Logout</Link>
        <Link href="/about">About Us</Link>
        <Link href="/faq">FAQ</Link>
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
