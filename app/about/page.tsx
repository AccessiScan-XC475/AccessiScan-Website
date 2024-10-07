const TeamMember = ({ name, role, age }: { name: string; role: string; age: number }) => (
  <div className="p-2 m-6">
    <h4>Hi, I&apos;m {name}</h4>
    <p>I am a {role}</p>
    <p>I am {age} years old</p> {/* Display the age */}
  </div>
);

export default function AboutPage() {
  return (
    <div>
      <h2 className="text-center text-2xl">Meet our team!</h2>
      <div className="flex flex-wrap">
        <TeamMember name="Amelia" role="Product Owner" age={20} />
        <TeamMember name="Jeffrey" role="Developer" age={31} />
        <TeamMember name="Hangi" role="Designer" age={23} />
        <TeamMember name="Ethan" role="Developer" age={20} />
        <TeamMember name="Josie" role="Developer" age={22} />
      </div>
    </div>
  );
}
