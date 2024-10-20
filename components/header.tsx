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
    <Button variant="contained" className="nav-item">
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
          <NavLink href="/results">Results</NavLink>
        </li>
        <li>
          <NavLink href="/community">Community</NavLink>
        </li>
        <li>
          <NavLink href="/about">About</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
