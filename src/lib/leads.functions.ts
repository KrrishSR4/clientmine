import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GATEWAY = "https://connector-gateway.lovable.dev/google_maps";

const InputSchema = z.object({
  city: z.string().trim().min(1).max(120),
  country: z.string().trim().max(120).optional().default(""),
  businessType: z.enum(["restaurants", "cafes", "both"]),
  limit: z.union([z.literal(25), z.literal(50), z.literal(100), z.literal(250)]),
});

export type Lead = {
  id: string;
  name: string;
  category: string;
  rating: number | null;
  reviewCount: number | null;
  address: string;
  phone: string;
  email: string;
  website: string;
  mapsUrl: string;
  hasWebsite: boolean;
};

type PlaceApiResult = {
  id: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  nationalPhoneNumber?: string;
  internationalPhoneNumber?: string;
  websiteUri?: string;
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  primaryTypeDisplayName?: { text?: string };
  types?: string[];
};

const FIELD_MASK = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.nationalPhoneNumber",
  "places.internationalPhoneNumber",
  "places.websiteUri",
  "places.rating",
  "places.userRatingCount",
  "places.googleMapsUri",
  "places.primaryTypeDisplayName",
  "places.types",
  "nextPageToken",
].join(",");

async function searchTextPage(
  query: string,
  pageToken: string | undefined,
  apiKey: string,
  lovableKey: string,
): Promise<{ places: PlaceApiResult[]; nextPageToken?: string }> {
  const body: Record<string, unknown> = { textQuery: query, pageSize: 20 };
  if (pageToken) body.pageToken = pageToken;

  const res = await fetch(`${GATEWAY}/places/v1/places:searchText`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": apiKey,
      "Content-Type": "application/json",
      "X-Goog-FieldMask": FIELD_MASK,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Places search failed (${res.status}): ${text.slice(0, 240)}`);
  }
  const json = (await res.json()) as { places?: PlaceApiResult[]; nextPageToken?: string };
  return { places: json.places ?? [], nextPageToken: json.nextPageToken };
}

function toLead(p: PlaceApiResult): Lead {
  const website = (p.websiteUri ?? "").trim();
  return {
    id: p.id,
    name: p.displayName?.text ?? "Unnamed business",
    category:
      p.primaryTypeDisplayName?.text ??
      (p.types?.[0] ?? "Business").replace(/_/g, " "),
    rating: typeof p.rating === "number" ? p.rating : null,
    reviewCount: typeof p.userRatingCount === "number" ? p.userRatingCount : null,
    address: p.formattedAddress ?? "",
    phone: p.internationalPhoneNumber || p.nationalPhoneNumber || "",
    email: "",
    website,
    mapsUrl: p.googleMapsUri ?? "",
    hasWebsite: website.length > 0,
  };
}

export const findLeads = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => InputSchema.parse(d))
  .handler(async ({ data }) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const lovableKey = process.env.LOVABLE_API_KEY;
    if (!apiKey || !lovableKey) {
      throw new Error("Google Maps connector credentials are not configured.");
    }

    const types =
      data.businessType === "both"
        ? ["restaurants", "cafes"]
        : [data.businessType];
    const location = [data.city, data.country].filter(Boolean).join(", ");

    const seen = new Set<string>();
    const noWebsite: Lead[] = [];
    let scanned = 0;

    outer: for (const t of types) {
      const query = `${t} in ${location}`;
      let pageToken: string | undefined = undefined;
      // Up to ~60 results per query from Places New (3 pages of 20)
      for (let page = 0; page < 12; page += 1) {
        const { places, nextPageToken } = await searchTextPage(
          query,
          pageToken,
          apiKey,
          lovableKey,
        );
        for (const p of places) {
          if (seen.has(p.id)) continue;
          seen.add(p.id);
          scanned += 1;
          const lead = toLead(p);
          if (!lead.hasWebsite) noWebsite.push(lead);
          if (noWebsite.length >= data.limit) break outer;
        }
        if (!nextPageToken) break;
        pageToken = nextPageToken;
      }
    }

    return {
      leads: noWebsite.slice(0, data.limit),
      scanned,
      city: data.city,
      country: data.country,
      generatedAt: new Date().toISOString(),
    };
  });