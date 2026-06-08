import { useMemo, useState } from "react";
import { Copy, Check, Sparkles, MessageSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Lead } from "@/lib/leads.functions";

type Tone = "friendly" | "professional" | "value" | "short";

function firstName(name: string) {
  // Strip common business suffixes / pick a clean handle
  const clean = name
    .replace(/\b(restaurant|cafe|café|bistro|trattoria|pizzeria|ristorante|bar|kitchen|grill|coffee|the)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
  return clean || name;
}

function buildMessages(lead: Lead) {
  const name = lead.name;
  const handle = firstName(name);
  const cityHint = lead.address?.split(",").slice(-2, -1)[0]?.trim() || "your area";
  const kind = /caf|coffee/i.test(lead.category + " " + name) ? "cafe" : "restaurant";

  return {
    friendly: `Hi ${handle} team,

I came across ${name} on Google and noticed you don't have a website yet — your reviews look amazing and you clearly have loyal customers in ${cityHint}.

I design clean, fast websites for ${kind}s like yours that bring in more bookings and online orders. Would you be open to a quick chat this week?

Best regards,`,

    professional: `Hello ${name},

I help ${kind}s establish a strong online presence with modern, mobile-friendly websites that rank on Google and convert visitors into customers.

While reviewing top-rated venues in ${cityHint}, I noticed ${name} does not currently have a website. I would be glad to share a short proposal tailored to your business.

Looking forward to your response.

Best regards,`,

    value: `Hi ${handle},

Quick note — ${name} has a fantastic reputation${lead.rating ? ` (${lead.rating.toFixed(1)}★ on Google)` : ""}, but customers searching online in ${cityHint} can't find your menu, hours, or a way to book directly.

A simple, beautifully designed website typically helps ${kind}s:
• Capture 3× more inbound calls and reservations
• Rank higher in local Google searches
• Reduce dependence on delivery apps

I'd love to show you a free mockup. Open to it?

Best regards,`,

    short: `Hi ${handle} — loved what I saw about ${name}. Noticed you don't have a website yet. I build modern sites for ${kind}s that drive more bookings. Worth a 10-min chat?

Best regards,`,
  } as Record<Tone, string>;
}

export function MessageDialog({
  lead,
  open,
  onOpenChange,
}: {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [copied, setCopied] = useState<Tone | null>(null);
  const messages = useMemo(() => (lead ? buildMessages(lead) : null), [lead]);

  if (!lead || !messages) return null;

  const copy = async (tone: Tone) => {
    try {
      await navigator.clipboard.writeText(messages[tone]);
      setCopied(tone);
      toast.success("Message copied to clipboard");
      setTimeout(() => setCopied(null), 1600);
    } catch {
      toast.error("Couldn't copy. Select and copy manually.");
    }
  };

  const tabs: { id: Tone; label: string }[] = [
    { id: "friendly", label: "Friendly" },
    { id: "professional", label: "Professional" },
    { id: "value", label: "Value-driven" },
    { id: "short", label: "Short" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl gap-0 p-0">
        <DialogHeader className="space-y-1 border-b hairline p-6 pb-5">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-muted-foreground">
            <Sparkles className="size-3" />
            Outreach message
          </div>
          <DialogTitle className="text-display text-2xl">
            Message for {lead.name}
          </DialogTitle>
          <DialogDescription className="text-xs">
            Personalized templates — pick a tone, copy, and send.
          </DialogDescription>
        </DialogHeader>

        <div className="p-6">
          <Tabs defaultValue="friendly">
            <TabsList className="grid w-full grid-cols-4">
              {tabs.map((t) => (
                <TabsTrigger key={t.id} value={t.id} className="text-xs">
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabs.map((t) => (
              <TabsContent key={t.id} value={t.id} className="mt-4">
                <div className="rounded-xl border hairline bg-surface-muted/60 p-4">
                  <pre className="whitespace-pre-wrap font-sans text-[13.5px] leading-relaxed text-foreground">
                    {messages[t.id]}
                  </pre>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <MessageSquare className="size-3" />
                    {messages[t.id].length} characters
                  </div>
                  <Button onClick={() => copy(t.id)} size="sm" className="h-9">
                    {copied === t.id ? (
                      <><Check /> Copied</>
                    ) : (
                      <><Copy /> Copy message</>
                    )}
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}