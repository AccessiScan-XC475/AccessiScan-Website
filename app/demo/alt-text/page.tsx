import AltTextSection from "@/components/demo/alt-text-section";

function successfulImage() {
  return Math.random() < 0.6; // 60% success rate
}

export default function AltTextDemoPage() {
  return (
    <div className="w-full flex pb-8">
      <div className="w-1/5"></div>
      <div className="w-3/5 flex flex-col items-center">
        <div className="text-center p-3">
          <h1 className="text-5xl p-1 text-black">Alt Text Demo</h1>
          <p className="p-1 text-lg">
            Here are some images of our team and our logo. Ensure all images
            have alt text. Some images will randomly fail to display.
          </p>
        </div>
        <div>
          <div className="flex">
            <AltTextSection
              src="/AccessiScan-logo.png"
              show={successfulImage()}
            />
            <AltTextSection src="/amelia.jpg" show={successfulImage()} />
            <AltTextSection src="/josie.jpg" show={successfulImage()} />
          </div>
          <div className="flex">
            <AltTextSection src="/jeffrey.png" show={successfulImage()} />
            <AltTextSection src="/ethan.jpg" show={successfulImage()} />
            <AltTextSection src="/hangi.jpg" show={successfulImage()} />
          </div>
        </div>
      </div>
    </div>
  );
}
