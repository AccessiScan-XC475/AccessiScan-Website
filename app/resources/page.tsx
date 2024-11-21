import overview from "@/resources/overviewResources.json";
import visual from "@/resources/visualResources.json";
import audio from "@/resources/audioResources.json";
import mobility from "@/resources/mobilityResources.json";
import ResourcesSection from "@/components/resources/resourcesSection";

export default function ResourcesPage() {
  return (
    <div className="flex flex-col items-center px-4 md:px-8 lg:px-16 py-8">
      <div>
        <h2 className="relative text-[#1B6AAA] justify text-4xl font-bold pb-2 mb-1">
          Resources
        </h2>
        <ResourcesSection
          name="Accessibility Overview"
          resources={overview.overviewResources}
        />
        <ResourcesSection
          name="Visual Accessibility"
          resources={visual.visualResources}
        />
        <ResourcesSection
          name="Audio Accessibility"
          resources={audio.audioResources}
        />
        <ResourcesSection
          name="Mobility Accessibility"
          resources={mobility.mobilityResources}
        />
      </div>
    </div>
  );
}
