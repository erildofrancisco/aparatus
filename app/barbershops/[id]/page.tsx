import { Card } from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import { getBarbershopById } from "@/data/barbershops/get-barbershop-by-id";
import { Smartphone } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BackButton, CopyPhoneButton } from "./_components/barbershop-actions";

function formatCurrency(priceInCents: number) {
  return new Intl.NumberFormat("pt-AO", {
    style: "currency",
    currency: "AOA",
  }).format(priceInCents / 100);
}

export default async function BarbershopPage(
  props: PageProps<"/barbershops/[id]">,
) {
  const { id } = await props.params;
  const barbershop = await getBarbershopById(id);

  if (!barbershop) {
    notFound();
  }

  return (
    <main className="bg-background min-h-screen">
      <section className="relative h-74.25 w-full">
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          sizes="100vw"
          className="object-cover"
          loading="eager"
        />
        <div className="from-foreground/45 to-foreground/0 absolute inset-0 bg-linear-to-t" />
        <div className="absolute top-6 left-5 z-10">
          <BackButton />
        </div>
      </section>

      <section className="bg-background relative -mt-6 rounded-t-3xl">
        <div className="flex items-center gap-1.5 px-5 pt-6">
          <Image
            src={barbershop.imageUrl}
            alt={barbershop.name}
            width={30}
            height={30}
            className="h-7.5 w-7.5 rounded-full object-cover"
          />
          <div className="space-y-1">
            <h1 className="text-foreground text-[1.25rem] leading-[1.4] font-bold">
              {barbershop.name}
            </h1>
            <p className="text-muted-foreground text-sm leading-[1.4]">
              {barbershop.address}
            </p>
          </div>
        </div>

        <div className="border-border my-6 border-t" />

        <div className="space-y-3 px-5">
          <h2 className="text-foreground text-xs leading-[1.4] font-bold uppercase">
            Sobre nós
          </h2>
          <p className="text-foreground text-sm leading-[1.4]">
            {barbershop.description}
          </p>
        </div>

        <div className="border-border my-6 border-t" />

        <div className="space-y-3 px-5">
          <h2 className="text-foreground text-xs leading-[1.4] font-bold uppercase">
            Serviços
          </h2>
          <div className="space-y-3">
            {barbershop.services.map((service) => (
              <Card
                key={service.id}
                className="bg-muted/30 border-border flex flex-row items-center gap-3 rounded-2xl border p-3 shadow-none"
              >
                <Image
                  src={service.imageUrl}
                  alt={service.name}
                  width={110}
                  height={110}
                  className="h-27.5 w-27.5 rounded-[0.625rem] object-cover"
                />
                <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch">
                  <div className="space-y-1">
                    <p className="text-card-foreground text-sm leading-[1.4] font-bold">
                      {service.name}
                    </p>
                    <p className="text-muted-foreground text-sm leading-[1.4]">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-card-foreground text-sm leading-[1.4] font-bold">
                      {formatCurrency(service.priceInCents)}
                    </p>
                    <Button className="h-8 rounded-full px-4 text-sm font-bold">
                      Reservar
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="border-border my-6 border-t" />

        <div className="space-y-3 px-5 pb-6">
          <h2 className="text-foreground text-xs leading-[1.4] font-bold uppercase">
            Contato
          </h2>
          <div className="space-y-3">
            {barbershop.phones.map((phone) => (
              <div key={phone} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Smartphone className="text-foreground h-6 w-6" />
                  <p className="text-foreground text-sm leading-[1.4]">
                    {phone}
                  </p>
                </div>
                <CopyPhoneButton phone={phone} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-secondary px-7.5 py-8">
        <p className="text-foreground text-xs font-semibold">
          &copy; 2025 Copyright Aparatus
        </p>
        <p className="text-muted-foreground text-xs">
          Todos os direitos reservados.
        </p>
      </footer>
    </main>
  );
}
