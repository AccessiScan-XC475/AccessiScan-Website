import React from "react";
import { Card, CardContent, Typography, Button, Chip } from "@mui/material";
import { OpenInNew } from "@mui/icons-material";

interface ResourceCardProps {
  title: React.ReactNode;
  description: string;
  link: string;
  accessibilityType: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  description,
  link,
  accessibilityType,
}) => {
  return (
    <Card
      className="m-4 w-full md:w-1/3 lg:w-1/4"
      style={{
        backgroundColor: "var(--card-background)",
        color: "var(--card-text)",
      }}
    >
      <CardContent
        style={{
          fontSize: "16pt",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <div>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ fontSize: "16pt", color: "var(--card-text)" }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ fontSize: "14pt", color: "var(--card-text)" }}
          >
            {description}
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
            }}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More <OpenInNew sx={{ padding: "2px" }} />
          </Button>
          <Chip
            label={accessibilityType}
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
