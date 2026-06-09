import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

function Logo() {
  return (
    <Link to="/" className="group flex items-baseline gap-2 leading-none">
      <span className="font-display text-[22px] font-bold tracking-[-0.045em] text-foreground">
        Client<span className="italic font-medium text-accent-lime">Mine</span>
      </span>
      <span className="hidden font-mono text-[10px] tracking-[0.22em] text-muted-foreground/60 sm:inline">
        /v1
      </span>
      <span aria-hidden className="ml-0.5 size-1.5 self-center rounded-full bg-accent-lime pulse-dot" />
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b hairline bg-background/70 backdrop-blur-xl">
      <div className="container-prose flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-1 font-mono text-[12px] uppercase tracking-[0.14em] text-muted-foreground md:flex">
          <a href="/#features" className="rounded-md px-3 py-1.5 transition-colors hover:bg-surface-muted hover:text-foreground">Features</a>
          <a href="/#how" className="rounded-md px-3 py-1.5 transition-colors hover:bg-surface-muted hover:text-foreground">How</a>
          <a href="/#stats" className="rounded-md px-3 py-1.5 transition-colors hover:bg-surface-muted hover:text-foreground">Data</a>
          <a href="/#faq" className="rounded-md px-3 py-1.5 transition-colors hover:bg-surface-muted hover:text-foreground">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/KrrishSR4"
            target="_blank"
            rel="noreferrer noopener"
            className="hidden h-9 items-center gap-1.5 rounded-md px-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            GitHub <ArrowUpRight className="size-3" />
          </a>
          <Button
            asChild
            size="sm"
            className="group h-9 rounded-md bg-accent-lime px-4 font-mono text-[12px] font-semibold uppercase tracking-widest text-accent-lime-foreground shadow-lime hover:bg-accent-lime/90"
          >
            <Link to="/leads">
              Launch <span className="ml-0.5 transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
