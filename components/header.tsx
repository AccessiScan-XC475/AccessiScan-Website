"use client";
import Link from "next/link";
import { Button } from "@mui/material";
import Image from "next/image";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link href={href} passHref>
    <div
      style={{
        display: "inline-block",
        borderRadius: "30px", 
        padding: "3px",
        background: "linear-gradient(45deg, #1b6aaa, #54bd86, #9b8bf4, #8babf1)",
      }}
    >
      <Button
        tabIndex={-1}
        variant="contained"
        sx={{
          fontSize: "16pt",
          fontFamily: "'Lexend', sans-serif",
          fontWeight: 400,
          color: "#1b6aaa",
          borderRadius: "30px", 
          backgroundColor: "#ffffff", 
          border: "none",
          textTransform: "none !important",
        }}
      >
        {children}
      </Button>
    </div>
  </Link>
);

const Header = () => {
  return (
    <header className="top-header">
      <Link
        href="/"
        // className="home-title rounded-xl hover:shadow-[0_10px_10px_0_rgba(84,189,134,0.4)] transition-all"
        className="home-title rounded-xl"
      >
        <Image
          src="/AccessiScan-logo.png"
          alt="AccessiScan logo"
          height={100.78}
          width={300}
        />
      </Link>
      <nav>
        <ul className="nav-links">
          <li>
            <NavLink href="/resources">Resources</NavLink>
          </li>
          <li>
            <NavLink href="/demo">Demo</NavLink>
          </li>
          <li>
            <NavLink href="/community">Community</NavLink>
          </li>
          <li>
            <NavLink href="/profile">Profile</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
