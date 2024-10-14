import Link from "next/link";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link href={href} className="p-1 m-2 text-lg hover:underline transition-all">
    {children}
  </Link>
);

const Header = () => (
  <header className="flex w-full justify-between items-center my-2 mx-4 py-1 px-4">
    <Link href="/" className="text-4xl">
      AccessiScan
    </Link>
    <nav>
      <NavLink href="/results">Results</NavLink>
      <NavLink href="/community">Community</NavLink>
      <NavLink href="/about">About</NavLink>
    </nav>
  </header>
);

export default Header;
