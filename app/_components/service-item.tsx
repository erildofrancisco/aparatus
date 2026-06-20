import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { BarbershopService } from "../generated/prisma/client";

interface ServiceItemProps {
  service: BarbershopService;
}

function formatPrice(cents: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);
}

export default function ServiceItem({ service }: ServiceItemProps) {
  return (
    <Card className="max-w-sm min-w-[18rem] shrink-0">
      <div className="flex gap-4 p-4">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-3xl bg-slate-200">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>
        <CardContent className="flex flex-1 flex-col justify-between p-0">
          <div className="space-y-2">
            <CardTitle className="text-foreground text-base font-semibold">
              {service.name}
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm leading-6">
              {service.description}
            </CardDescription>
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-between gap-4">
            <span className="text-foreground text-base font-semibold">
              {formatPrice(service.priceInCents)}
            </span>
            <Button variant="secondary" size="sm" className="rounded-full px-4">
              Reservar
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
