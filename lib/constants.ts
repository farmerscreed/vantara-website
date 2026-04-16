// Single source of truth for site-wide content and config.
// Copy values are verbatim from the client brief (Vantara Brief.md).

export const SITE = {
  name: "Vantara International",
  legalName: "Vantara International Limited",
  tagline: "Smart Cities. Sustainable Living. Global Vision.",
  url: "https://vantarainternational.com",
  email: "info@vantarainternational.com",
  phone: "+234 901 388 8880",
  phoneRaw: "+2349013888880",
  location: "Port Harcourt, Rivers State, Nigeria",
  description:
    "Vantara International is a property development company building Primerose Smart City Cluster — 200 smart buildings within New Port City, Rivers State, Nigeria.",
} as const;

export const NAV_SECTIONS = [
  { id: "about", label: "About" },
  { id: "primerose", label: "Primerose" },
  { id: "smart-living", label: "Smart Living" },
  { id: "partnerships", label: "Partnerships" },
  { id: "contact", label: "Contact" },
] as const;

export const HERO = {
  tagline: SITE.tagline,
  cta: { label: "Discover Primerose", href: "#primerose" },
  // Flip via env var or edit directly once public/videos/hero-video.mp4 exists.
  useVideo: process.env.NEXT_PUBLIC_USE_HERO_VIDEO === "true",
  videoSrc: "/videos/hero-video.mp4",
  stillSrc: "/images/hero-still.webp",
  stillFallback: "/images/hero-still.jpg",
} as const;

export const ABOUT = {
  eyebrow: "About Vantara",
  heading: "We build smart communities, at city scale.",
  body: [
    "Vantara International is a development company focused on large-scale residential and commercial infrastructure. We design, build, and deliver smart communities that integrate modern technology with sustainable construction — creating environments where people thrive and investments appreciate.",
    "Our approach combines international best practices in urban planning with deep local expertise, enabling us to execute complex, multi-phase developments from concept through delivery.",
    "Headquartered in Port Harcourt, Nigeria, we operate across the full development lifecycle — land acquisition, architectural design, smart infrastructure integration, construction management, and asset delivery.",
  ],
  pillars: [
    {
      icon: "Building2",
      label: "Scale",
      subtext: "City-level developments, not single buildings",
    },
    {
      icon: "Cpu",
      label: "Technology",
      subtext: "Smart infrastructure embedded from foundation",
    },
    {
      icon: "Leaf",
      label: "Sustainability",
      subtext: "Solar-powered, energy-independent communities",
    },
    {
      icon: "Globe",
      label: "Global Vision",
      subtext: "International standards, local execution",
    },
  ],
} as const;

export const PRIMEROSE = {
  eyebrow: "Primerose Smart City Cluster",
  heading: "Our flagship development",
  body: [
    "Primerose is a 200-building smart residential community within New Port City — a 1,000-hectare government-backed urban development in Eleme, Rivers State, Nigeria. Developed in partnership with NPC Development Ltd under the supervision of the Greater Port Harcourt City Development Authority (GPHCDA), Primerose represents the new standard for residential living in West Africa.",
    "Every building is a four-storey structure housing four self-contained apartments — two spacious 2-bedroom units and two 3-bedroom units — each integrated with smart home technology from the ground up.",
  ],
  stats: [
    { value: 200, suffix: "", label: "Buildings" },
    { value: 800, suffix: "", label: "Residential Units" },
    { value: 8, suffix: "", label: "Hectares" },
    { value: 481, suffix: " sqm", label: "Built Area Per Building" },
    { value: 1000, suffix: "", label: "Hectare City Master Plan" },
  ],
  renders: [
    { src: "/images/render-01.webp", alt: "Primerose — primary aerial view", caption: "Aerial Masterplan" },
    { src: "/images/render-02.webp", alt: "Primerose — exterior elevation", caption: "Exterior Elevation" },
    { src: "/images/render-03.webp", alt: "Primerose — residential block detail", caption: "Residential Block" },
    { src: "/images/render-04.webp", alt: "Primerose — community perspective", caption: "Community Perspective" },
  ],
  context: {
    eyebrow: "Situated within New Port City",
    body: [
      "New Port City is a 1,000-hectare smart city development in Eleme, Rivers State — a public-private partnership between the Rivers State Government and Rainbow Heritage Group, supervised by the Greater Port Harcourt City Development Authority (GPHCDA).",
      "Strategically positioned near the Onne Deep Sea Port, the Export Processing Zone, and Port Harcourt International Airport, New Port City is designed as a self-sustaining urban centre with residential districts, commercial hubs, industrial parks, and 24-hour independent power supply.",
      "Primerose occupies a prime 8-hectare residential block within this master-planned city.",
    ],
  },
} as const;

export const SMART_LIVING = {
  eyebrow: "Smart Living",
  heading: "Technology built into every home",
  body: "Every unit in Primerose is designed as a connected, energy-independent living space. Smart infrastructure is not an add-on — it is embedded from the foundation, integrating power, security, connectivity, and automation into a seamless residential experience.",
  features: [
    {
      icon: "Sun",
      title: "Solar Power System",
      description:
        "5kVA independent solar power per unit. Energy independence from day one.",
    },
    {
      icon: "Lock",
      title: "Smart Access Control",
      description:
        "Keyless smart lock systems on all entry points. Remote access management.",
    },
    {
      icon: "Camera",
      title: "Integrated Security",
      description:
        "CCTV surveillance infrastructure with estate-wide monitoring capability.",
    },
    {
      icon: "Home",
      title: "Home Automation",
      description:
        "Centralized control of lighting, climate, and electrical systems.",
    },
    {
      icon: "Wifi",
      title: "Fiber Optic Connectivity",
      description:
        "High-speed fiber backbone throughout the estate for reliable internet access.",
    },
  ],
} as const;

export const PARTNERSHIPS = {
  eyebrow: "Partnerships",
  heading: "Partner with us",
  body: [
    "Vantara International collaborates with technology providers, materials suppliers, construction firms, and investment groups who share our commitment to quality and innovation.",
    "Whether you supply smart home technology, building materials, renewable energy systems, or development capital — we welcome conversations about how we can build together.",
  ],
  interestAreas: [
    "Materials Supply",
    "Technology Partnership",
    "Investment",
    "Construction Services",
    "Other",
  ],
  submitLabel: "Submit Inquiry",
  successMessage:
    "Thank you. A member of our team will be in touch within 48 hours.",
} as const;

export const CONTACT = {
  eyebrow: "Get in Touch",
  heading: "Contact us",
  body: "For general inquiries, press, or partnership discussions — reach us directly.",
  mapEmbed:
    "https://www.google.com/maps?q=Port+Harcourt,+Rivers+State,+Nigeria&output=embed",
} as const;
