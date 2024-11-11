"use client";
import ResourceCard from "@/components/resourceCard";
import VideoIcon from "@mui/icons-material/VideoLibrary"; // Import Video Icon
import DescriptionIcon from "@mui/icons-material/Description"; // Import Document Icon
import { overviewResources } from "@/resources/overviewResources.json";
import { visualResources } from "@/resources/visualResources.json";
import { audioResources } from "@/resources/audioResources.json";
import { mobilityResources } from "@/resources/mobilityResources.json";

export default function HomePage() {
  const h3Styles = { fontSize: "16pt", color: "#8275C9", fontWeight: 700 };

  const getIconAndLabel = (link: string) => {
    if (link.includes("youtube")) {
      return { icon: <VideoIcon />, label: "Video: " };
    } else {
      return { icon: <DescriptionIcon />, label: "Document: " };
    }
  };

  return (
    <div className="flex flex-col items-center px-4 md:px-8 lg:px-16 py-8">
      <h2 style={{ color: "#54BD86", fontSize: "24pt", fontWeight: 800 }}>
        Build a website better, together
      </h2>
      <h3 style={{ color: "#1B6AAA", fontSize: "16pt" }}>
        The most supportive community of developers
      </h3>
      <div className="flex flex-col items-center">
        <div className="flex items-center p-1 m-2"></div>
        <div>
          <h2
            style={{
              color: "#1b6aaa",
              fontSize: "20pt",
              justifyContent: "left",
              position: "relative",
              fontWeight: 700,
            }}
          >
            Resources
          </h2>
          <h3 style={h3Styles}>Accessibility Overview</h3>
          <div className="flex flex-wrap justify-start items-stretch">
            {overviewResources.map((resource, index) => {
              const { icon, label } = getIconAndLabel(resource.link);
              return (
                <ResourceCard
                  key={index}
                  title={
                    <>
                      {icon}
                      <span style={{ marginLeft: "8px" }}>{label}</span>
                      {resource.title}
                    </>
                  }
                  description={resource.description}
                  link={resource.link}
                  accessibilityType={resource.accessibilityType}
                />
              );
            })}
          </div>
          <h3 style={h3Styles}>Visual Accessibility</h3>
          <div className="flex flex-wrap justify-start items-stretch">
            {visualResources.map((resource, index) => {
              const { icon, label } = getIconAndLabel(resource.link);
              return (
                <ResourceCard
                  key={index}
                  title={
                    <>
                      {icon}
                      <span style={{ marginLeft: "8px" }}>{label}</span>
                      {resource.title}
                    </>
                  }
                  description={resource.description}
                  link={resource.link}
                  accessibilityType={resource.accessibilityType}
                />
              );
            })}
          </div>
          <h3 style={h3Styles}>Audio Accessibility</h3>
          <div className="flex flex-wrap justify-start items-stretch">
            {audioResources.map((resource, index) => {
              const { icon, label } = getIconAndLabel(resource.link);
              return (
                <ResourceCard
                  key={index}
                  title={
                    <>
                      {icon}
                      <span style={{ marginLeft: "8px" }}>{label}</span>
                      {resource.title}
                    </>
                  }
                  description={resource.description}
                  link={resource.link}
                  accessibilityType={resource.accessibilityType}
                />
              );
            })}
          </div>
          <h3 style={h3Styles}>Mobility Resources</h3>
          <div className="flex flex-wrap justify-start items-stretch">
            {mobilityResources.map((resource, index) => {
              const { icon, label } = getIconAndLabel(resource.link);
              return (
                <ResourceCard
                  key={index}
                  title={
                    <>
                      {icon}
                      <span style={{ marginLeft: "8px" }}>{label}</span>
                      {resource.title}
                    </>
                  }
                  description={resource.description}
                  link={resource.link}
                  accessibilityType={resource.accessibilityType}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

