import Link from "next/link";

export default function DemoSelectionPage() {
  const linkStyles = "hover:underline";
  return (
    <div>
      <p>Choose the type of accessibility you would like to work on.</p>
      <div>
        <Link href="/demo/color-contrast" className={linkStyles}>
          Color Contrast
        </Link>
      </div>
    </div>
  );
}
