import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";
import type { DomainSuggestion, SearchQuery } from "@/types";

const SuggestionSchema = z.object({
  domain: z.string(),
  confidence: z.number().min(0).max(1),
  reasoning: z.string(),
  category: z.enum(["exact", "brandable", "compound", "alternative"]),
});

const SuggestionsResponseSchema = z.object({
  suggestions: z.array(SuggestionSchema).min(1).max(10),
});

export async function generateSuggestionsWithAI(query: SearchQuery): Promise<DomainSuggestion[]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    // No API key, fallback to mock
    return mockSuggestions(query);
  }

  try {
    const model = new ChatOpenAI({
      model: "gpt-4o-mini",
      temperature: 0.4,
      apiKey,
    });

    const system = `You are a domain naming assistant. Given keywords and preferences, propose concise, brandable domain ideas.
Requirements:
- Prefer .com where reasonable but allow modern TLDs (.io, .ai, .co) if better.
- Output ONLY JSON matching this TypeScript type without any extra text:
{ "suggestions": { "domain": string, "confidence": number, "reasoning": string, "category": "exact"|"brandable"|"compound"|"alternative" }[] }
- confidence in [0,1].`;

    const user = `Keywords: ${query.keywords.join(", ")}
Budget: ${query.budget ?? "n/a"}
Preferred TLDs: ${query.preferredTlds?.join(", ") ?? "any"}
Max length: ${query.maxLength ?? "n/a"}
Constraints: ${query.excludeWords?.join(", ") ?? "none"}
`; 

    const res = await model.invoke([
      { role: "system", content: system },
      { role: "user", content: user },
    ]);

    const text = typeof res.content === "string" ? res.content : (res.content as any[]).map(p => (typeof p === "string" ? p : p?.text ?? "")).join("\n");

    const parsed = SuggestionsResponseSchema.safeParse(JSON.parse(text));
    if (!parsed.success) {
      return mockSuggestions(query);
    }

    // Map to DomainSuggestion, fill pricing later in API layer
    return parsed.data.suggestions.map(s => ({ ...s, pricing: [] }));
  } catch (err) {
    console.error("AI suggestion error", err);
    return mockSuggestions(query);
  }
}

export function mockSuggestions(query: SearchQuery): DomainSuggestion[] {
  const base = (query.keywords?.[0] || "example").replace(/[^a-z0-9]/gi, "").toLowerCase();
  return [
    {
      domain: `${base}ai.com`,
      confidence: 0.92,
      reasoning: "Short, tech-forward variant suitable for AI brands.",
      category: "exact",
      pricing: [],
    },
    {
      domain: `get${base}.com`,
      confidence: 0.86,
      reasoning: "Action-oriented prefix that’s memorable and brandable.",
      category: "brandable",
      pricing: [],
    },
    {
      domain: `${base}hub.io`,
      confidence: 0.8,
      reasoning: "Modern TLD signaling a developer- or data-centric hub.",
      category: "compound",
      pricing: [],
    },
  ];
}

