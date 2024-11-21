import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-screen flex justify-around">
      <Link href="/api/logout">Logout</Link>
      <Link href="/about">About Us</Link>
    </footer>
  );
}
