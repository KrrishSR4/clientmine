import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  Search,
  Filter,
  Database,
  Download,
  ShieldCheck,
  TrendingUp,
  Building2,
  Users,
  Zap,
  CheckCircle2,
  Terminal,
  Crosshair,
  Radar,
  Plus,
} from "lucide-react";

import { SiteHeader } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/Footer";
import { Reveal, Counter } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ClientsMine — Hunt restaurants & cafes with no website" },
      {
        name: "description",
        content:
          "ClientsMine is a tactical lead-finder for freelance web devs. Scan any city, surface businesses missing a website, export verified leads in 60 seconds.",
      },
      { name: "keywords", content: "freelance web design leads, restaurants without website, cafe leads, local business leads, lead generation for freelancers" },
      { property: "og:title", content: "ClientsMine — Lead-finder for freelance web devs" },
      { property: "og:description", content: "Tactical prospecting tool. Scan, filter, export. Zero noise." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "ClientsMine",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "128" },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <Marquee />
        <Features />
        <WhyWebsites />
        <HowItWorks />
        <Benefits />
        <Stats />
        <FAQ />
        <CTA />
      </main>
      <SiteFooter />
    </div>
  );
}

/* -------------------- HERO -------------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden border-b hairline">
      {/* Layered tactical background */}
      <div aria-hidden className="absolute inset-0 blueprint-bg opacity-60" />
      <div aria-hidden className="absolute inset-0 scanlines opacity-40" />
      <div aria-hidden className="absolute inset-0 noise-bg" />
      {/* Lime glow blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-[140px] opacity-30 animate-drift-1"
        style={{ background: "radial-gradient(circle, oklch(0.88 0.22 128 / 0.55), transparent 60%)" }}
      />
      {/* Corner tickmarks */}
      <CornerTicks />

      <div className="container-prose relative py-24 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border hairline bg-surface/80 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground backdrop-blur shadow-card">
            <span className="size-1.5 rounded-full bg-accent-lime pulse-dot" />
            v1.0 · Live target acquisition
          </div>

          <h1 className="text-display text-balance text-[52px] leading-[0.92] tracking-[-0.045em] sm:text-[78px] md:text-[104px]">
            Hunt clients
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">before</span>
              <span aria-hidden className="absolute inset-x-0 bottom-1 h-3 -skew-x-6 bg-accent-lime/70 md:bottom-2 md:h-4" />
            </span>{" "}
            <span className="font-mono text-[0.7em] font-medium italic text-muted-foreground">/</span>{" "}
            anyone else does.
          </h1>

          <p className="mx-auto mt-8 max-w-[36rem] text-pretty text-[16px] leading-[1.65] text-muted-foreground sm:text-[18px]">
            ClientsMine is a tactical lead-finder for freelance devs. Scan any city,
            surface restaurants & cafes <span className="text-foreground">still missing a website</span>,
            export clean data. Zero noise. Zero fabricated emails.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="shine-btn group h-12 rounded-md bg-accent-lime px-6 font-mono text-[13px] font-semibold uppercase tracking-widest text-accent-lime-foreground shadow-lime transition-transform duration-200 hover:-translate-y-px hover:bg-accent-lime"
            >
              <Link to="/leads">
                <Crosshair className="size-4 transition-transform duration-300 group-hover:rotate-90" />
                Start Hunting
                <ArrowRight className="ml-0.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <a
              href="#how"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border hairline bg-surface/60 px-5 font-mono text-[12px] uppercase tracking-widest text-muted-foreground backdrop-blur transition-colors hover:bg-surface-muted hover:text-foreground"
            >
              <Terminal className="size-3.5" />
              View ops manual
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="size-3 text-accent-lime" /> No signup</span>
            <span className="opacity-30">·</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="size-3 text-accent-lime" /> CSV / Excel export</span>
            <span className="opacity-30">·</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="size-3 text-accent-lime" /> Outreach-ready</span>
          </div>
        </motion.div>

        <Reveal delay={0.2} className="relative mx-auto mt-16 max-w-5xl">
          <div className="group relative overflow-hidden rounded-xl border hairline bg-surface shadow-card-lg">
            {/* Scan line animation */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 opacity-0 transition-opacity group-hover:opacity-100">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-accent-lime to-transparent animate-scan" />
            </div>
            <div className="flex items-center justify-between border-b hairline bg-surface-elev px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-foreground/15" />
                <span className="size-2.5 rounded-full bg-foreground/15" />
                <span className="size-2.5 rounded-full bg-foreground/15" />
              </div>
              <span className="font-mono text-[11px] tracking-wider text-muted-foreground">
                clientsmine.app/leads
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-accent-lime">
                <span className="size-1.5 rounded-full bg-accent-lime pulse-dot" />
                LIVE
              </span>
            </div>
            <DashboardPreview />
          </div>
          {/* Floating spec badges */}
          <div className="pointer-events-none absolute -left-4 top-1/3 hidden rotate-[-90deg] origin-left font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 md:block">
            FIG.01 · TARGETING UI
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CornerTicks() {
  return (
    <>
      {[
        "left-6 top-6",
        "right-6 top-6 rotate-90",
        "left-6 bottom-6 -rotate-90",
        "right-6 bottom-6 rotate-180",
      ].map((pos) => (
        <Plus
          key={pos}
          aria-hidden
          className={`pointer-events-none absolute size-3 text-muted-foreground/40 ${pos}`}
        />
      ))}
    </>
  );
}

function DashboardPreview() {
  const rows = [
    { name: "Trattoria Bellini", city: "Florence, IT", rating: 4.7 },
    { name: "Café du Marché", city: "Lyon, FR", rating: 4.6 },
    { name: "Sakura Ramen Bar", city: "Osaka, JP", rating: 4.8 },
    { name: "Olive & Vine", city: "Athens, GR", rating: 4.5 },
    { name: "El Rincón Tapas", city: "Sevilla, ES", rating: 4.6 },
  ];
  return (
    <div className="grid grid-cols-12 gap-0">
      <div className="col-span-3 hidden border-r hairline bg-surface-elev/60 p-4 md:block">
        <div className="text-eyebrow mb-3">Query</div>
        <div className="space-y-2 font-mono text-[12px]">
          <div className="rounded-md border hairline bg-surface px-3 py-2 text-foreground">Florence</div>
          <div className="rounded-md border hairline bg-surface px-3 py-2 text-muted-foreground">Italy</div>
          <div className="rounded-md border hairline bg-surface px-3 py-2">cafe + restaurant</div>
          <div className="rounded-md border hairline bg-surface px-3 py-2">limit: 100</div>
        </div>
        <Button size="sm" className="mt-3 h-9 w-full rounded-md bg-accent-lime font-mono text-[11px] uppercase tracking-widest text-accent-lime-foreground hover:bg-accent-lime/90">
          Execute scan
        </Button>
      </div>
      <div className="col-span-12 md:col-span-9">
        <div className="flex items-center justify-between border-b hairline bg-surface-muted/30 px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          <span>
            <span className="text-accent-lime">87</span> targets · 142 scanned
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Download className="size-3" /> Export
          </span>
        </div>
        <table className="w-full text-[13px]">
          <thead className="text-left font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <tr className="border-b hairline">
              <th className="px-5 py-2.5 font-medium">Target</th>
              <th className="px-5 py-2.5 font-medium">Location</th>
              <th className="px-5 py-2.5 font-medium">★</th>
              <th className="px-5 py-2.5 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-b hairline last:border-0 transition-colors hover:bg-surface-elev/60">
                <td className="px-5 py-3 font-medium text-foreground">{r.name}</td>
                <td className="px-5 py-3 font-mono text-[12px] text-muted-foreground">{r.city}</td>
                <td className="px-5 py-3 font-mono text-[12px] text-foreground">{r.rating}</td>
                <td className="px-5 py-3">
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-accent-lime/30 bg-accent-lime/10 px-2 py-0.5 font-mono text-[10px] tracking-widest text-accent-lime">
                    <span className="size-1.5 rounded-full bg-accent-lime" />
                    NO_SITE
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* -------------------- MARQUEE -------------------- */
function Marquee() {
  const items = [
    "Solo freelancers",
    "Indie studios",
    "Growth hackers",
    "Web shops",
    "Local agencies",
    "Sales teams",
    "Cold-email pros",
    "Niche operators",
  ];
  return (
    <section className="overflow-hidden border-b hairline bg-surface/40 py-5">
      <div className="relative flex">
        <div className="flex shrink-0 animate-marquee gap-12 pr-12 font-mono text-[12px] uppercase tracking-[0.2em] text-muted-foreground">
          {[...items, ...items].map((i, idx) => (
            <span key={idx} className="inline-flex items-center gap-3 whitespace-nowrap">
              <span className="size-1 rounded-full bg-accent-lime" />
              {i}
            </span>
          ))}
        </div>
        <div className="flex shrink-0 animate-marquee gap-12 pr-12 font-mono text-[12px] uppercase tracking-[0.2em] text-muted-foreground">
          {[...items, ...items].map((i, idx) => (
            <span key={`b${idx}`} className="inline-flex items-center gap-3 whitespace-nowrap">
              <span className="size-1 rounded-full bg-accent-lime" />
              {i}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- FEATURES -------------------- */
function Features() {
  const features = [
    { icon: Search, n: "F01", title: "Hyper-targeted search", desc: "Filter by city, country, and business type. Surface only what you want — restaurants, cafes, or both." },
    { icon: Filter, n: "F02", title: "Automatic site filter", desc: "We only show businesses with no website. No noise, no duplicates, no manual cleanup." },
    { icon: Database, n: "F03", title: "Verified Google data", desc: "Names, ratings, addresses, phones and Maps links sourced live from Google Places." },
    { icon: Download, n: "F04", title: "One-click export", desc: "Clean CSV or Excel files, named by city and date — ready for your CRM or outreach tool." },
    { icon: ShieldCheck, n: "F05", title: "No fabricated data", desc: "We never invent emails. If a public business email isn't available, we say so. Your reputation matters." },
    { icon: Zap, n: "F06", title: "Instant results", desc: "No signup, no waiting. Open the tool, run a query, get leads in under a minute." },
  ];
  return (
    <section id="features" className="relative overflow-hidden border-b hairline py-24 md:py-32">
      <div aria-hidden className="absolute inset-0 cross-bg opacity-40" />
      <div className="container-prose relative">
        <Reveal>
          <div className="flex items-end justify-between gap-8">
            <div>
              <div className="text-eyebrow">// Capability matrix</div>
              <h2 className="text-display mt-4 max-w-2xl text-4xl md:text-6xl">
                Everything you need.
                <br />
                <span className="text-muted-foreground">Nothing you don't.</span>
              </h2>
            </div>
            <div className="hidden font-mono text-[11px] uppercase tracking-widest text-muted-foreground md:block">
              06 / 06 modules
            </div>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border hairline bg-hairline md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <div className="lift-card corner-accent group relative h-full bg-surface p-7 hover:bg-surface-elev">
                <div className="flex items-center justify-between">
                  <div className="inline-flex size-10 items-center justify-center rounded-md border hairline bg-background text-accent-lime transition-all duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-6deg] group-hover:scale-110 group-hover:border-accent-lime/60 group-hover:shadow-lime">
                    <f.icon className="size-4" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 transition-colors group-hover:text-accent-lime">
                    {f.n}
                  </span>
                </div>
                <h3 className="mt-5 text-[16px] font-semibold tracking-tight transition-colors group-hover:text-accent-lime">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- WHY WEBSITES -------------------- */
function WhyWebsites() {
  const items = [
    { stat: "97%", text: "of consumers look up a local business online before visiting." },
    { stat: "3×", text: "more inbound calls & bookings for businesses with a website." },
    { stat: "↑", text: "Google ranks businesses with active sites significantly higher in local search." },
    { stat: "1mo", text: "average payback period for a basic website investment." },
  ];
  return (
    <section className="relative border-b hairline bg-surface/30 py-24 md:py-32">
      <div aria-hidden className="absolute inset-0 dot-bg opacity-30" />
      <div className="container-prose relative grid gap-12 md:grid-cols-2">
        <Reveal>
          <div className="text-eyebrow">// The opening</div>
          <h2 className="text-display mt-4 text-4xl md:text-6xl">
            They need a site.
            <br />
            <span className="text-accent-lime">Yesterday.</span>
          </h2>
          <p className="mt-6 max-w-md text-muted-foreground">
            Millions of restaurants and cafes are invisible online. They're
            bleeding customers to competitors with even a basic web presence.
            That's your shot.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-md border hairline bg-surface-elev px-4 py-2.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <Radar className="size-3.5 text-accent-lime" />
            Market signal · strong
          </div>
        </Reveal>
        <div className="space-y-3">
          {items.map((t, i) => (
            <Reveal key={t.text} delay={i * 0.06}>
              <div className="group flex items-start gap-5 rounded-lg border hairline bg-surface p-5 transition-all hover:border-accent-lime/40 hover:bg-surface-elev">
                <div className="font-display text-2xl font-bold tabular-nums tracking-tight text-accent-lime md:text-3xl">
                  {t.stat}
                </div>
                <p className="text-[15px] leading-relaxed">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- HOW IT WORKS -------------------- */
function HowItWorks() {
  const steps = [
    { n: "01", title: "Choose your market", desc: "Pick a city, country and the business types you want to target.", cmd: "$ clientsmine target --city florence" },
    { n: "02", title: "Run the scan", desc: "We query Google Places, filter out anyone with a website, de-duplicate.", cmd: "$ clientsmine scan --filter no_website" },
    { n: "03", title: "Review & export", desc: "Browse leads in a premium table, then export to CSV or Excel.", cmd: "$ clientsmine export --format csv" },
  ];
  return (
    <section id="how" className="border-b hairline py-24 md:py-32">
      <div className="container-prose">
        <Reveal>
          <div className="text-eyebrow">// Standard operating procedure</div>
          <h2 className="text-display mt-4 max-w-2xl text-4xl md:text-6xl">
            Three steps.
            <br />
            <span className="text-muted-foreground">Sixty seconds.</span>
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="lift-card corner-accent group relative h-full overflow-hidden rounded-xl border hairline bg-surface p-7 hover:border-accent-lime/40">
                <div className="flex items-baseline justify-between">
                  <div className="text-display text-5xl font-bold tracking-tight text-accent-lime transition-transform duration-300 group-hover:-translate-y-1">
                    {s.n}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    STEP
                  </div>
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <div className="mt-6 overflow-hidden rounded-md border hairline bg-background/60 px-3 py-2 font-mono text-[11px] text-muted-foreground transition-colors group-hover:border-accent-lime/30">
                  <span className="text-accent-lime">{s.cmd.split(" ")[0]}</span>
                  {s.cmd.slice(s.cmd.indexOf(" "))}
                  <span className="ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-accent-lime animate-blink" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- BENEFITS -------------------- */
function Benefits() {
  return (
    <section className="border-b hairline py-24 md:py-32">
      <div className="container-prose grid gap-6 md:grid-cols-2">
        <Reveal>
          <BenefitCard
            icon={Users}
            badge="Freelancers"
            title="A pipeline that runs itself."
            points={[
              "Stop cold-emailing random businesses.",
              "Target only businesses that visibly need your service.",
              "Charge premium rates with a sharper pitch.",
              "Build a repeatable, niche-focused outreach machine.",
            ]}
          />
        </Reveal>
        <Reveal delay={0.08}>
          <BenefitCard
            icon={Building2}
            badge="Agencies"
            title="Scale prospecting without scaling headcount."
            points={[
              "Spin up city-by-city campaigns in minutes.",
              "Hand sales teams structured, export-ready data.",
              "Validate new markets before you invest in them.",
              "Reduce CAC with cleaner, higher-intent leads.",
            ]}
          />
        </Reveal>
      </div>
    </section>
  );
}

function BenefitCard({
  icon: Icon,
  badge,
  title,
  points,
}: {
  icon: typeof Users;
  badge: string;
  title: string;
  points: string[];
}) {
  return (
    <div className="lift-card group relative h-full overflow-hidden rounded-xl border hairline bg-surface p-8 hover:border-accent-lime/40">
      <div aria-hidden className="absolute inset-0 cross-bg opacity-20" />
      <div className="relative">
        <div className="inline-flex items-center gap-2 rounded-md border hairline bg-surface-elev px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-accent-lime">
          <Icon className="size-3" /> {badge}
        </div>
        <h3 className="text-display mt-6 text-3xl md:text-4xl">{title}</h3>
        <ul className="mt-7 space-y-3.5">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-3 text-[15px]">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-lime" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* -------------------- STATS -------------------- */
function Stats() {
  const stats = [
    { v: 36, suffix: "%", label: "of local restaurants still have no website." },
    { v: 50, suffix: "M+", label: "small food businesses indexed by Google Places." },
    { v: 3, suffix: "×", label: "more revenue from businesses with a web presence." },
    { v: 60, suffix: "s", label: "average time to generate your first 100 leads." },
  ];
  return (
    <section id="stats" className="relative overflow-hidden border-b hairline py-24 md:py-32">
      <div aria-hidden className="absolute inset-0 blueprint-bg opacity-40" />
      <div aria-hidden className="absolute inset-0 scanlines opacity-30" />
      <div className="container-prose relative">
        <Reveal>
          <div className="text-eyebrow">// By the numbers</div>
          <h2 className="text-display mt-4 max-w-3xl text-4xl md:text-6xl">
            A massive, underserved market
            <br />
            <span className="text-muted-foreground">hiding in plain sight.</span>
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border hairline bg-hairline md:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="group relative h-full bg-background p-8 transition-colors hover:bg-surface">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  / {String(i + 1).padStart(2, "0")}
                </div>
                <div className="text-display mt-4 text-6xl font-bold tracking-tight text-foreground md:text-7xl">
                  <Counter to={s.v} suffix={s.suffix} />
                </div>
                <p className="mt-4 max-w-[24ch] text-sm leading-relaxed text-muted-foreground">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- FAQ -------------------- */
function FAQ() {
  const qs = [
    { q: "Do I need to sign up to use ClientsMine?", a: "No. ClientsMine is fully usable without an account. Open the Lead Finder and start searching immediately." },
    { q: "Where does the data come from?", a: "All business data is sourced live from the Google Places API — names, addresses, phone numbers, ratings, and Maps links." },
    { q: "Do you provide email addresses?", a: "If a verified public business email is available, we include it. We never fabricate emails. If we can't find one, we display 'No Public Email Found'." },
    { q: "What can I export?", a: "Every result table can be exported as a CSV or Excel (.xlsx) file, named by city and date — ready to drop into any CRM or outreach tool." },
    { q: "Is this legal to use for outreach?", a: "Yes. We only return publicly listed business information. Always follow local outreach and anti-spam regulations when you contact businesses." },
    { q: "Can I search any city in the world?", a: "Yes. ClientsMine works globally — anywhere Google Places has coverage, which is virtually every populated area on Earth." },
  ];
  return (
    <section id="faq" className="border-b hairline py-24 md:py-32">
      <div className="container-prose grid gap-12 md:grid-cols-[1fr_1.5fr]">
        <Reveal>
          <div className="text-eyebrow">// FAQ</div>
          <h2 className="text-display mt-4 text-4xl md:text-6xl">
            Questions,
            <br />
            <span className="text-muted-foreground">answered.</span>
          </h2>
          <p className="mt-6 max-w-sm text-muted-foreground">
            Everything you might want to know before you run your first scan.
          </p>
        </Reveal>
        <div className="divide-y hairline border-y hairline">
          {qs.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.04}>
              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-[16px] font-medium tracking-tight transition-colors hover:text-accent-lime">
                  <span className="flex items-start gap-3">
                    <span className="mt-1 font-mono text-[11px] tracking-widest text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.q}
                  </span>
                  <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-md border hairline bg-surface-elev font-mono text-sm text-muted-foreground transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="ml-8 mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- CTA -------------------- */
function CTA() {
  return (
    <section className="relative overflow-hidden border-b hairline py-24 md:py-32">
      <div aria-hidden className="absolute inset-0 blueprint-bg opacity-50" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] opacity-40 animate-drift-2"
        style={{ background: "radial-gradient(circle, oklch(0.88 0.22 128 / 0.6), transparent 60%)" }}
      />
      <CornerTicks />
      <div className="container-prose relative text-center">
        <Reveal>
          <div className="text-eyebrow">// Ready to deploy</div>
          <h2 className="text-display mx-auto mt-6 max-w-3xl text-5xl md:text-7xl">
            Stop pitching cold.
            <br />
            <span className="relative inline-block">
              Start <span className="text-accent-lime">hunting</span>.
              <span aria-hidden className="absolute -bottom-2 left-0 h-1 w-full bg-accent-lime/50" />
            </span>
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
            One tool, one tab, zero friction. Your next client is already on Google Maps —
            ClientsMine just makes them findable.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="shine-btn group h-12 rounded-md bg-accent-lime px-7 font-mono text-[13px] font-semibold uppercase tracking-widest text-accent-lime-foreground shadow-lime transition-transform duration-200 hover:-translate-y-px hover:bg-accent-lime"
            >
              <Link to="/leads">
                <Crosshair className="size-4 transition-transform duration-300 group-hover:rotate-90" />
                Launch ClientsMine
                <ArrowRight className="ml-0.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <div className="mt-8 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            No signup · No credit card · Free forever
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function _TrendingPing() {
  // kept for potential reuse to silence unused import lint
  return <TrendingUp className="size-3" />;
}
export const _ping = _TrendingPing;
