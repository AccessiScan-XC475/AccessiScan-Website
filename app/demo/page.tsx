import Link from "next/link";

export default function DemoSelectionPage() {
  const linkStyles = "hover:underline text-2xl p-3 m-1 transition-all";
  return (
    <div className="flex flex-col items-center m-1 p-6">
      <h1 className="text-4xl font-medium m-2 p-3 text-[#1B6AAA]">
        Which type of accessibility would you like to work on?
      </h1>
      <div className="grid grid-cols-2">
        <Link href="/demo/color-contrast" className={linkStyles}>
          Color Contrast
        </Link>
        <Link href="/demo/text-size" className={linkStyles}>
          Text Size
        </Link>
        <Link href="/demo/alt-text" className={linkStyles}>
          Alt Text
        </Link>
        <Link href="/demo/line-spacing" className={linkStyles}>
          Line Spacing
        </Link>
      </div>
    </div>
  );
}
