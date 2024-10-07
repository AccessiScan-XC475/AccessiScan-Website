const TeamMember = ({ name, role, age, major }: { name: string; role: string; age: number; major: string }) => (
  <div className="p-2 m-6">
    <h4>Hi, I&apos;m {name}</h4>
    <p>I am a {role}</p>
    <p>I am {age} years old</p>
    <p>My major is {major}</p> {/* Display the major */}
  </div>
);

export default function AboutPage() {
  return (
    <div>
      <h2 className="text-center text-2xl">Meet our team!</h2>
      <div className="flex flex-wrap">
        <TeamMember name="Amelia" role="Product Owner" age={20} major="Computer Science" />
        <TeamMember name="Jeffrey" role="Developer" age={21} major="Computer Science" />
        <TeamMember name="Hangi" role="Designer" age={23} major="Graphic Design" />
        <TeamMember name="Ethan" role="Developer" age={20} major="Computer Science" />
        <TeamMember name="Josie" role="Developer" age={22} major="Data Science" />
      </div>
    </div>
  );
}
