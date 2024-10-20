import React from "react";
import { Card, CardContent, Typography, Button, Chip } from "@mui/material";

interface ResourceCardProps {
  title: string;
  description: string;
  link: string;
  accessibilityType: string; 
}

const ResourceCard: React.FC<ResourceCardProps> = ({ title, description, link, accessibilityType }) => {
  return (
    <Card className="m-4 w-full md:w-1/3 lg:w-1/4">
      <CardContent style={{ fontSize: '16pt' }}>
        <Typography gutterBottom variant="h5" component="div" style={{ fontSize: '16pt' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{ fontSize: '14pt' }}>
          {description}
        </Typography>
        <div className="flex flex-col items-start mt-4"> 
          <Button
            size="small"
            style={{ color: '#1B6AAA', marginTop: '10px', fontSize: '16pt' }}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </Button>
          <Chip label={accessibilityType} sx={{ backgroundColor: "#54BD86", color: "white", fontSize: '16pt' }} className="mt-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceCard;
