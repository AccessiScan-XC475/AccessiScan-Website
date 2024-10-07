"use client";
import { Card, CardContent, Typography } from '@mui/material';

const TeamMember = ({ name, role, age, major }: { name: string; role: string; age: number; major: string }) => (
  <Card variant="outlined" className="m-4">
    <CardContent>
      <Typography variant="h5" component="div">
        Hi, I&apos;m {name}
      </Typography>
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
  // You can use CSS Flexbox for layout
  return (
    <div>
      <Typography variant="h2" className="text-center my-4">Meet our team!</Typography>
      <div className="flex flex-wrap justify-center">
        <div className="m-2 w-full sm:w-1/2 md:w-1/3">
          <TeamMember name="Amelia" role="Product Owner" age={20} major="Computer Science" />
        </div>
        <div className="m-2 w-full sm:w-1/2 md:w-1/3">
          <TeamMember name="Jeffrey" role="Developer" age={21} major="Computer Science" />
        </div>
        <div className="m-2 w-full sm:w-1/2 md:w-1/3">
          <TeamMember name="Hangi" role="Designer" age={23} major="Graphic Design" />
        </div>
        <div className="m-2 w-full sm:w-1/2 md:w-1/3">
          <TeamMember name="Ethan" role="Developer" age={20} major="Computer Science" />
        </div>
        <div className="m-2 w-full sm:w-1/2 md:w-1/3">
          <TeamMember name="Josie" role="Developer" age={22} major="Data Science" />
        </div>
      </div>
    </div>
  );
}
