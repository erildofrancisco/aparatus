import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Phone, MapPin } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/app/_components/ui/button";
import {
  PageContainer,
  PageSection,
  PageSectionTitle,
  PageSectionScroller,
} from "@/app/_components/ui/page";
import CopyPhoneButton from "./CopyPhoneButton";
import ServiceItem from "@/app/_components/service-item";

function formatPrice(cents: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);
}

export default async function BarbershopPage(
  props: PageProps<"/barbershops/[id]">,
) {
  const { id } = await props.params;
  const barbershop = await prisma.barbershop.findUnique({
    where: {
      id,
    },
    include: { services: true },
  });

  if (!barbershop) {
    notFound();
  }

  return (
    <main className="bg-background text-foreground min-h-screen">
      <PageContainer>
        <div className="flex items-center justify-between gap-4 py-4">
          <Link
            href="/"
            className="text-foreground inline-flex items-center gap-2 text-sm font-semibold"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
          <Button variant="outline" size="sm" className="rounded-full">
            Reservar
          </Button>
        </div>

        <div className="border-border bg-muted relative overflow-hidden rounded-3xl border shadow-sm">
          <div className="relative h-72 w-full">
            <Image
              src={barbershop.imageUrl}
              alt={barbershop.name}
              fill
              className="object-cover"
              sizes="100vw"
              loading="eager"
            />
          </div>
          <div className="space-y-3 p-6">
            <div className="flex flex-col gap-2">
              <p className="text-muted-foreground text-sm tracking-[0.24em] uppercase">
                Barbearia
              </p>
              <h1 className="text-foreground text-3xl font-bold">
                {barbershop.name}
              </h1>
              <p className="text-muted-foreground text-sm">
                {barbershop.address}
              </p>
            </div>
            <p className="text-foreground text-sm leading-6">
              {barbershop.description}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="text-foreground flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>{barbershop.address}</span>
              </div>
              <div className="text-foreground flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4" />
                <span>{barbershop.phones[0] ?? "Sem telefone"}</span>
                {barbershop.phones[0] ? (
                  <CopyPhoneButton phone={barbershop.phones[0]} />
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <PageSection>
          <PageSectionTitle>Serviços</PageSectionTitle>
          <PageSectionScroller>
            {barbershop.services.map((service) => (
              <ServiceItem
                key={service.id}
                service={service}
                barbershop={barbershop}
              />
            ))}
          </PageSectionScroller>
        </PageSection>
      </PageContainer>
    </main>
  );
}
