export type Company = {
  id: string;
  name: string;
  role: string;
  dates: string;
  location?: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  companyId: string;
  year: string;
  cover: {
    background: string;
    label: string;
    /** Optional image path under /public. When set, the catalog tile shows
     *  this image centered on the background instead of the bare color block. */
    image?: string;
  };
  status: "case-study" | "summary";
};

export const companies: Company[] = [
  {
    id: "favorited",
    name: "favorited",
    role: "Product Manager · Product Designer",
    dates: "Jan 2024 – Present",
    location: "Santa Monica, CA",
  },
  {
    id: "personal",
    name: "Personal",
    role: "Solo builds, nights & weekends",
    dates: "Always",
  },
  {
    id: "disney",
    name: "The Walt Disney Company",
    role: "Technical Product Manager",
    dates: "May 2022 – Dec 2023",
    location: "Burbank, CA",
  },
  {
    id: "rebud",
    name: "Rebud",
    role: "Technical Product Manager",
    dates: "Apr 2021 – May 2022",
    location: "Los Angeles, CA",
  },
  {
    id: "nasa",
    name: "NASA JPL",
    role: "Flight Software Engineer",
    dates: "Dec 2019 – Mar 2021",
    location: "Pasadena, CA",
  },
  {
    id: "apple",
    name: "Apple",
    role: "Engineering PM, Intern",
    dates: "Summer 2019",
    location: "Cupertino, CA",
  },
  {
    id: "navsea",
    name: "NAVSEA",
    role: "Software Engineer",
    dates: "2018 – 2020",
    location: "Corona, CA",
  },
  {
    id: "navair",
    name: "NAVAIR",
    role: "Software Engineer, Intern (NREIP)",
    dates: "Summer 2017",
    location: "China Lake, CA",
  },
  {
    id: "youtube",
    name: "YouTube",
    role: "Talent Manager",
    dates: "2015 – 2018",
    location: "Los Angeles, CA",
  },
];

