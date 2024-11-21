"use client";
import { Card, CardContent, Typography } from "@mui/material";
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
    variant="outlined"
    sx={{
      maxWidth: "300px",
      padding: "16px",
      backgroundColor: "#F5F5FA",
      borderRadius: "12px",
      boxShadow: "0 6px 10px rgba(0, 0, 0, 0.1)",
      borderColor: "#E0E0E0",
      transition: "transform 0.2s",
      "&:hover": { transform: "scale(1.05)", borderColor: "#54BD86" },
    }}
    className="m-4"
  >
    <CardContent>
      <Typography
        variant="h5"
        component="div"
        sx={{ color: "#1B6AAA", fontWeight: 800, fontSize: "1.1rem" }}
      >
        Hi, I&apos;m {name}
      </Typography>
      <Image
        src={`/${name.toLowerCase()}.jpg`}
        alt={name}
        width={100}
        height={100}
      />
      <Typography variant="body2" color="text.secondary">
        I am a {role}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        I am {age} years old
      </Typography>
      <Typography variant="body2" color="text.secondary">
        My major is {major}
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
        About AccessiScan
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: "left",
          mx: "auto",
          maxWidth: "700px",
          my: 6,
          lineHeight: 1.6,
          fontSize: "1.1rem",
          color: "#333",
        }}
      >
        &emsp;&emsp;AccessiScan is an innovative solution to the persistent
        challenges in web accessibility. By scanning websites directly from a
        Chrome extension, AccessiScan enables developers to proactively address
        accessibility during the design phase, even on local, unpublished
        websites. This unique approach offers developers early visibility into
        potential accessibility issues, such as visual, audio, and mobility
        barriers, empowering them to create inclusive experiences from the
        start.
        <br />
        <br />
        &emsp;&emsp;AccessiScan aims not only to identify compliance gaps and
        provide free, user-friendly accessibility reports but also to serve as a
        comprehensive educational tool. Developers are guided in understanding
        what accessibility entails and how to implement it effectively. Our tool
        generates an accessibility score based on various criteria, helping
        developers learn while they improve their projects.
        <br />
        <br />
        &emsp;&emsp;Additionally, AccessiScan fosters a community of
        accessibility-focused creators through its integrated community board.
        This space allows developers to share insights, discuss projects, and
        seek advice, creating a supportive environment that promotes accessible
        design practices. On the Home page, we have curated accessibility
        resources to offer indepth explanations and recommendations. Together,
        AccessiScan’s tools and community provide a unique platform for
        educating, connecting, and empowering developers to make the web more
        accessible for all.
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
        Meet our team!
      </Typography>
      <div className="flex flex-wrap justify-center gap-6">
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
          age={23}
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
      </div>
    </div>
  );
}
