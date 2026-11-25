import { TagList } from "./tag";

export function SkillGroups({ groups }: { groups: readonly { title: string; items: readonly string[] }[] }) {
  return (
    <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
      {groups.map((g) => (
        <div key={g.title}>
          <h3 className="mb-2.5 text-sm font-semibold text-text">{g.title}</h3>
          <TagList items={g.items} label={g.title} />
        </div>
      ))}
    </div>
  );
}
