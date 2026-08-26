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
  {
    slug: "how-to-vet-a-latam-freelancer",
    titulo: "How to Vet a Freelancer in Latin America: Questions to Ask and Red Flags to Watch",
    categoria: "Guide for clients",
    imagen: "/images/blog/how-to-vet-a-latam-freelancer.webp",
    imagenAlt: "A client on a video call with a freelance professional, reviewing a checklist",
    descripcionMeta:
      "A practical checklist for US businesses hiring freelancers in Latin America: what to ask on a first call, how to verify real work, and the red flags that matter most before you pay.",
    extracto:
      "Cost and timezone are easy to evaluate. Trust is the hard part. Here's a practical way to vet a LatAm freelancer before you commit — what to ask, what to check, and the red flags that actually matter.",
    fecha: "2026-08-26",
    minutosLectura: 5,
    contenido: [
      {
        tipo: "parrafo",
        texto:
          "Cost savings and timezone overlap are easy to evaluate on paper. What actually stops US businesses from hiring in Latin America is trust — you can't walk over to someone's desk, and if a project goes wrong, recourse feels murky. The good news is that vetting a freelancer abroad isn't fundamentally different from vetting one down the street. It just requires being a bit more deliberate about a few specific things.",
      },
      {
        tipo: "titulo",
        texto: "Start with a video call, not just messages",
      },
      {
        tipo: "parrafo",
        texto:
          "A 15-minute video call tells you more than a week of back-and-forth messages. You're checking for two things: does this person understand what you're actually trying to accomplish (not just what you typed), and do they communicate clearly enough that a project won't get lost in translation — literal or otherwise. If someone avoids a call and insists on text-only, that's worth noting, not necessarily disqualifying, but worth noting.",
      },
      {
        tipo: "titulo",
        texto: "Ask for work tied to specific claims",
      },
      {
        tipo: "parrafo",
        texto:
          "Anyone can send a portfolio link. What's harder to fake is context: ask what their specific role was on a past project, what the client's actual goal was, and what they'd do differently now. A freelancer who did the work can answer this in seconds. Someone padding a portfolio usually can't get past the first follow-up question.",
      },
      {
        tipo: "titulo",
        texto: "Get a direct way to reach them",
      },
      {
        tipo: "parrafo",
        texto:
          "A phone number, WhatsApp, or personal email — something outside whatever platform you found them on. This matters less for security and more as a signal: professionals who plan to be around for repeat work are generally fine sharing this. Someone who's cagey about it, or only wants contact routed through an inbox they might abandon tomorrow, is a mild flag.",
      },
      {
        tipo: "titulo",
        texto: "Start with a small, well-defined project",
      },
      {
        tipo: "parrafo",
        texto:
          "This is the single best risk-reducer available, and it costs you almost nothing. Instead of committing to a three-month engagement on day one, scope a small piece of real work — a single deliverable, a one-week sprint, something with a clear finish line. You learn more about how someone actually works from one small project than from any number of calls or portfolio reviews, and if it doesn't go well, the downside is contained.",
      },
      {
        tipo: "titulo",
        texto: "Red flags worth taking seriously",
      },
      {
        tipo: "lista",
        items: [
          "Asking for full payment upfront before any work or scope has been agreed on.",
          "Vague or evasive answers when you ask specific questions about how they'll approach the work.",
          "Pricing dramatically below the range you're seeing from comparable profiles, with no clear reason why.",
          "No verifiable way to reach them outside a single messaging thread.",
          "Pressure to skip a small trial project and jump straight to a large, long-term commitment.",
        ],
      },
      {
        tipo: "titulo",
        texto: "Where verification can do some of this work for you",
      },
      {
        tipo: "parrafo",
        texto:
          "None of this has to be entirely manual. On chaski, professionals can verify their identity, and verified profiles show a badge on their public page — it's not a guarantee of quality, but it does confirm the person behind the profile is who they say they are, which removes one layer of uncertainty before you even get on a call.",
      },
      {
        tipo: "parrafo",
        texto:
          "None of this takes more than an extra hour of diligence, and it applies whether you're hiring across the hall or across a continent. If you're ready to start, you can post a project on chaski for free and hear directly from LatAm professionals who fit what you need.",
      },
    ],
  },
];

export function obtenerPostEn(slug: string) {
  return POSTS_EN.find((p) => p.slug === slug);
}
