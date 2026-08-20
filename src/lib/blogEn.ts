// English blog content. Stored as static data (no CMS, no DB table yet),
// mirroring the structure of lib/blog.ts (the Spanish blog). Kept as a
// separate file/array because the English blog has its own content
// strategy (aimed at US businesses hiring LatAm talent) rather than being
// a translation of the Spanish posts. Can migrate to a Prisma table later
// without changing how it renders.

export type BloqueContenidoEn =
  | { tipo: "parrafo"; texto: string }
  | { tipo: "titulo"; texto: string }
  | { tipo: "lista"; items: string[] };

export type CategoriaBlogEn = "Guide for clients" | "Guide for freelancers";

export type PostBlogEn = {
  slug: string;
  titulo: string;
  categoria: CategoriaBlogEn;
  imagen: string;
  imagenAlt: string;
  descripcionMeta: string;
  extracto: string;
  fecha: string; // ISO
  minutosLectura: number;
  contenido: BloqueContenidoEn[];
};

export const POSTS_EN: PostBlogEn[] = [
  {
    slug: "hire-latin-america-freelancers-cost-guide",
    titulo: "Hiring Freelancers in Latin America: A Cost Guide for US Businesses",
    categoria: "Guide for clients",
    imagen: "/images/blog/hire-latam-freelancers-cost-guide.webp",
    imagenAlt: "A small business team reviewing numbers and a project together on a laptop",
    descripcionMeta:
      "How much it actually costs to hire freelance developers, designers, and virtual assistants in Latin America, why timezone overlap matters, and how to vet talent before you pay.",
    extracto:
      "US companies increasingly hire freelance talent in Latin America instead of paying US or offshoring to Asia. Here's what it actually costs, why the timezone overlap matters more than people think, and how to vet someone before you commit.",
    fecha: "2026-08-20",
    minutosLectura: 6,
    contenido: [
      {
        tipo: "parrafo",
        texto:
          "If you run a US business and you've priced out hiring a developer, designer, or virtual assistant lately, you already know the numbers are rough. A growing number of companies are solving this by hiring independent professionals in Latin America instead — not as a downgrade from US talent, but as a genuinely better fit for a lot of work: similar working hours, strong English proficiency in many markets, and rates that make sense for a small business or a lean team. Here's what that actually looks like in practice.",
      },
      {
        tipo: "titulo",
        texto: "What it actually costs",
      },
      {
        tipo: "parrafo",
        texto:
          "The average freelance developer in the US charges around $82.50/hour, and senior engineers in major tech hubs regularly bill $140–160/hour or more. In Latin America, rates typically run $30–55/hour across seniority levels and countries — senior developers in Argentina or Uruguay can land in the $65–80/hour range, while mid-level talent in Colombia, Peru, or Mexico is often $22–45/hour. Roughly speaking, that's 55–70% lower cost than the US for comparable work. Designers, virtual assistants, marketers, and accountants follow a similar pattern, though the gap is usually smaller for non-technical roles.",
      },
      {
        tipo: "titulo",
        texto: "Why the timezone actually matters",
      },
      {
        tipo: "parrafo",
        texto:
          "The cost savings get most of the attention, but for a lot of US teams the bigger practical win is timezone overlap. Colombia, Peru, and Ecuador run on the same time as US Eastern or Central time for most of the year; Mexico spans US Central to Pacific. That means you can hop on a call at 10am your time without anyone staying up until midnight, and a message you send in the morning gets a same-day reply — something that's much harder to pull off when your contractor is 12 hours away. If your work involves any live collaboration at all (stand-ups, client calls, fast iteration), this alone is often worth more than the hourly rate difference.",
      },
      {
        tipo: "titulo",
        texto: "What to check before you hire",
      },
      {
        tipo: "lista",
        items: [
          "Real work samples, not just a list of past clients or a generic portfolio page.",
          "English proficiency appropriate to the role — a quick call tells you more than a resume claim.",
          "A direct way to reach them (phone, WhatsApp, email) rather than only a platform inbox.",
          "How they respond to your first few questions — it's usually a preview of how the project will go.",
          "Clear agreement on scope, price, and timeline in writing before work starts, even if it's just a short email.",
        ],
      },
      {
        tipo: "titulo",
        texto: "Where to find them",
      },
      {
        tipo: "parrafo",
        texto:
          "General freelance marketplaces work, but they put you in a bidding war against a huge global pool, which tends to reward the lowest bidder rather than the best fit. Referrals are still the most reliable source if you have any connection to the region. Region-focused platforms are the middle ground: chaski, for example, is built specifically around Latin American professionals — you post what you need for free and interested professionals contact you directly, with no bidding war and no platform commission cutting into their rate or inflating yours.",
      },
      {
        tipo: "titulo",
        texto: "A reasonable way to start",
      },
      {
        tipo: "parrafo",
        texto:
          "Start with a small, well-defined project rather than a long-term commitment — it's the fastest way to see how someone actually communicates and delivers before you rely on them for something bigger. If you're ready to try it, you can post a project on chaski for free and hear directly from LatAm professionals who are a fit for what you need.",
      },
    ],
  },
];

export function obtenerPostEn(slug: string) {
  return POSTS_EN.find((p) => p.slug === slug);
}
