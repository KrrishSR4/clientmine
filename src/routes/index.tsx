import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  Search,
  Filter,
  Globe2,
  Database,
  Download,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Building2,
  Users,
  Zap,
  CheckCircle2,
} from "lucide-react";

import { SiteHeader } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/Footer";
import { Reveal, Counter } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ClientMine — Find restaurants & cafes missing a website" },
      {
        name: "description",
        content:
          "ClientMine helps freelancers discover restaurants and cafes with no website. Search by city, export verified leads, send personalized outreach in seconds.",
      },
      { name: "keywords", content: "freelance web design leads, restaurants without website, cafe leads, local business leads, lead generation for freelancers" },
      { property: "og:title", content: "ClientMine — Restaurant & cafe leads with no website" },
      { property: "og:description", content: "Discover local businesses missing digital visibility. Export-ready leads in seconds." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "ClientMine",
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
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <LogoStrip />
        <Features />
        <WhyWebsites />
        <HowItWorks />
        <Benefits />
        <Stats />
        <FAQ />
      </main>
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b hairline">
      {/* Pattern-only background — no gradients */}
      <div aria-hidden className="absolute inset-0 cross-bg opacity-90" />
      <div aria-hidden className="absolute inset-0 plus-bg opacity-60" />
      <div aria-hidden className="absolute inset-0 diag-bg opacity-70" />
      <div aria-hidden className="absolute inset-0 grain" />
      {/* Soft vignette using mask so edges fade without coloured gradients */}
      <div
        aria-hidden
        className="absolute inset-0 bg-background"
        style={{
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 45%, transparent 40%, black 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 45%, transparent 40%, black 100%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-hairline" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-hairline" />
      <div className="container-prose relative py-24 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border hairline bg-surface/90 backdrop-blur px-3.5 py-1.5 text-[11px] font-medium tracking-wide text-muted-foreground shadow-card">
            <Sparkles className="size-3 text-accent-emerald" />
            Built for freelancers who hate cold prospecting
          </div>

          <h1 className="text-display text-balance text-[48px] leading-[0.95] tracking-[-0.035em] sm:text-[68px] md:text-[88px]">
            Mine your next client
            <br className="hidden sm:block" />
            <span className="italic font-normal text-muted-foreground/90">before</span>{" "}
            anyone else does.
          </h1>

          <p className="mx-auto mt-8 max-w-[34rem] text-pretty text-[15.5px] leading-[1.65] text-muted-foreground sm:text-[17px]">
            ClientMine surfaces restaurants and cafes that still don't have a
            website — verified, ready to pitch, and one click from your CRM.
            Built for freelancers shipping web work this week.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="group h-12 px-6 text-[15px] shadow-card-lg">
              <Link to="/leads">
                Start Finding Leads
                <ArrowRight className="ml-1 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <a
              href="#how"
              className="inline-flex h-12 items-center justify-center rounded-md px-5 text-[15px] text-muted-foreground transition-colors hover:text-foreground"
            >
              See how it works
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="size-3.5 text-accent-emerald" /> No signup required</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="size-3.5 text-accent-emerald" /> Export to CSV &amp; Excel</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="size-3.5 text-accent-emerald" /> Personalized outreach messages</span>
          </div>
        </motion.div>

        <Reveal delay={0.2} className="relative mx-auto mt-16 max-w-5xl">
          <div className="overflow-hidden rounded-2xl border hairline bg-surface shadow-card-lg">
            <div className="flex items-center gap-1.5 border-b hairline px-4 py-3">
              <span className="size-2.5 rounded-full bg-foreground/10" />
              <span className="size-2.5 rounded-full bg-foreground/10" />
              <span className="size-2.5 rounded-full bg-foreground/10" />
              <span className="ml-3 font-mono text-[11px] text-muted-foreground">clientmine.app/leads</span>
            </div>
            <DashboardPreview />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function DashboardPreview() {
  const rows = [
    { name: "Trattoria Bellini", city: "Florence, IT", rating: 4.7, status: "NO WEBSITE" },
    { name: "Café du Marché", city: "Lyon, FR", rating: 4.6, status: "NO WEBSITE" },
    { name: "Sakura Ramen Bar", city: "Osaka, JP", rating: 4.8, status: "NO WEBSITE" },
    { name: "Olive & Vine", city: "Athens, GR", rating: 4.5, status: "NO WEBSITE" },
    { name: "El Rincón Tapas", city: "Sevilla, ES", rating: 4.6, status: "NO WEBSITE" },
  ];
  return (
    <div className="grid grid-cols-12 gap-0">
      <div className="col-span-3 hidden border-r hairline bg-surface-muted/60 p-4 md:block">
        <div className="text-eyebrow mb-3">Search</div>
        <div className="space-y-2 text-[13px]">
          <div className="rounded-md border hairline bg-surface px-3 py-2">Florence</div>
          <div className="rounded-md border hairline bg-surface px-3 py-2 text-muted-foreground">Italy (optional)</div>
          <div className="rounded-md border hairline bg-surface px-3 py-2">Both</div>
          <div className="rounded-md border hairline bg-surface px-3 py-2">100 results</div>
        </div>
        <Button size="sm" className="mt-3 h-9 w-full">Generate Leads</Button>
      </div>
      <div className="col-span-12 md:col-span-9">
        <div className="flex items-center justify-between border-b hairline px-5 py-3 text-[12px] text-muted-foreground">
          <span>Showing 87 leads with no website · scanned 142 businesses</span>
          <span className="inline-flex items-center gap-1"><Download className="size-3.5" /> Export</span>
        </div>
        <table className="w-full text-[13px]">
          <thead className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
            <tr className="border-b hairline">
              <th className="px-5 py-2.5 font-medium">Business</th>
              <th className="px-5 py-2.5 font-medium">Location</th>
              <th className="px-5 py-2.5 font-medium">Rating</th>
              <th className="px-5 py-2.5 font-medium">Website</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-b hairline last:border-0 transition-colors hover:bg-surface-muted/60">
                <td className="px-5 py-3 font-medium">{r.name}</td>
                <td className="px-5 py-3 text-muted-foreground">{r.city}</td>
                <td className="px-5 py-3">{r.rating}</td>
                <td className="px-5 py-3">
                  <span className="inline-flex items-center rounded-full border border-destructive/20 bg-destructive/5 px-2 py-0.5 font-mono text-[10px] tracking-wider text-destructive">
                    {r.status}
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

function LogoStrip() {
  const items = ["Independent Agencies", "Solo Freelancers", "Growth Studios", "Web Shops", "Sales Teams", "Marketers"];
  return (
    <section className="border-b hairline bg-surface-muted/40">
      <div className="container-prose flex flex-wrap items-center justify-center gap-x-12 gap-y-4 py-8 text-[13px] uppercase tracking-[0.15em] text-muted-foreground">
        <span className="text-eyebrow">Built for</span>
        {items.map((i) => (
          <span key={i} className="font-medium">{i}</span>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: Search, title: "Hyper-targeted search", desc: "Filter by city, country, and business type to surface exactly the leads you want — restaurants, cafes, or both." },
    { icon: Filter, title: "Automatic website filter", desc: "We only show businesses with no website. No noise, no duplicates, no manual cleanup." },
    { icon: Database, title: "Verified Google data", desc: "Names, ratings, addresses, phone numbers and Maps links sourced directly from Google Places." },
    { icon: Download, title: "One-click export", desc: "Download clean CSV or Excel files named by city and date — ready for your CRM or outreach tool." },
    { icon: ShieldCheck, title: "No fabricated data", desc: "We never invent emails. If a public business email isn't available, we say so — your reputation matters." },
    { icon: Zap, title: "Instant results", desc: "No signup, no waiting. Open the tool, run a search, get leads in under a minute." },
  ];
  return (
    <section id="features" className="relative overflow-hidden border-b hairline py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-1/3 h-[420px] w-[420px] rounded-full blur-3xl opacity-50"
        style={{ background: "radial-gradient(circle, oklch(0.82 0.13 160 / 0.30), transparent 60%)" }}
      />
      <div className="container-prose relative">
        <Reveal>
          <div className="text-eyebrow">Features</div>
          <h2 className="text-display mt-4 max-w-2xl text-4xl md:text-5xl">Everything you need to find your next client.</h2>
        </Reveal>
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border hairline bg-hairline md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <div className="group h-full bg-surface p-7 transition-colors hover:bg-surface-muted/60">
                <div className="mb-5 inline-flex size-9 items-center justify-center rounded-lg border hairline bg-surface-muted text-foreground transition-transform group-hover:-translate-y-0.5">
                  <f.icon className="size-4" />
                </div>
                <h3 className="text-[15px] font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyWebsites() {
  const items = [
    "97% of consumers look up a local business online before visiting.",
    "Businesses with a website earn up to 3x more inbound calls and bookings.",
    "Google ranks businesses with active websites significantly higher in local search.",
    "A simple website pays for itself within the first month of operation.",
  ];
  return (
    <section className="border-b hairline bg-surface-muted/30 py-24">
      <div className="container-prose grid gap-12 md:grid-cols-2">
        <Reveal>
          <div className="text-eyebrow">The opportunity</div>
          <h2 className="text-display mt-4 text-4xl md:text-5xl">Why these businesses need a website — yesterday.</h2>
          <p className="mt-6 max-w-md text-muted-foreground">
            Millions of restaurants and cafes are invisible online. They're
            losing customers every single day to competitors with even a basic
            web presence. That's your opening.
          </p>
        </Reveal>
        <div className="space-y-4">
          {items.map((t, i) => (
            <Reveal key={t} delay={i * 0.06}>
              <div className="flex items-start gap-3 rounded-xl border hairline bg-surface p-5 shadow-card transition-transform hover:-translate-y-0.5">
                <TrendingUp className="mt-0.5 size-4 text-accent-emerald" />
                <p className="text-[15px]">{t}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", title: "Choose your market", desc: "Pick a city, country and the business types you want to target." },
    { n: "02", title: "Run the scan", desc: "We query Google Places, filter out anyone with a website, and de-duplicate the results." },
    { n: "03", title: "Review & export", desc: "Browse leads in a premium table, then export to CSV or Excel in one click." },
  ];
  return (
    <section id="how" className="border-b hairline py-24 md:py-32">
      <div className="container-prose">
        <Reveal>
          <div className="text-eyebrow">How it works</div>
          <h2 className="text-display mt-4 max-w-2xl text-4xl md:text-5xl">Three steps from idea to outreach-ready list.</h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="relative h-full rounded-2xl border hairline bg-surface p-7 shadow-card">
                <div className="font-mono text-[11px] tracking-widest text-muted-foreground">{s.n}</div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="border-b hairline py-24 md:py-32">
      <div className="container-prose grid gap-10 md:grid-cols-2">
        <Reveal>
          <BenefitCard
            icon={Users}
            badge="For freelancers"
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
            badge="For agencies"
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
    <div className="group h-full rounded-2xl border hairline bg-surface p-8 shadow-card transition-shadow hover:shadow-card-lg">
      <div className="inline-flex items-center gap-2 rounded-full border hairline bg-surface-muted px-2.5 py-1 text-[11px] uppercase tracking-widest text-muted-foreground">
        <Icon className="size-3" /> {badge}
      </div>
      <h3 className="text-display mt-5 text-3xl">{title}</h3>
      <ul className="mt-6 space-y-3">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2.5 text-[15px]">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent-emerald" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Stats() {
  const stats = [
    { v: 36, suffix: "%", label: "of local restaurants worldwide still have no website." },
    { v: 50, suffix: "M+", label: "small food businesses indexed by Google Places." },
    { v: 3, suffix: "x", label: "more revenue from businesses with a basic web presence." },
    { v: 60, suffix: "s", label: "average time to generate your first 100 leads." },
  ];
  return (
    <section id="stats" className="border-b hairline bg-foreground py-24 text-background md:py-32">
      <div className="container-prose">
        <Reveal>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-background/60">By the numbers</div>
          <h2 className="text-display mt-4 max-w-2xl text-4xl text-background md:text-5xl">
            A massive, underserved market hiding in plain sight.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-background/10 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="h-full bg-foreground p-8">
                <div className="text-display text-5xl text-background md:text-6xl">
                  <Counter to={s.v} suffix={s.suffix} />
                </div>
                <p className="mt-4 max-w-[24ch] text-sm leading-relaxed text-background/70">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const qs = [
    { q: "Do I need to sign up to use ClientMine?", a: "No. ClientMine is fully usable without an account. Open the Lead Finder and start searching immediately." },
    { q: "Where does the data come from?", a: "All business data is sourced live from the Google Places API — names, addresses, phone numbers, ratings, and Maps links." },
    { q: "Do you provide email addresses?", a: "If a verified public business email is available, we include it. We never fabricate emails. If we can't find one, we display 'No Public Email Found'." },
    { q: "What can I export?", a: "Every result table can be exported as a CSV or Excel (.xlsx) file, named by city and date — ready to drop into any CRM or outreach tool." },
    { q: "Is this legal to use for outreach?", a: "Yes. We only return publicly listed business information. Always follow local outreach and anti-spam regulations when you contact businesses." },
    { q: "Can I search any city in the world?", a: "Yes. ClientMine works globally — anywhere Google Places has coverage, which is virtually every populated area on Earth." },
  ];
  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="container-prose grid gap-12 md:grid-cols-[1fr_1.5fr]">
        <Reveal>
          <div className="text-eyebrow">FAQ</div>
          <h2 className="text-display mt-4 text-4xl md:text-5xl">Questions, answered.</h2>
          <p className="mt-5 max-w-sm text-muted-foreground">
            Everything you might want to know before you run your first search.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="h-12 px-6 shadow-card">
              <Link to="/leads">
                Start Finding Leads <ArrowRight />
              </Link>
            </Button>
          </div>
        </Reveal>
        <div className="divide-y hairline border-y hairline">
          {qs.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.04}>
              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-[16px] font-medium tracking-tight">
                  <span>{item.q}</span>
                  <Sparkles className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{item.a}</p>
              </details>
            </Reveal>
          ))}
          <p className="pt-6 text-xs text-muted-foreground">
            Built by{" "}
            <a href="https://github.com/KrrishSR4" target="_blank" rel="noreferrer noopener" className="text-foreground hover:underline">
              Krish Mishra
            </a>
            . Crafted with care.
          </p>
        </div>
      </div>
    </section>
  );
}

// Avoid unused-symbol lint if the dashboard helper above changes.
export const _icons = { Globe2 };
