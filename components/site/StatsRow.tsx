import { Card } from "@/components/ui/Card";

type Stat = {
  value: string;
  label: string;
  tint: "white" | "lavender" | "blush" | "mint";
};

export const speedStats: Stat[] = [
  {
    value: "53%",
    label: "of mobile visitors leave a site that takes over 3 seconds to load",
    tint: "lavender",
  },
  {
    value: "2x",
    label: "slow pages can double bounce rates and halve conversions",
    tint: "blush",
  },
  {
    value: "#1",
    label: "Google uses page experience and Core Web Vitals in ranking",
    tint: "mint",
  },
  {
    value: "<1s",
    label: "what we aim for. Every page, every device.",
    tint: "white",
  },
];

export const designStats: Stat[] = [
  {
    value: "0.05s",
    label: "is all it takes for visitors to form a first impression of your website",
    tint: "blush",
  },
  {
    value: "75%",
    label: "of people judge a business's credibility by its website design",
    tint: "lavender",
  },
  {
    value: "94%",
    label: "of first impressions are design-related — before anyone reads a word",
    tint: "white",
  },
  {
    value: "88%",
    label: "of users won't return after a bad experience on a website",
    tint: "mint",
  },
];

export function StatsRow({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.value} tint={stat.tint} className="p-6 sm:p-6">
          <p className="font-display text-4xl font-semibold text-navy">
            {stat.value}
          </p>
          <p className="mt-2 text-sm text-navy-soft">{stat.label}</p>
        </Card>
      ))}
    </div>
  );
}
