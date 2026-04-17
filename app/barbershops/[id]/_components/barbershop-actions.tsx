"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/app/_components/ui/button";
import { toast } from "sonner";

export function BackButton() {
  const router = useRouter();

  return (
    <Button
      size="icon"
      variant="secondary"
      className="h-10 w-10 rounded-full"
      onClick={() => router.back()}
      aria-label="Voltar"
    >
      <ChevronLeft />
    </Button>
  );
}

export function CopyPhoneButton({ phone }: { phone: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <Button
      type="button"
      variant="outline"
      className="h-8 rounded-full px-4 text-sm font-bold"
      onClick={() => {
        void navigator.clipboard
          .writeText(phone)
          .then(() => {
            setCopied(true);
            toast.success("Número copiado para a área de transferência", {
              position: "bottom-right",
            });
            window.setTimeout(() => setCopied(false), 2000);
          })
          .catch(() => {
            toast.error("Não foi possível copiar");
          });
      }}
    >
      {copied ? "Copiado" : "Copiar"}
    </Button>
  );
}
