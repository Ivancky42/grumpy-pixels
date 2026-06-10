import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

type Props = {
  icon: ReactNode;
  title: string;
  description: string;
  bullets: string[];
};

export function ServiceCard({ icon, title, description, bullets }: Props) {
  return (
    <Card className="flex h-full flex-col">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lavender-soft text-purple-deep">
        {icon}
      </div>
      <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-navy-soft">{description}</p>
      <ul className="mt-4 space-y-1.5 text-sm font-medium text-navy">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-purple" aria-hidden />
            {bullet}
          </li>
        ))}
      </ul>
    </Card>
  );
}
