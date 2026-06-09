import { useMemo, useState } from "react";
import { Copy, Check, Sparkles, MessageSquare, Languages } from "lucide-react";
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
type Lang = "en" | "hi";

function kindOf(lead: Lead) {
  return /caf|coffee/i.test(lead.category + " " + lead.name) ? "cafe" : "restaurant";
}

function buildMessages(lead: Lead) {
  const name = lead.name;
  const kind = kindOf(lead);
  const kindPl = kind + "s";

  const en: Record<Tone, string> = {
    friendly: `Hi,

I was checking out ${name} online and noticed you don't have a website yet.

I create simple and modern websites for ${kindPl} that help customers find all the information in one place — menu, hours, location and bookings.

Can I share a sample idea for your business?

Thanks,`,

    professional: `Hello ${name} team,

I help ${kindPl} build a clean and modern online presence with simple, mobile-friendly websites that are easy for customers to use.

While looking at top ${kindPl} in your area, I noticed you don't have a website yet. I would be happy to share a short proposal made for your business.

Looking forward to your reply.

Best regards,`,

    value: `Hi,

${name} has a great reputation${lead.rating ? ` (${lead.rating.toFixed(1)}★ on Google)` : ""}, but people searching online can't easily find your menu, timings or a way to book.

A simple website usually helps ${kindPl} like yours to:
• Get more calls and bookings
• Show up higher on Google in your area
• Depend less on delivery apps

I can send you a free sample design. Would you like to see it?

Thanks,`,

    short: `Hi — I saw ${name} online and noticed you don't have a website yet. I build simple, modern websites for ${kindPl}. Can I share a quick sample idea?

Thanks,`,
  };

  const hi: Record<Tone, string> = {
    friendly: `Hi,

Maine ${name} ko online dekha aur notice kiya ki abhi aapki website nahi hai.

Main ${kindPl} ke liye simple aur modern websites banata hoon, jisme customers ko menu, timings, location aur booking — sab kuch ek hi jagah mil jaata hai.

Kya main aapke business ke liye ek sample idea share kar sakta hoon?

Thanks,`,

    professional: `Hello ${name} team,

Main ${kindPl} ko ek clean aur modern online presence banane me help karta hoon — simple, mobile-friendly websites jo customers easily use kar sakein.

Aapke area ke top ${kindPl} dekhte waqt notice kiya ki abhi aapki website nahi hai. Main khushi se aapke business ke liye ek short proposal share kar sakta hoon.

Aapke reply ka wait rahega.

Best regards,`,

    value: `Hi,

${name} ki reputation kaafi acchi hai${lead.rating ? ` (${lead.rating.toFixed(1)}★ Google par)` : ""}, lekin online search karne wale logon ko aapka menu, timings ya booking ka option easily nahi milta.

Ek simple si website aam taur par ${kindPl} ki ye help karti hai:
• Zyada calls aur bookings aati hain
• Aapke area me Google par upar dikhte ho
• Delivery apps par dependency kam hoti hai

Main aapko ek free sample design bhej sakta hoon. Dekhna chahenge?

Thanks,`,

    short: `Hi — ${name} ko online dekha, notice kiya abhi website nahi hai. Main ${kindPl} ke liye simple, modern websites banata hoon. Ek quick sample idea share karun?

Thanks,`,
  };

  return { en, hi };
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
  const [copied, setCopied] = useState<string | null>(null);
  const [lang, setLang] = useState<Lang>("en");
  const messages = useMemo(() => (lead ? buildMessages(lead) : null), [lead]);

  if (!lead || !messages) return null;

  const active = messages[lang];

  const copy = async (tone: Tone) => {
    const key = `${lang}:${tone}`;
    try {
      await navigator.clipboard.writeText(active[tone]);
      setCopied(key);
      toast.success(lang === "hi" ? "Hinglish message copied" : "Message copied to clipboard");
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

  const langs: { id: Lang; label: string; hint: string }[] = [
    { id: "en", label: "English", hint: "EN" },
    { id: "hi", label: "Hinglish", hint: "HI" },
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
            Pick a tone and language, then copy &amp; send.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 p-6">
          {/* Language toggle */}
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              <Languages className="size-3" />
              Language
            </div>
            <div className="inline-flex rounded-md border hairline bg-surface-muted/60 p-0.5">
              {langs.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setLang(l.id)}
                  className={`rounded-[5px] px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-colors ${
                    lang === l.id
                      ? "bg-accent-lime text-accent-lime-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <Tabs defaultValue="friendly">
            <TabsList className="grid w-full grid-cols-4">
              {tabs.map((t) => (
                <TabsTrigger key={t.id} value={t.id} className="text-xs">
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabs.map((t) => {
              const key = `${lang}:${t.id}`;
              const body = active[t.id];
              return (
                <TabsContent key={t.id} value={t.id} className="mt-4">
                  <div className="rounded-xl border hairline bg-surface-muted/60 p-4">
                    <pre className="whitespace-pre-wrap font-sans text-[13.5px] leading-relaxed text-foreground">
                      {body}
                    </pre>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <MessageSquare className="size-3" />
                      {body.length} characters · {lang === "hi" ? "Hinglish" : "English"}
                    </div>
                    <Button onClick={() => copy(t.id)} size="sm" className="h-9">
                      {copied === key ? (
                        <><Check /> Copied</>
                      ) : (
                        <><Copy /> Copy message</>
                      )}
                    </Button>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
