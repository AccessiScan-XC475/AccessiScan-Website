import AccessibilitySelection from "@/components/accessibility-selection";
import Image from "next/image";
import LargeNavElem from "@/components/large-nav-elem";

export default function HomePage() {
  return (
    <div className="bg-gray-200">
      <div className="bg-emerald-300 min-h-40 relative top-40">
        <div className="relative left-6">
          <Image
            src="/favicon.ico"
            alt="AccessiScan Logo"
            width={200}
            height={200}
          />
        </div>
        <div className="work-sans text-white p-2 ml-14">
          <h2 className="text-5xl font-black">
            Build your website better, together
          </h2>
          <h3>The most supportive community of developers</h3>
        </div>
      </div>
      <div className="relative top-60 flex">
        <LargeNavElem
          to="/community"
          title="Community"
          description="Our community board enables you to collobate with and receive feedback from other users, letting you build a better application"
        />
        <LargeNavElem
          to="/q-and-a"
          title="Q&A"
          description="You can always ask any question about using our service"
        />
        <LargeNavElem
          to="/about"
          title="About Us"
          description="Learn about our team and feel free to reach out with any questions you may have regarding our product"
        />
      </div>
      {/*<AccessibilitySelection />*/}
    </div>
  );
}
