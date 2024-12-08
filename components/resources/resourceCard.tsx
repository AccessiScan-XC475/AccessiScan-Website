import { Card, CardContent, Typography, Button, Chip } from "@mui/material";
import VideoIcon from "@mui/icons-material/VideoLibrary"; // Import Video Icon
import DescriptionIcon from "@mui/icons-material/Description"; // Import Document Icon
import { OpenInNew } from "@mui/icons-material";

export type ResourceCardProps = {
  title: string;
  description: string;
  link: string;
  accessibilityType: string;
};

const ResourceCard = ({ resource }: { resource: ResourceCardProps }) => {
  const getIconAndLabel = (link: string) => {
    if (link.includes("youtube")) {
      return { icon: <VideoIcon />, label: "Video: " };
    } else {
      return { icon: <DescriptionIcon />, label: "Document: " };
    }
  };
  const { icon, label } = getIconAndLabel(resource.link);

  return (
    <Card
      className="m-4 w-full md:w-1/3 lg:w-1/4 shadow-lg"
      style={{
        backgroundColor: "#F8F8F8",
        color: "var(--card-text)",
        borderRadius: "10px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        borderWidth: "thin",
        borderColor: "#E7E7E7"
      }}
    >
      <CardContent
        style={{
          fontSize: "16pt",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          lineHeight: "2.0"
        }}
      >
        <div>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ fontSize: "18pt", color: "var(--card-text)", fontFamily: '"Lexend", sans-serif', fontWeight: "bold" }}
          >
            {icon}
            <span style={{ marginLeft: "8px", fontFamily: '"Lexend", sans-serif'}}>{label}</span>
            {resource.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ fontSize: "16pt", color: "var(--card-text)", fontFamily: '"Lexend", sans-serif' }}
          >
            {resource.description}
          </Typography>
        </div>
        <div className="flex flex-col items-start mt-4">
          <Button
            size="small"
            sx={{
              "&:hover": {
                textDecorationLine: "underline",
              },
              color: "var(--primary-color)",
              marginTop: "10px",
              fontSize: "16pt",
              fontFamily: '"Lexend", sans-serif',
            }}
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More <OpenInNew sx={{ padding: "2px" }} />
          </Button>
          <Chip
            label={resource.accessibilityType}
            sx={{
              backgroundColor: "#54BD86",
              color: "white",
              fontSize: "16pt",
            }}
            className="mt-2"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceCard;
