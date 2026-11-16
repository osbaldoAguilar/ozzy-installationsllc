import { tool, type InferUITools, type ToolSet, type UIMessage } from "ai";
import { z } from "zod";

import { SERVICE_TYPES, type ServiceType } from "@/lib/services";

// The bot's only tool: a button to the estimate form, with the service preselected if known.
export const chatTools = {
  offerEstimate: tool({
    description:
      "Show the visitor a button to the free estimate form. Use when they ask about price or cost, want a quote, want to book, or describe a job.",
    inputSchema: z.object({
      service: z
        .enum(SERVICE_TYPES as [ServiceType, ...ServiceType[]])
        .optional()
        .describe("The service they're asking about, if clear."),
    }),
    execute: async ({ service }) => ({
      href: service ? `/contact?service=${service}` : "/contact",
    }),
  }),
} satisfies ToolSet;

export type ChatMessage = UIMessage<unknown, never, InferUITools<typeof chatTools>>;
