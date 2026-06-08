import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b hairline bg-background/80 backdrop-blur-xl">
      <div className="container-prose flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-[16px] font-semibold tracking-tight">
            Client<span className="italic font-display text-[18px]">Mine</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="/#features" className="transition-colors hover:text-foreground">Features</a>
          <a href="/#how" className="transition-colors hover:text-foreground">How it works</a>
          <a href="/#stats" className="transition-colors hover:text-foreground">Data</a>
          <a href="/#faq" className="transition-colors hover:text-foreground">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="h-9 px-4 shadow-card">
            <Link to="/leads">Launch tool</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}