import ResourceCard, { ResourceCardProps } from "./resourceCard";

export default function ResourcesSection({
  name,
  resources,
}: {
  name: string;
  resources: ResourceCardProps[];
}) {
  return (
    <div className="my-2 py-2">
      <h3 className="font-bold text-2xl text-secondary leading-10">{name}</h3>
      <div className="flex flex-wrap justify-start items-stretch">
        {resources.map((resource) => {
          return <ResourceCard key={resource.title} resource={resource} />;
        })}
      </div>
    </div>
  );
}
