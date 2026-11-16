"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { BubbleChatIcon } from "@hugeicons/core-free-icons";

// The chat code only downloads when someone opens it, so the rest of the site stays light.
const ChatPanel = dynamic(() => import("@/components/chat/ChatPanel"), { ssr: false });

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);

  const close = () => {
    setOpen(false);
    launcherRef.current?.focus();
  };

  return (
    // Phones: sits above the pinned call bar. Desktop: bottom-right corner.
    <div className="fixed right-3 bottom-[calc(5.25rem+env(safe-area-inset-bottom))] z-50 flex flex-col items-end gap-3 md:right-6 md:bottom-6">
      {open && <ChatPanel id="chat-panel" onClose={close} />}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        aria-controls="chat-panel"
        className="flex h-12 items-center gap-2 rounded-full bg-deep-space-blue px-4 font-semibold text-vanilla-custard-900 shadow-lg outline-none hover:bg-deep-space-blue-400 focus-visible:ring-[3px] focus-visible:ring-sunflower-gold"
      >
        <HugeiconsIcon icon={BubbleChatIcon} size={20} className="text-sunflower-gold" />
        {open ? "Close chat" : "Questions?"}
      </button>
    </div>
  );
}
