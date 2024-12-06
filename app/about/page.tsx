"use client";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Image from "next/image";

const TeamMember = ({
  name,
  role,
  age,
  major,
}: {
  name: string;
  role: string;
  age: number;
  major: string;
}) => (
  <Card
    sx={{
      backgroundColor: "#f9f9f9",
      border: "1px solid #e0e0e0",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      width: "100%",
      maxWidth: "350px",
    }}
  >
    <CardContent>
      <Image
        src={`/${name.toLowerCase()}.jpg`}
        alt={name}
        width={100}
        height={100}
        style={{ borderRadius: "50%", marginBottom: "16px" }}
      />
      <Typography
        variant="h6"
        sx={{
          fontSize: "18pt",
          fontWeight: "bold",
          color: "#1b6aaa",
        }}
        gutterBottom
      >
        {name}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: "14pt",
          color: "#555555",
          lineHeight: "1.6",
        }}
      >
        Role: {role}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: "14pt",
          color: "#555555",
          lineHeight: "1.6",
        }}
      >
        Age: {age}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: "14pt",
          color: "#555555",
          lineHeight: "1.6",
        }}
      >
        Major: {major}
      </Typography>
    </CardContent>
  </Card>
);

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-12 py-8">
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          my: 4,
          color: "#1B6AAA",
          fontWeight: 800,
          fontSize: "2rem",
        }}
      >
        Our Mission
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          mx: "auto",
          maxWidth: "700px",
          my: 6,
          lineHeight: 1.8,
          fontSize: "1.1rem",
          color: "#333",
        }}
      >
        At AccessiScan, our mission is to revolutionize web accessibility by 
        empowering developers to build inclusive digital experiences from the 
        very beginning. Through our innovative Chrome extension, we provide early 
        detection of accessibility issues, even on local and unpublished websites, 
        offering developers the tools and insights needed to create accessible 
        designs proactively. Beyond scanning and scoring, we are committed to 
        educating users with curated resources and interactive learning opportunities, 
        equipping them with the knowledge to implement best practices. Together with 
        our thriving community board, AccessiScan fosters collaboration and advocacy 
        for a more accessible web for everyone.
      </Typography>

      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          my: 4,
          color: "#54BD86",
          fontWeight: 800,
          fontSize: "2rem",
        }}
      >
        Meet our Team
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <TeamMember
          name="Amelia"
          role="Product Owner"
          age={20}
          major="Computer Science"
        />
        <TeamMember
          name="Jeffrey"
          role="Developer"
          age={21}
          major="Computer Science"
        />
        <TeamMember
          name="Hangi"
          role="Designer"
          age={32}
          major="Graphic Design"
        />
        <TeamMember
          name="Ethan"
          role="Developer"
          age={20}
          major="Computer Science"
        />
        <TeamMember
          name="Josie"
          role="Developer"
          age={22}
          major="Data Science"
        />
      </Box>
    </div>
  );
}