export const projects: Project[] = [
  // ───────── favorited ─────────
  {
    slug: "favoritedtv",
    title: "FavoritedTV",
    tagline:
      "An Apple TV app that replaced a weekly manual video render. Built in ~30 hours.",
    companyId: "favorited",
    year: "2026",
    cover: {
      background: "#f2f2f2",
      label: "favorited.tv",
      image: "/projects/favoritedtv.png",
    },
    status: "case-study",
  },
  {
    slug: "rex-radcliffe",
    title: "Rex Radcliffe",
    tagline:
      "A serialized ghost-hunting mystery for Spooky Season: character, script, and a reusable Rive + Braze rig. Zero engineering.",
    companyId: "favorited",
    year: "2025",
    cover: {
      background: "#1a1208",
      label: "favorited.rex",
      image: "/projects/rex.png",
    },
    status: "case-study",
  },
  {
    slug: "favorited-games",
    title: "Favorited Chat Games",
    tagline:
      "In-stream minigames for a livestreaming app. TikTok Live × Jackbox × 80s arcade.",
    companyId: "favorited",
    year: "2025",
    cover: { background: "#ec4899", label: "favorited.games" },
    status: "summary",
  },

  // ───────── personal ─────────
  {
    slug: "tidy",
    title: "Tidy",
    tagline:
      "Smart-home room scanner. Wyze cams + Claude vision + Supabase + React/iOS.",
    companyId: "personal",
    year: "2026",
    cover: {
      background: "#10b981",
      label: "tidy",
      image: "/projects/tidy.png",
    },
    status: "summary",
  },
  {
    slug: "message-matt",
    title: "Message Matt",
    tagline:
      "A receipt printer on my desk that takes telegrams from anyone on the internet. Inspired by The Bear.",
    companyId: "personal",
    year: "2025",
    cover: {
      background: "#f59e0b",
      label: "message.matt",
      image: "/projects/message-matt.png",
    },
    status: "summary",
  },

  // ───────── Disney ─────────
  {
    slug: "natgeo-explorer",
    title: "NatGeo Explorer",
    tagline:
      "Interactive photo game: five guesses to name the country in a NatGeo photo.",
    companyId: "disney",
    year: "2023",
    cover: { background: "#ffcc00", label: "natgeo.explorer" },
    status: "summary",
  },
  {
    slug: "natgeo-copy-ai",
    title: "NatGeo AI Copywriter",
    tagline:
      "AI tool that turns each NatGeo article into 10+ push-notification options. Hours → under a minute.",
    companyId: "disney",
    year: "2023",
    cover: { background: "#000000", label: "natgeo.push" },
    status: "summary",
  },
  {
    slug: "compliance-scanner",
    title: "Cross-BU Compliance Scanner",
    tagline:
      "Python + React tool that cut compliance verification across Disney business units from a day to five minutes.",
    companyId: "disney",
    year: "2023",
    cover: { background: "#5b21b6", label: "disney.compliance" },
    status: "summary",
  },
  {
    slug: "deet-motion",
    title: "DEET Motion (ESPN)",
    tagline:
      "Generative-AI prototype letting ESPN sportscasters voice personalized rundowns at scale.",
    companyId: "disney",
    year: "2023",
    cover: { background: "#dc2626", label: "espn.deet" },
    status: "summary",
  },
  {
    slug: "espn-draft-night",
    title: "ESPN Draft Night Automation",
    tagline:
      "Live data pipeline that generated player-card metadata in 5 minutes instead of 4 hours.",
    companyId: "disney",
    year: "2023",
    cover: { background: "#1d4ed8", label: "espn.draft" },
    status: "summary",
  },
  {
    slug: "screenplay-to-audio",
    title: "Script-to-Audio",
    tagline:
      "Prototype for Disney Studio Tech: execs listen to screenplays as narrated performances.",
    companyId: "disney",
    year: "2023",
    cover: { background: "#7c2d12", label: "disney.studio" },
    status: "summary",
  },

  // ───────── Rebud ─────────
  {
    slug: "rebud-ios",
    title: "Rebud iOS",
    tagline:
      "Shipped one of the earliest consumer iOS apps in the cannabis industry.",
    companyId: "rebud",
    year: "2022",
    cover: {
      background: "#1e3a30",
      label: "rebud.ios",
      image: "/projects/rebud-ios.png",
    },
    status: "summary",
  },
  {
    slug: "rebud-pos",
    title: "Rebud POS & Kiosks",
    tagline:
      "Designed + shipped the checkout flow for Rebud's first retail dispensary.",
    companyId: "rebud",
    year: "2022",
    cover: {
      background: "#1e3a30",
      label: "rebud.pos",
      image: "/projects/rebud-pos.png",
    },
    status: "summary",
  },
  {
    slug: "packerkit",
    title: "PackerKit",
    tagline:
      "Android ops app for warehouse packing, improving packing speed and reducing fulfillment errors.",
    companyId: "rebud",
    year: "2021",
    cover: {
      background: "#1e3a30",
      label: "rebud.packerkit",
      image: "/projects/packerkit.png",
    },
    status: "summary",
  },

  // ───────── NASA JPL ─────────
  {
    slug: "europa-clipper",
    title: "Europa Clipper",
    tagline:
      "Flight software for NASA's interplanetary orbiter to Jupiter's moon Europa.",
    companyId: "nasa",
    year: "2021",
    cover: { background: "#0f172a", label: "europa.clipper" },
    status: "summary",
  },
  {
    slug: "jpl-telemetry",
    title: "Telemetry Tools",
    tagline:
      "Adapted Mars 2020 Python telemetry tooling for Europa Clipper. Real-time tracking dashboards across teams.",
    companyId: "nasa",
    year: "2020",
    cover: { background: "#1e293b", label: "jpl.telemetry" },
    status: "summary",
  },

  // ───────── Apple ─────────
  {
    slug: "shortcuts-gallery",
    title: "Shortcuts on iOS 13",
    tagline:
      "Helped launch Shortcuts as a default app on iOS 13. Shipped Shortcuts in the global Gallery.",
    companyId: "apple",
    year: "2019",
    cover: {
      background: "#111111",
      label: "apple.shortcuts",
      image: "/projects/shortcuts-gallery.png",
    },
    status: "summary",
  },

  // ───────── NAVSEA ─────────
  {
    slug: "smsmds-redesign",
    title: "SMSMDS Redesign",
    tagline:
      "Modernized the Surface Missile System Maintenance Data System portal: UX, iconography, Angular.",
    companyId: "navsea",
    year: "2020",
    cover: { background: "#1e3a8a", label: "navsea.smsmds" },
    status: "summary",
  },
  {
    slug: "emeds",
    title: "EMEDS for NATO",
    tagline:
      "Led the EMEDS application redesign for NATO partners, focused on cross-force interoperability.",
    companyId: "navsea",
    year: "2020",
    cover: { background: "#172554", label: "navsea.emeds" },
    status: "summary",
  },

  // ───────── NAVAIR ─────────
  {
    slug: "crosswire",
    title: "Crosswire",
    tagline:
      "Ported a closed-loop simulation from C#/.NET on Windows to C++/Qt on Linux, including real-time decryption of Link 16 tactical-data-link messages.",
    companyId: "navair",
    year: "2017",
    cover: {
      background: "#0c4a6e",
      label: "navair.crosswire",
      image: "/projects/crosswire.png",
    },
    status: "summary",
  },

  // ───────── YouTube ─────────
  {
    slug: "crankthatfrank",
    title: "CrankThatFrank",
    tagline:
      "Managed a YouTube comedian from a few thousand subscribers to over a million: production, thumbnails, media, and the deals.",
    companyId: "youtube",
    year: "2018",
    cover: {
      background: "#ef4444",
      label: "crankthatfrank",
      image: "/projects/crankthatfrank.png",
    },
    status: "summary",
  },
  {
    slug: "frank-merch",
    title: "Frank Merch",
    tagline:
      "Built a creator merch line on Represent doing up to $40K/month, with multiple sold-out series, ending in a Hot Topic deal.",
    companyId: "youtube",
    year: "2017",
    cover: {
      background: "#161616",
      label: "frank.merch",
      image: "/projects/frank-merch.png",
    },
    status: "summary",
  },
  {
    slug: "frank-pillow",
    title: "Throwboy Pillow",
    tagline:
      "A custom CrankThatFrank pillow with Throwboy, the studio behind the original emoji pillows.",
    companyId: "youtube",
    year: "2017",
    cover: {
      background: "#5e8b9e",
      label: "frank.pillow",
      image: "/projects/frank-pillow.png",
    },
    status: "summary",
  },
  {
    slug: "frank-brand-deals",
    title: "Brand Deals",
    tagline:
      "Negotiated multi-brand sponsorships across fashion, gaming, and entertainment, matching brands to the right audience moment.",
    companyId: "youtube",
    year: "2017",
    cover: { background: "#7f1d1d", label: "frank.deals" },
    status: "summary",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getCompany(id: string): Company | undefined {
  return companies.find((c) => c.id === id);
}

export function projectsForCompany(id: string): Project[] {
  return projects.filter((p) => p.companyId === id);
}
