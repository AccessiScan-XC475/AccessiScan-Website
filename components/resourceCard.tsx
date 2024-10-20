import React from "react";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";

interface ResourceCardProps {
  title: string;
  description: string;
  link: string;
  imageUrl: string; // Optional, if you want to include an image
}

const ResourceCard: React.FC<ResourceCardProps> = ({ title, description, link, imageUrl }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      {imageUrl && <CardMedia component="img" height="140" image={imageUrl} alt={title} />}
      <CardContent>
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
