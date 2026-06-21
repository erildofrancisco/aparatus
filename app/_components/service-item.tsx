"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetClose,
} from "@/app/_components/ui/sheet";
import { Calendar } from "@/app/_components/ui/calendar";
import { Barbershop, BarbershopService } from "../generated/prisma/client";

interface ServiceItemProps {
  service: BarbershopService;
  barbershop: Barbershop;
}

function formatPrice(cents: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);
}

function getTimeSlots() {
  const slots: string[] = [];
  for (let minutes = 9 * 60; minutes <= 18 * 60; minutes += 30) {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;
    const hourText = String(hour).padStart(2, "0");
    const minuteText = String(minute).padStart(2, "0");
    slots.push(`${hourText}:${minuteText}`);
  }
  return slots;
}

export default function ServiceItem({ service, barbershop }: ServiceItemProps) {
  const today = React.useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    undefined,
  );
  const [selectedTime, setSelectedTime] = React.useState<string>("");
  const timeSlots = React.useMemo(() => getTimeSlots(), []);
  const hasSelection = Boolean(selectedDate && selectedTime);

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
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="secondary"
                  size="sm"
                  className="rounded-full px-4"
                >
                  Reservar
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full max-w-md bg-white text-slate-900"
              >
                <SheetHeader className="px-6 pt-6 pb-0">
                  <div className="flex items-center justify-between gap-4">
                    <SheetTitle>Agendar serviço</SheetTitle>
                    <SheetClose asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                      >
                        ×
                      </Button>
                    </SheetClose>
                  </div>
                </SheetHeader>

                <div className="space-y-6 px-6 py-4">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-slate-600">
                      Selecione a data
                    </p>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date ?? undefined);
                        setSelectedTime("");
                      }}
                      disabled={(date) => date < today}
                    />
                  </div>

                  {selectedDate ? (
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-slate-600">
                        Escolha um horário
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTime(slot)}
                            className={`rounded-lg border px-2 py-2 text-sm transition ${
                              selectedTime === slot
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-slate-200 bg-slate-50 text-slate-900 hover:border-slate-300 hover:bg-slate-100"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900">
                    <p className="font-semibold">Resumo do agendamento</p>
                    <div className="mt-3 space-y-2 text-sm text-slate-700">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Serviço</span>
                        <span>{service.name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Preço</span>
                        <span>{formatPrice(service.priceInCents)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Barbearia</span>
                        <span>{barbershop.name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Data</span>
                        <span>
                          {selectedDate
                            ? selectedDate.toLocaleDateString("pt-BR", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              })
                            : "Ainda não selecionada"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Horário</span>
                        <span>{selectedTime || "Ainda não selecionado"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <SheetFooter className="flex flex-col gap-3 px-6 pt-0 pb-6">
                  <Button
                    disabled={!hasSelection}
                    className="w-full rounded-full"
                  >
                    Confirmar agendamento
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
