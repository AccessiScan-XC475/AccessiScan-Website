import Link from "next/link";

export default function LargeNavElem({
  to,
  title,
  description,
}: {
  to: string;
  title: string;
  description: string;
}) {
  return (
    <Link href={to} className="p-4 m-2 flex flex-col items-center flex-1">
      <div className="large-nav-elem text-white font-bold text-5xl w-[90%] h-36 p-4 rounded-xl flex items-center justify-center">
        <p className="text-center">{title}</p>
      </div>
      <p className="p-1 m-2">{description}</p>
    </Link>
  );
}
