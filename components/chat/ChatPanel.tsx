"use client";

import Link from "next/link";
import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, SentIcon } from "@hugeicons/core-free-icons";

import { buttonVariants } from "@/components/ui/button";
import type { ChatMessage } from "@/lib/chat/tools";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const MAX_CHARS = 500; // matches the server limit in app/api/chat/route.ts
const MAX_TURNS = 10; // the server takes up to 20 messages (10 questions + 10 answers)

export default function ChatPanel({ id, onClose }: { id: string; onClose: () => void }) {
  const { messages, sendMessage, status, error } = useChat<ChatMessage>();
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const busy = status === "submitted" || status === "streaming";
  const turnsLeft = MAX_TURNS - messages.filter((m) => m.role === "user").length;

  useEffect(() => inputRef.current?.focus(), []);
  useEffect(() => endRef.current?.scrollIntoView({ block: "end" }), [messages, status]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy || turnsLeft <= 0) return;
    sendMessage({ text });
    setInput("");
  };

  return (
    <section
      id={id}
      role="dialog"
      aria-labelledby={`${id}-title`}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      className="flex h-[min(560px,calc(100dvh-10rem))] w-[min(380px,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
    >
      <header className="flex items-center justify-between gap-3 bg-deep-space-blue px-4 py-3 text-vanilla-custard-900">
        <div>
          <h2 id={`${id}-title`} className="font-heading text-lg leading-tight">
            Fireplace questions
          </h2>
          <p className="text-xs text-deep-space-blue-900">Automated assistant · {SITE.name}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="flex size-10 items-center justify-center rounded-full outline-none hover:bg-white/10 focus-visible:ring-[3px] focus-visible:ring-sunflower-gold"
        >
          <HugeiconsIcon icon={Cancel01Icon} size={20} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4" aria-live="polite">
        <ol className="flex flex-col gap-3 text-[15px] leading-relaxed">
          <li className="max-w-[85%] self-start rounded-2xl rounded-bl-sm bg-section px-3.5 py-2.5">
            Hi! Ask me anything about fireplaces, venting, or what we do. For pricing, we&apos;ll
            get you a free written estimate.
            <span className="mt-1 block text-muted-foreground" lang="es">
              ¿Prefiere español? Escríbame en español.
            </span>
          </li>

          {messages.map((message) => (
            <li
              key={message.id}
              className={cn(
                "flex max-w-[85%] flex-col gap-2",
                message.role === "user" ? "self-end items-end" : "self-start items-start",
              )}
            >
              {message.parts.map((part, i) => {
                if (part.type === "text" && part.text.trim()) {
                  return (
                    <p
                      key={i}
                      className={cn(
                        "rounded-2xl px-3.5 py-2.5 whitespace-pre-wrap",
                        message.role === "user"
                          ? "rounded-br-sm bg-deep-space-blue text-vanilla-custard-900"
                          : "rounded-bl-sm bg-section",
                      )}
                    >
                      {part.text}
                    </p>
                  );
                }
                if (part.type === "tool-offerEstimate" && part.state === "output-available") {
                  return (
                    <Link
                      key={i}
                      href={part.output.href}
                      onClick={onClose}
                      className={cn(buttonVariants(), "h-11 px-5 text-[15px] font-semibold")}
                    >
                      Get a free estimate
                    </Link>
                  );
                }
                return null;
              })}
            </li>
          ))}

          {status === "submitted" && (
            <li className="self-start rounded-2xl rounded-bl-sm bg-section px-3.5 py-2.5 text-muted-foreground">
              <span className="animate-pulse">Typing…</span>
            </li>
          )}

          {error && (
            <li role="alert" className="self-start rounded-2xl border border-vivid-tangerine bg-ember-soft px-3.5 py-2.5">
              Chat isn&apos;t available right now. Call us at{" "}
              <a href={SITE.phone.href} className="font-semibold underline">
                {SITE.phone.display}
              </a>{" "}
              or{" "}
              <Link href="/contact" onClick={onClose} className="font-semibold underline">
                send the estimate form
              </Link>
              .
            </li>
          )}

          {turnsLeft <= 0 && !busy && (
            <li className="self-start rounded-2xl rounded-bl-sm bg-section px-3.5 py-2.5">
              To keep going, call us at{" "}
              <a href={SITE.phone.href} className="font-semibold underline">
                {SITE.phone.display}
              </a>{" "}
              or{" "}
              <Link href="/contact" onClick={onClose} className="font-semibold underline">
                send the estimate form
              </Link>
              .
            </li>
          )}
        </ol>
        <div ref={endRef} />
      </div>

      <form onSubmit={send} className="flex items-center gap-2 border-t border-border p-3">
        <label htmlFor={`${id}-input`} className="sr-only">
          Your question
        </label>
        <input
          ref={inputRef}
          id={`${id}-input`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={MAX_CHARS}
          disabled={turnsLeft <= 0}
          placeholder="Ask about fireplaces…"
          autoComplete="off"
          className="h-11 min-w-0 flex-1 rounded-full border border-input bg-background px-4 text-[15px] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={busy || !input.trim() || turnsLeft <= 0}
          aria-label="Send"
          className={cn(buttonVariants({ size: "icon-lg" }), "size-11")}
        >
          <HugeiconsIcon icon={SentIcon} size={18} />
        </button>
      </form>
    </section>
  );
}
