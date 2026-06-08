import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t hairline bg-background">
      <div aria-hidden className="absolute inset-0 cross-bg opacity-40" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-lime/60 to-transparent" />
      <div className="container-prose relative grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2">
            <span className="relative inline-flex size-8 items-center justify-center overflow-hidden rounded-md border hairline bg-surface-elev">
              <span aria-hidden className="absolute inset-0 blueprint-bg opacity-70" />
              <span className="relative font-display text-[15px] font-bold tracking-tight">
                C<span className="text-accent-lime">M</span>
              </span>
            </span>
            <span className="font-display text-[17px] font-semibold tracking-tight">
              Client<span className="text-accent-lime">Mine</span>
            </span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            The unfair advantage for freelancers shipping web work this week.
            Built solo, runs lean, exports clean.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-md border hairline bg-surface-elev px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <span className="size-1.5 rounded-full bg-accent-lime pulse-dot" />
            System operational
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="text-eyebrow mb-4">Product</div>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/leads" className="text-muted-foreground transition hover:text-foreground">Lead Finder</Link></li>
            <li><a href="/#features" className="text-muted-foreground transition hover:text-foreground">Features</a></li>
            <li><a href="/#how" className="text-muted-foreground transition hover:text-foreground">How it works</a></li>
            <li><a href="/#faq" className="text-muted-foreground transition hover:text-foreground">FAQ</a></li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <div className="text-eyebrow mb-4">Built by</div>
          <ul className="space-y-2.5 text-sm">
            <li className="font-medium text-foreground">Krish Mishra</li>
            <li>
              <a
                href="https://github.com/KrrishSR4"
                target="_blank"
                rel="noreferrer noopener"
                className="font-mono text-xs text-muted-foreground transition hover:text-accent-lime"
              >
                github.com/KrrishSR4 →
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative border-t hairline">
        <div className="container-prose flex flex-col items-start justify-between gap-2 py-5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} ClientMine · All rights reserved</span>
          <span>
            Shipped with caffeine by{" "}
            <a href="https://github.com/KrrishSR4" target="_blank" rel="noreferrer noopener" className="text-foreground hover:text-accent-lime">
              @KrrishSR4
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
