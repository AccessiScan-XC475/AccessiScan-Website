"use client";
import Link from "next/link";
import { Button } from "@mui/material";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link href={href} passHref>
    <Button
      tabIndex={-1}
      variant="contained"
      sx={{
        fontSize: "16pt",
        color: "#1b6aaa",
        borderRadius: "0px !important",
        backgroundColor: "transparent",
        border: "3px solid transparent",
        borderImage:
          "linear-gradient(45deg, #1b6aaa, #54bd86, #9b8bf4, #8babf1) 1",
        borderImageSlice: "1",
        textTransform: "none !important",
      }}
    >
      {children}
    </Button>
  </Link>
);

const Header = () => {
  return (
    <nav className="navbar">
      <Link href="/" className="home-title">
        AccessiScan
      </Link>
      <ul className="nav-links">
        <li>
          <NavLink href="/demo">DEMO</NavLink>
        </li>
        <li>
          <NavLink href="/community">COMMUNITY</NavLink>
        </li>
        <li>
          <NavLink href="/profile">PROFILE</NavLink>
        </li>
        <li>
          <NavLink href="/about">ABOUT</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
