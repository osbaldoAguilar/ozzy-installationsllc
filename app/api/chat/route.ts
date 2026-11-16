import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  safeValidateUIMessages,
  streamText,
  toUIMessageStream,
} from "ai";
import { checkBotId } from "botid/server";
import { z } from "zod";

import { CHAT_INSTRUCTIONS, CHAT_MODEL } from "@/lib/chat/instructions";
import { chatTools as tools, type ChatMessage } from "@/lib/chat/tools";

// Caps per request so one visitor can't run up the AI bill. The free monthly credit is the
// hard ceiling on top of this: when it's used up, requests fail and the widget says "call us".
const MAX_MESSAGES = 20;
const MAX_CHARS = 500;
const MAX_OUTPUT_TOKENS = 600;

const body = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        parts: z.array(z.object({ type: z.string(), text: z.string().max(MAX_CHARS).optional() })),
      }),
    )
    .min(1)
    .max(MAX_MESSAGES),
});

export async function POST(req: Request) {
  const { isBot } = await checkBotId();
  if (isBot) return new Response("Forbidden", { status: 403 });

  const json: unknown = await req.json().catch(() => null);
  const limits = body.safeParse(json);
  const validated = await safeValidateUIMessages<ChatMessage>({
    messages: (json as { messages?: unknown } | null)?.messages,
    tools,
  });
  if (!limits.success || !validated.success) return new Response("Bad request", { status: 400 });

  const result = streamText({
    model: CHAT_MODEL,
    instructions: CHAT_INSTRUCTIONS,
    messages: await convertToModelMessages(validated.data, { tools }),
    tools,
    reasoning: "low", // simple Q&A: answer fast and cheap
    maxOutputTokens: MAX_OUTPUT_TOKENS,
  });

  return createUIMessageStreamResponse({ stream: toUIMessageStream({ stream: result.stream }) });
}
