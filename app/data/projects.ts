export type Project = {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  cover: {
    background: string; // tailwind/css color
    label: string; // mono text overlay
  };
  status: "case-study" | "placeholder";
};

export const projects: Project[] = [
  {
    slug: "favoritedtv",
    title: "FavoritedTV",
    tagline: "An Apple TV app that replaced a weekly manual video render.",
    category: "tvOS",
    year: "2026",
    cover: { background: "#0000ff", label: "favorited.tv" },
    status: "case-study",
  },
  {
    slug: "tidy",
    title: "Tidy",
    tagline: "Smart-home room scanner. Wyze cams + Claude vision.",
    category: "iOS · Web",
    year: "2026",
    cover: { background: "#10b981", label: "tidy" },
    status: "placeholder",
  },
  {
    slug: "favorited-games",
    title: "Favorited Chat Games",
    tagline: "In-stream minigames for a livestreaming app. TikTok Live × Jackbox.",
    category: "iOS",
    year: "2025",
    cover: { background: "#ec4899", label: "favorited.games" },
    status: "placeholder",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
