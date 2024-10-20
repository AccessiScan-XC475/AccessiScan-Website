import React from "react";
import { Card, CardContent, Typography, Button, Chip } from "@mui/material";

interface ResourceCardProps {
  title: string;
  description: string;
  link: string;
  accessibilityType: string; // New prop for accessibility tag
}

const ResourceCard: React.FC<ResourceCardProps> = ({ title, description, link, accessibilityType }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardContent>
        {/* Accessibility Tag */}
        <Chip
          label={accessibilityType}
          color="primary" // You can choose the color, or customize it as needed
          sx={{ marginBottom: 1 }}
        />
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Button size="small" href={link} target="_blank" rel="noopener noreferrer">
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
};

export default ResourceCard;
