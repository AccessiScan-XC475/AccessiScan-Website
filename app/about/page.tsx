"use client";
import { Card, CardContent, Typography, Grid } from '@mui/material';

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
  return (
    <div>
      <Typography variant="h2" className="text-center my-4">Meet our team!</Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <TeamMember name="Amelia" role="Product Owner" age={20} major="Computer Science" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TeamMember name="Jeffrey" role="Developer" age={21} major="Computer Science" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TeamMember name="Hangi" role="Designer" age={23} major="Graphic Design" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TeamMember name="Ethan" role="Developer" age={20} major="Computer Science" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TeamMember name="Josie" role="Developer" age={22} major="Data Science" />
        </Grid>
      </Grid>
    </div>
  );
}
