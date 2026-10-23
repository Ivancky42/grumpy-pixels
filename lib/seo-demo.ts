/**
 * Example data for the Grumpy Pixels SEO product mockups on /services/seo.
 * Senyum Dental is a fictional clinic — not a client — and every number here
 * is illustrative. Components must show `demoDisclaimer` next to any mockup.
 * The numbers tell one story across the Overview, the recommendation, the
 * report and the SeoTrace diagram, so keep them consistent when editing.
 */

export const demoDisclaimer = "Example data — a fictional clinic, not a client.";

export const demoWorkspace = {
  name: "Senyum Dental",
  initials: "SD",
  domain: "senyumdental.example",
  market: "Malaysia · google.com.my · English",
  campaign: "Month 4 of 6",
  period: "September 2026",
  refreshed: "Refreshed 2 Oct 2026",
  user: { name: "Agency admin", initials: "GP" },
};

/** Sidebar labels, matching the real dashboard's navigation */
export const demoNav = {
  agency: ["Portfolio", "Team & access"],
  workspace: [
    "Overview",
    "Traffic & Conversions",
    "Search Performance",
    "Keywords",
    "Pages",
    "Technical SEO",
    "Local SEO",
    "AI Visibility",
    "Findings",
    "Recommendations",
    "Activity",
    "Reports",
  ],
} as const;

export type DemoKpi = {
  label: string;
  value: string;
  delta: string;
  /** true when the change is good news */
  good: boolean;
};

export const demoKpis: DemoKpi[] = [
  { label: "Organic clicks", value: "4,812", delta: "+18%", good: true },
  { label: "Enquiries", value: "64", delta: "+12%", good: true },
  { label: "Avg. position", value: "9.4", delta: "+1.2", good: true },
  { label: "Top-10 keywords", value: "22", delta: "+5", good: true },
];

/** Daily organic clicks, 1–30 September 2026 (sums to 4,812) */
export const demoClicks: number[] = [
  136, 147, 151, 147, 138, 120, 124, 150, 161, 165, 160, 151, 133, 138, 163,
  174, 178, 173, 165, 146, 151, 177, 188, 191, 187, 179, 161, 165, 191, 202,
];

export const demoSource =
  "Source: Google Search Console · 1–30 Sep 2026 · updated 2 Oct 2026";

export type DemoPage = {
  title: string;
  path: string;
  clicks: number;
  delta: string;
  good: boolean;
  position: string;
};

export const demoPriorityPages: DemoPage[] = [
  { title: "Dental implants", path: "/dental-implants", clicks: 1240, delta: "+24%", good: true, position: "#4.2" },
  { title: "Homepage", path: "/", clicks: 1105, delta: "+9%", good: true, position: "#3.1" },
  { title: "Braces & Invisalign", path: "/braces", clicks: 684, delta: "+31%", good: true, position: "#6.8" },
  { title: "Teeth whitening", path: "/teeth-whitening", clicks: 412, delta: "−6%", good: false, position: "#9.5" },
  { title: "Root canal treatment", path: "/root-canal", clicks: 296, delta: "+12%", good: true, position: "#7.4" },
];

export const demoTop10 = {
  inTop10: 22,
  active: 36,
  change: "+5",
  note: "Checked 28 Sep. Up from 17 on 31 Aug.",
};

export type DemoFinding = {
  severity: "High" | "Medium" | "Low";
  title: string;
  action: string;
};

export const demoFindings: DemoFinding[] = [
  {
    severity: "High",
    title: "/braces loads its main image in 4.1 s on mobile",
    action: "Serve the hero image as WebP at its display size.",
  },
  {
    severity: "Medium",
    title: "/teeth-whitening slipped to position 9.5",
    action: "Answer the price question competitors now answer above the fold.",
  },
  {
    severity: "Medium",
    title: "12 location pages share one meta description",
    action: "Write a description per branch with its area and hours.",
  },
];

export const demoRecommendation = {
  title: "Rewrite the /dental-implants title and meta description",
  category: "CTR · Dental implants",
  evidence: [
    "Position 6.1 for “dental implants kuala lumpur”",
    "CTR 1.1% where 3–4% is typical at that position",
    "Title is cut off on mobile after 48 characters",
  ],
  expected: "CTR 1.1% → 3%+ at the same position",
  effort: "Low · about 1 hour",
  /** Status trail, oldest first; the last one is the current state */
  steps: [
    { label: "Suggested", date: "2 Sep" },
    { label: "Approved by client", date: "3 Sep" },
    { label: "Shipped", date: "5 Sep" },
    { label: "Measured", date: "30 Sep" },
  ],
};

/** The traced change shown by SeoTrace: finding → recommendation → change → result */
export const demoTrace = {
  nodes: [
    {
      label: "Finding",
      body: "/dental-implants ranks #6 for ‘dental implants kuala lumpur’. Impressions up 38%, CTR 1.1%.",
    },
    {
      label: "Recommendation",
      body: "Rewrite title + meta description.",
      approval: true,
    },
    { label: "Change", body: "Title and meta updated · 5 Sep" },
    { label: "Result", body: "CTR 1.1% → 3.4% · organic clicks +212/mo" },
  ],
  summary:
    "A traced SEO change in four steps. Finding: the dental implants page ranks sixth for “dental implants kuala lumpur”, impressions are up 38% and the click-through rate is 1.1%. Recommendation: rewrite the title and meta description; approved by the client. Change: title and meta updated on 5 September. Result: click-through rate rose from 1.1% to 3.4%, with 212 more organic clicks a month.",
} as const;

export const demoReport = {
  eyebrow: "Monthly SEO report",
  title: "September 2026 SEO report",
  subtitle: "Your SEO campaign is moving up.",
  status: "Improving",
  preparedBy: "Grumpy Pixels",
  slideCount: 14,
  headline: "Clicks up 18%; the implants page now wins its click on page one",
  summary:
    "Organic search brought 4,812 clicks and 64 enquiries in September. 22 tracked keywords are in the top 10, up 5. Next: fix the slow /braces page on mobile.",
};

export type SeoTourItem = {
  eyebrow: string;
  title: string;
  body: string;
  mock: "overview" | "recommendation" | "report";
};

/** The three-screen product tour on /services/seo (copy drawn from lib/services.ts) */
export const seoTour: SeoTourItem[] = [
  {
    eyebrow: "Overview",
    title: "Where the campaign stands, on one screen",
    body: "Findings, recommendations awaiting your approval, changes made and results — all in one workspace you, your team and your partners can open. Every number shows its source and the day it was updated.",
    mock: "overview",
  },
  {
    eyebrow: "Recommendations",
    title: "Nothing changes without a reason on record",
    body: "Each finding becomes a recommendation with an expected effect. You approve what goes ahead, we make the change, and the result is tracked back to the finding that prompted it.",
    mock: "recommendation",
  },
  {
    eyebrow: "Reports",
    title: "Reporting a board can read in five minutes",
    body: "A monthly summary of what changed, what it cost and what it returned, written for the person who signs the invoice.",
    mock: "report",
  },
];
