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
  {
    slug: "how-to-onboard-a-latam-freelancer",
    titulo: "How to Onboard a Freelancer in Latin America (So the First 30 Days Actually Work)",
    categoria: "Guide for clients",
    imagen: "/images/blog/hire-latam-freelancers-cost-guide.webp",
    imagenAlt: "A manager and a new freelance team member on a video call during onboarding",
    descripcionMeta:
      "A practical onboarding checklist for US businesses working with freelancers in Latin America: setting expectations, communication cadence, and the mistakes that derail the first month.",
    extracto:
      "Hiring the right person is only half the job. Here's how to onboard a freelancer in Latin America so the first 30 days build trust instead of confusion — communication cadence, tools, and expectations.",
    fecha: "2026-09-07",
    minutosLectura: 5,
    contenido: [
      {
        tipo: "parrafo",
        texto:
          "Most of the advice on hiring in Latin America stops at the offer letter — cost comparisons, vetting checklists, red flags to avoid. But a good chunk of failed engagements aren't hiring mistakes at all. They're onboarding mistakes: nobody set clear expectations in the first week, and by week three both sides are frustrated for reasons that had nothing to do with skill.",
      },
      {
        tipo: "titulo",
        texto: "Put the working agreement in writing, even if it's short",
      },
      {
        tipo: "parrafo",
        texto:
          "Before any work starts, write down — even in a two-paragraph email — what's being delivered, by when, how often you'll check in, and how and when payment happens. This isn't about legal protection so much as making sure both sides are picturing the same engagement. A surprising number of early conflicts trace back to one side assuming weekly check-ins and the other assuming they'd only hear from you at the deadline.",
      },
      {
        tipo: "titulo",
        texto: "Agree on a communication cadence, not just a tool",
      },
      {
        tipo: "parrafo",
        texto:
          "Slack vs. email vs. WhatsApp matters less than agreeing on how often you'll actually talk. A short weekly check-in — 15 minutes, video on — does more for a new working relationship than daily async messages ever will, especially in the first few weeks. It's also the fastest way to catch a misunderstanding about scope before it turns into wasted work.",
      },
      {
        tipo: "titulo",
        texto: "Use the timezone overlap on purpose",
      },
      {
        tipo: "parrafo",
        texto:
          "Most of Latin America shares meaningful working-hour overlap with the US — that's one of the real advantages over hiring further offshore. Use it deliberately in the first weeks: schedule your check-ins during hours that work for both of you, and don't default to async-only just because the person is in a different country. The overlap is only useful if you actually take advantage of it.",
      },
      {
        tipo: "titulo",
        texto: "Give feedback early, even small feedback",
      },
      {
        tipo: "parrafo",
        texto:
          "Waiting until the final deliverable to say something isn't working wastes everyone's time. If the first draft is close but not quite right, say so after the first draft — not after the third. New collaborators, especially ones you haven't built a long history with yet, can't read between the lines the way a longtime team member might. Direct, early feedback is a kindness, not a criticism.",
      },
      {
        tipo: "titulo",
        texto: "Mistakes that derail the first month",
      },
      {
        tipo: "lista",
        items: [
          "No kickoff conversation — just a task list dropped in a message with no context on the bigger goal.",
          "Going silent between the hire and the first deliverable, then being surprised the result missed the mark.",
          "Changing scope mid-project without acknowledging that it changes the timeline or cost.",
          "Paying late or inconsistently, which erodes trust faster than almost anything else in a new working relationship.",
          "Treating the first project as a test instead of a real collaboration — freelancers can tell, and it shows in the effort back.",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "None of this is complicated, but it's easy to skip when you're moving fast. A clear first conversation, a simple cadence, and early feedback do more for a long-term working relationship than almost anything else you can control. If you're ready to find someone to build that relationship with, you can post a project on chaski for free and hear directly from LatAm professionals who fit what you need.",
      },
    ],
  },
  {
    slug: "employee-vs-freelancer-real-cost",
    titulo: "Employee vs. Freelancer: The Real Cost of Hiring In-House vs a LatAm Contractor",
    categoria: "Guide for clients",
    imagen: "/images/blog/employee-vs-freelancer-real-cost.webp",
    imagenAlt: "Split scene of an in-house employee working in an office next to a LatAm freelance contractor on a video call",
    descripcionMeta:
      "A real breakdown of what a US employee actually costs beyond salary — payroll taxes, benefits, overhead — compared to hiring a freelance contractor in Latin America.",
    extracto:
      "A $100,000 salary rarely means $100,000 in actual cost. Here's what a US employee really costs once you add payroll taxes and benefits, and how that compares to hiring a freelance contractor in Latin America.",
    fecha: "2026-09-10",
    minutosLectura: 5,
    contenido: [
      {
        tipo: "parrafo",
        texto:
          "When businesses compare the cost of hiring in-house versus hiring a freelancer, they usually compare salary to hourly rate — and that comparison is misleading in one specific way: a salary is never the full cost of an employee. There's a real, well-documented gap between what you pay someone and what it actually costs to employ them, and it matters a lot when you're deciding how to staff a project.",
      },
      {
        tipo: "titulo",
        texto: "What a $100K employee actually costs",
      },
      {
        tipo: "parrafo",
        texto:
          "According to SHRM and BLS data, the fully loaded cost of a US employee typically runs 1.25 to 1.4 times their base salary once you add mandatory payroll taxes (the employer's share of FICA), unemployment insurance, workers' comp, health insurance, retirement matching, and other benefits. Federal data puts benefit costs at roughly $13.68 per hour on top of $32.37 in wages for the average private-sector employee — meaning every dollar of salary carries about 40 cents in additional employer cost. So a $100,000 salary typically means $125,000–$140,000 in real cost to the business, before you even count equipment, office space, or management overhead.",
      },
      {
        tipo: "titulo",
        texto: "What a contractor actually costs",
      },
      {
        tipo: "parrafo",
        texto:
          "A freelance contractor invoicing $100,000 a year costs you exactly $100,000 — no employer-side payroll tax, no benefits, no unemployment insurance, no workers' comp. Contractors typically charge more per hour than an equivalent salaried role specifically because they're covering their own taxes and benefits out of that rate. But even accounting for a higher hourly rate, a well-scoped contractor engagement usually lands well below the fully loaded cost of an equivalent employee — especially if you don't need that role filled year-round.",
      },
      {
        tipo: "titulo",
        texto: "Where the LatAm comparison changes the math further",
      },
      {
        tipo: "parrafo",
        texto:
          "This is where hiring in Latin America specifically shifts the equation again: rates for comparable skill levels typically run 55–70% below US rates. So you're not just avoiding the 25–40% employer overhead of a US hire — you're also avoiding the rate premium that comes with US-based contractor pricing. Combined, the gap between 'fully loaded US employee' and 'LatAm contractor for the same output' is usually the single biggest cost lever available for a growing business, well before you get into negotiating vendor contracts or cutting other expenses.",
      },
      {
        tipo: "titulo",
        texto: "Where in-house still makes more sense",
      },
      {
        tipo: "parrafo",
        texto:
          "None of this means contractors are always the right call. In-house employees make more sense when a role needs deep, ongoing institutional knowledge, tight day-to-day integration with your team, or when the work genuinely requires someone full-time year-round rather than in defined projects. The cost math favors contractors most clearly for well-scoped, project-based work — which is exactly the kind of engagement that's easiest to start small and low-risk.",
      },
      {
        tipo: "titulo",
        texto: "A practical way to test it",
      },
      {
        tipo: "parrafo",
        texto:
          "Before committing to a full-time hire, price out what the same output would cost as a defined project with a freelance contractor. If a role can be scoped into deliverables rather than an open-ended job description, that's usually a sign a contractor engagement is worth testing first. If you're ready to try it, you can post a project on chaski for free and hear directly from LatAm professionals who fit what you need.",
      },
    ],
  },
];

export function obtenerPostEn(slug: string) {
  return POSTS_EN.find((p) => p.slug === slug);
}
