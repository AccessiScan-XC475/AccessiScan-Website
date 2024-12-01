import { AccessiScanProfileSelf } from "@/app/profile/page";
import Image from "next/image";
import Secret from "./secret";
import ScoreHistory from "./scoreHistory";

export default function SelfProfileDisplay({
  profile,
}: {
  profile: AccessiScanProfileSelf;
}) {
  return (
    <div>
      <div className="flex flex-col items-center mt-8">
        <div className="flex items-center">
          <Image
            src={profile.githubProfile.avatarUrl}
            alt="github avatar"
            width={150}
            height={150}
            style={{
              borderRadius: "50%",
              padding: "0.75rem",
              aspectRatio: "square",
            }}
          />
          <h3 className="text-5xl">{profile.username}</h3>
        </div>
        <div className="flex flex-col w-72 p-3 m-1 text-xl">
          <p>{profile.name}</p>
          <p>{profile.githubProfile.email}</p>
          <Secret />
        </div>
      </div>
      <ScoreHistory inputHistory={profile.scoreHistory} />
    </div>
  );
}
