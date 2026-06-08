import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t hairline bg-surface-muted">
      <div className="container-prose grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="text-[16px] font-semibold tracking-tight">
            Client<span className="italic font-display text-[18px]">Mine</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            The fastest way for freelancers to find restaurants & cafes that
            need a website. Built solo-friendly, export-ready, zero fluff.
          </p>
        </div>
        <div>
          <div className="text-eyebrow mb-3">Product</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/leads" className="text-muted-foreground transition hover:text-foreground">Lead Finder</Link></li>
            <li><a href="/#features" className="text-muted-foreground transition hover:text-foreground">Features</a></li>
            <li><a href="/#how" className="text-muted-foreground transition hover:text-foreground">How it works</a></li>
          </ul>
        </div>
        <div>
          <div className="text-eyebrow mb-3">Developer</div>
          <ul className="space-y-2 text-sm">
            <li className="text-muted-foreground">Built by Krish Mishra</li>
            <li>
              <a
                href="https://github.com/KrrishSR4"
                target="_blank"
                rel="noreferrer noopener"
                className="text-muted-foreground transition hover:text-foreground"
              >
                github.com/KrrishSR4
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t hairline">
        <div className="container-prose flex flex-col items-start justify-between gap-2 py-5 text-xs text-muted-foreground md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} ClientMine. All rights reserved.</span>
          <span>
            Crafted by{" "}
            <a href="https://github.com/KrrishSR4" target="_blank" rel="noreferrer noopener" className="text-foreground hover:underline">
              Krish Mishra
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}