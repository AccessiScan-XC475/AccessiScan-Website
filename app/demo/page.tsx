import Link from "next/link";

export default function DemoSelectionPage() {
  const linkStyles = "hover:underline text-xl";
  return (
    <div>
      <h1 className="text-4xl">What would you like to work on?</h1>
      <div className="flex flex-col">
        <Link href="/demo/color-contrast" className={linkStyles}>
          Color Contrast
        </Link>
        <Link href="/demo/text-size" className={linkStyles}>
          Text Size
        </Link>
      </div>
    </div>
  );
}
