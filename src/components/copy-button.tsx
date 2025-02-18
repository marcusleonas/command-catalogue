"use client";

import { Clipboard } from "lucide-react";
import { toast } from "~/hooks/use-toast";

export function CopyButton({ text }: { text: string }) {
  async function handleClick() {
    await window.navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard!",
    });
  }

  return (
    <button
      onClick={() => handleClick()}
      className={`duration-100 hover:rotate-6 active:text-green-600`}
    >
      <Clipboard size={20} />
    </button>
  );
}
