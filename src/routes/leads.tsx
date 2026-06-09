import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Download,
  FileSpreadsheet,
  FileText,
  Loader2,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Star,
  AlertCircle,
  Sparkles,
  MessageSquare,
} from "lucide-react";

import { SiteHeader } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

import { findLeads, type Lead } from "@/lib/leads.functions";
import { MessageDialog } from "@/components/leads/MessageDialog";

export const Route = createFileRoute("/leads")({
  head: () => ({
    meta: [
      { title: "Lead Finder — ClientsMine" },
      {
        name: "description",
        content:
          "Search restaurants and cafes with no website by city. Export verified leads to CSV or Excel in seconds. No signup required.",
      },
      { property: "og:title", content: "Lead Finder — ClientsMine" },
      { property: "og:description", content: "Find local businesses with no website. Export to CSV or Excel instantly." },
      { property: "og:url", content: "/leads" },
    ],
    links: [{ rel: "canonical", href: "/leads" }],
  }),
  component: LeadsPage,
});

type Limit = 25 | 50 | 100 | 250;
type BusinessType = "restaurants" | "cafes" | "both";

function LeadsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <Toaster richColors position="top-right" />
      <main className="pb-24">
        <LeadFinder />
      </main>
      <SiteFooter />
    </div>
  );
}

