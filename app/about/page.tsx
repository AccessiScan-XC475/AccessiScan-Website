const TeamMember = ({name, role}: {name: string, role: string}) => (
  <div className="p-2 m-6">
    <h4>Hi, I&apos;m {name}</h4>
    <p>I am a {role}</p>
  </div>
)

export default function AboutPage() {
  return (
    <div>
      <h2 className="text-center text-2xl">Meet our team!</h2>
      <div className="flex flex-wrap">
        <TeamMember name="Amelia" role="Product Owner" />
        <TeamMember name="Jeffrey" role="Developer" />
        <TeamMember name="Hangi" role="Designer" />
        <TeamMember name="Ethan" role="Developer" />
        <TeamMember name="Josie" role="Developer" />
      </div>
    </div>
  )
}

