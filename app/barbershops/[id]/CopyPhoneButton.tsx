"use client";

import { useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { Clipboard } from "lucide-react";

interface CopyPhoneButtonProps {
  phone: string;
}

export default function CopyPhoneButton({ phone }: CopyPhoneButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(phone);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Failed to copy phone number", error);
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="xs"
      onClick={handleCopy}
      className="rounded-full px-3"
    >
      <Clipboard className="h-4 w-4" />
      {copied ? "Copiado" : "Copiar"}
    </Button>
  );
}
