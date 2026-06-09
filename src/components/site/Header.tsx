import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

function Logo() {
  return (
    <Link to="/" className="group relative flex items-baseline gap-2 leading-none">
      <span className="font-display text-[24px] font-bold tracking-[-0.05em] text-foreground">
        Clients
        <span className="relative italic font-semibold text-accent-lime">
          Mine
          <span
            aria-hidden
            className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-accent-lime transition-all duration-500 ease-out group-hover:w-full"
          />
        </span>
      </span>
      <span
        aria-hidden
        className="ml-1 size-1.5 self-center rounded-full bg-accent-lime pulse-dot shadow-[0_0_10px_oklch(0.88_0.22_128_/_0.8)]"
      />
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b hairline bg-background/70 backdrop-blur-xl">
      <div aria-hidden className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-accent-lime/40 to-transparent" />
      <div className="container-prose flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-1 font-mono text-[12px] uppercase tracking-[0.16em] text-muted-foreground md:flex">
          {[
            { href: "/#features", label: "Features" },
            { href: "/#how", label: "How" },
            { href: "/#stats", label: "Data" },
            { href: "/#faq", label: "FAQ" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative rounded-md px-3 py-1.5 transition-colors hover:text-foreground"
            >
              <span className="relative z-10">{item.label}</span>
              <span
                aria-hidden
                className="absolute inset-0 rounded-md bg-surface-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/KrrishSR4"
            target="_blank"
            rel="noreferrer noopener"
            className="group hidden h-9 items-center gap-1.5 rounded-md px-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            GitHub <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <Button
            asChild
            size="sm"
            className="group relative h-9 overflow-hidden rounded-md bg-accent-lime px-4 font-mono text-[12px] font-semibold uppercase tracking-widest text-accent-lime-foreground shadow-lime transition-transform duration-200 hover:bg-accent-lime hover:-translate-y-px"
          >
            <Link to="/leads">
              <span aria-hidden className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Launch</span>
              <span className="relative ml-0.5 transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