function LeadFinder() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [businessType, setBusinessType] = useState<BusinessType>("both");
  const [limit, setLimit] = useState<Limit>(50);

  const findLeadsFn = useServerFn(findLeads);
  const mutation = useMutation({
    mutationFn: (input: { city: string; country: string; businessType: BusinessType; limit: Limit }) =>
      findLeadsFn({ data: input }),
    onError: (e: Error) => toast.error(e.message || "Search failed. Please try again."),
    onSuccess: (d) => {
      if (!d.leads.length) toast.message("No matching leads found. Try a different city or broader filters.");
      else toast.success(`${d.leads.length} leads found in ${d.city}.`);
    },
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) {
      toast.error("City name is required.");
      return;
    }
    mutation.mutate({ city: city.trim(), country: country.trim(), businessType, limit });
  };

  const data = mutation.data;

  return (
    <section className="border-b hairline">
      <div className="container-prose py-12 md:py-16">
        <div className="max-w-2xl">
          <div className="text-eyebrow">Lead Finder</div>
          <h1 className="text-display mt-3 text-4xl md:text-5xl">
            Find businesses missing a website.
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Search any city. We surface only restaurants and cafes that have no
            website — verified, de-duplicated, and ready to export.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="mt-10 rounded-2xl border hairline bg-surface p-5 shadow-card md:p-7"
        >
          <div className="grid gap-5 md:grid-cols-[1.5fr_1fr_1fr_0.8fr_auto]">
            <Field label="City Name" required>
              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Florence"
                className="h-11"
                maxLength={120}
                required
              />
            </Field>
            <Field label="Country (optional)">
              <Input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="e.g. Italy"
                className="h-11"
                maxLength={120}
              />
            </Field>
            <Field label="Business Type">
              <Select value={businessType} onValueChange={(v) => setBusinessType(v as BusinessType)}>
                <SelectTrigger className="!h-11"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="restaurants">Restaurants</SelectItem>
                  <SelectItem value="cafes">Cafes</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Result Limit">
              <Select value={String(limit)} onValueChange={(v) => setLimit(Number(v) as Limit)}>
                <SelectTrigger className="!h-11"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                  <SelectItem value="250">250</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <div className="flex items-end">
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="shine-btn group h-11 w-full px-5 shadow-card transition-transform duration-200 hover:-translate-y-px md:w-auto"
              >
                {mutation.isPending ? (
                  <><Loader2 className="animate-spin" /> Searching</>
                ) : (
                  <><Search className="transition-transform duration-300 group-hover:scale-110" /> Generate Leads</>
                )}
              </Button>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Searches up to {limit * 2} businesses to surface {limit} without a website.
            Larger limits take longer.
          </p>
        </form>

        <div className="mt-10">
          <AnimatePresence mode="wait">
            {mutation.isPending && <LoadingState key="loading" />}
            {!mutation.isPending && data && data.leads.length > 0 && (
              <ResultsTable key="results" leads={data.leads} city={data.city} scanned={data.scanned} />
            )}
            {!mutation.isPending && data && data.leads.length === 0 && (
              <EmptyState
                key="empty-zero"
                title="No leads matched"
                desc={`We scanned ${data.scanned} businesses in ${data.city} and every one has a website. Try a different city.`}
              />
            )}
            {!mutation.isPending && !data && (
              <EmptyState
                key="empty"
                title="Your leads will appear here"
                desc="Enter a city above and click Generate Leads to start. Results are filtered to businesses with no website."
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[11px] uppercase tracking-widest text-muted-foreground">
        {label}{required && <span className="ml-0.5 text-destructive">*</span>}
      </Label>
      {children}
    </div>
  );
}

function LoadingState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      className="overflow-hidden rounded-2xl border hairline bg-surface shadow-card"
    >
      <div className="border-b hairline px-5 py-3 text-[12px] text-muted-foreground">
        Scanning businesses…
      </div>
      <div className="divide-y hairline">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="grid grid-cols-12 items-center gap-4 px-5 py-4">
            <Skeleton className="col-span-3 h-4" />
            <Skeleton className="col-span-2 h-4" />
            <Skeleton className="col-span-1 h-4" />
            <Skeleton className="col-span-3 h-4" />
            <Skeleton className="col-span-2 h-4" />
            <Skeleton className="col-span-1 h-4" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-foreground/[0.06] ${className}`} />;
}

function EmptyState({ title, desc }: { title: string; desc: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      className="rounded-2xl border border-dashed hairline bg-surface px-6 py-20 text-center"
    >
      <div className="mx-auto inline-flex size-12 items-center justify-center rounded-xl border hairline bg-surface-muted">
        <Sparkles className="size-5 text-muted-foreground" />
      </div>
      <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{desc}</p>
    </motion.div>
  );
}

function ResultsTable({ leads, city, scanned }: { leads: Lead[]; city: string; scanned: number }) {
  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const openMessage = (lead: Lead) => {
    setActiveLead(lead);
    setDialogOpen(true);
  };

  const filename = useMemo(() => {
    const safeCity = city.replace(/[^a-z0-9]+/gi, "_").replace(/^_|_$/g, "") || "city";
    const d = new Date();
    const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    return `${safeCity}_LeadList_${date}`;
  }, [city]);

  const exportCsv = () => {
    const headers = ["Business Name", "Category", "Rating", "Reviews", "Address", "Phone", "Email", "Website Status", "Maps Link"];
    const escape = (v: string) => `"${(v ?? "").replace(/"/g, '""')}"`;
    const lines = [headers.join(",")];
    for (const l of leads) {
      lines.push([
        escape(l.name),
        escape(l.category),
        l.rating ?? "",
        l.reviewCount ?? "",
        escape(l.address),
        escape(l.phone),
        escape(l.email || "No Public Email Found"),
        escape("NO WEBSITE FOUND"),
        escape(l.mapsUrl),
      ].join(","));
    }
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    triggerDownload(blob, `${filename}.csv`);
    toast.success("CSV exported.");
  };

  const exportXlsx = async () => {
    const XLSX = await import("xlsx");
    const rows = leads.map((l) => ({
      "Business Name": l.name,
      "Category": l.category,
      "Rating": l.rating ?? "",
      "Reviews": l.reviewCount ?? "",
      "Address": l.address,
      "Phone": l.phone,
      "Email": l.email || "No Public Email Found",
      "Website Status": "NO WEBSITE FOUND",
      "Maps Link": l.mapsUrl,
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    ws["!cols"] = [{ wch: 32 }, { wch: 18 }, { wch: 8 }, { wch: 10 }, { wch: 44 }, { wch: 20 }, { wch: 28 }, { wch: 20 }, { wch: 36 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leads");
    XLSX.writeFile(wb, `${filename}.xlsx`);
    toast.success("Excel exported.");
  };

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      className="overflow-hidden rounded-2xl border hairline bg-surface shadow-card"
    >
      <div className="flex flex-col items-start justify-between gap-3 border-b hairline px-5 py-4 md:flex-row md:items-center">
        <div className="text-[13px] text-muted-foreground">
          <span className="text-foreground font-medium">{leads.length}</span> leads without a website
          <span className="mx-2 text-foreground/20">·</span>
          scanned {scanned} businesses in {city}
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={exportCsv} variant="outline" size="sm" className="h-9">
            <FileText /> CSV
          </Button>
          <Button onClick={exportXlsx} size="sm" className="h-9">
            <FileSpreadsheet /> Excel
          </Button>
        </div>
      </div>
      <div className="max-h-[70vh] overflow-auto">
        <table className="w-full text-[13px]">
          <thead className="sticky top-0 z-10 bg-surface/95 backdrop-blur">
            <tr className="border-b hairline text-left text-[10px] uppercase tracking-widest text-muted-foreground">
              <Th>Business</Th>
              <Th>Category</Th>
              <Th>Rating</Th>
              <Th>Address</Th>
              <Th>Phone</Th>
              <Th>Email</Th>
              <Th>Website</Th>
              <Th>Maps</Th>
              <Th>Message</Th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l, i) => (
              <motion.tr
                key={l.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.01, 0.3), duration: 0.3 }}
                className="border-b hairline last:border-0 transition-colors hover:bg-surface-muted/60"
              >
                <Td className="font-medium">{l.name}</Td>
                <Td className="capitalize text-muted-foreground">{l.category}</Td>
                <Td>
                  {l.rating !== null ? (
                    <span className="inline-flex items-center gap-1">
                      <Star className="size-3 fill-current text-foreground/70" />
                      {l.rating.toFixed(1)}
                      {l.reviewCount !== null && (
                        <span className="text-muted-foreground">({l.reviewCount})</span>
                      )}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </Td>
                <Td className="max-w-[280px]">
                  <span className="inline-flex items-start gap-1.5 text-muted-foreground">
                    <MapPin className="mt-0.5 size-3 shrink-0" />
                    <span className="line-clamp-2">{l.address || "—"}</span>
                  </span>
                </Td>
                <Td>
                  {l.phone ? (
                    <a
                      href={`https://wa.me/${l.phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      title="Open in WhatsApp"
                      className="inline-flex items-center gap-1.5 text-foreground/80 transition-colors hover:text-accent-emerald"
                    >
                      <Phone className="size-3" /> {l.phone}
                    </a>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </Td>
                <Td>
                  {l.email ? (
                    <a href={`mailto:${l.email}`} className="inline-flex items-center gap-1.5 hover:text-foreground">
                      <Mail className="size-3" /> {l.email}
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                      <AlertCircle className="size-3" /> No Public Email Found
                    </span>
                  )}
                </Td>
                <Td>
                  <span className="inline-flex items-center rounded-full border border-destructive/20 bg-destructive/5 px-2 py-0.5 font-mono text-[10px] tracking-wider text-destructive">
                    NO WEBSITE FOUND
                  </span>
                </Td>
                <Td>
                  {l.mapsUrl ? (
                    <a
                      href={l.mapsUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Open <ExternalLink className="size-3" />
                    </a>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </Td>
                <Td>
                  <button
                    type="button"
                    onClick={() => openMessage(l)}
                    className="inline-flex items-center gap-1.5 rounded-md border hairline bg-surface px-2 py-1 text-[11px] font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
                  >
                    <MessageSquare className="size-3" /> Generate
                  </button>
                </Td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
    <MessageDialog lead={activeLead} open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3 font-medium">{children}</th>;
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 align-top ${className}`}>{children}</td>;
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// reference imports to keep tree-shake honest
export const _icons = { Download };