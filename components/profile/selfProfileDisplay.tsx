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
      <div className="flex p-8">
        <Image
          src={profile.githubProfile.avatarUrl}
          alt="github avatar"
          width={300}
          height={300}
          style={{ borderRadius: "50%", padding: "0.75rem" }}
        />
        <div className="flex flex-col justify-start p-3 m-1">
          <p>{profile.name}</p>
          <p>{profile.githubProfile.email}</p>
          <p>{profile.username}</p>
          <Secret />
        </div>
      </div>
      <ScoreHistory history={profile.scoreHistory} />
    </div>
  );
}
