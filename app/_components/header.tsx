"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  MenuIcon,
  HomeIcon,
  CalendarDays,
  LogOutIcon,
  XIcon,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export function Header() {
  const session = authClient.useSession();
  const user =
    session.data && "user" in session.data ? session.data.user : undefined;
  const name = user?.name ?? "Usuário";
  const email = user?.email ?? "";
  const avatarSrc = user?.image ?? undefined;

  return (
    <header className="flex items-center justify-between bg-white px-5 py-6">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="Aparatus"
          width={100}
          height={26.09}
          className="h-auto w-auto"
          priority
        />
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-full max-w-sm bg-white text-slate-900"
        >
          <SheetHeader className="px-6 pt-6 pb-0">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold">Menu</p>
              <SheetClose asChild>
                <button
                  className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                  aria-label="Fechar menu"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </SheetClose>
            </div>
          </SheetHeader>

          <div className="space-y-6 border-b border-slate-200 px-6 pt-4 pb-6">
            {session.data ? (
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  {avatarSrc ? (
                    <AvatarImage src={avatarSrc} alt={name} />
                  ) : (
                    <AvatarFallback>
                      {name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className="font-semibold text-slate-900">{name}</p>
                  <p className="text-sm text-slate-500">{email}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-slate-900">
                    Olá. Faça seu login!
                  </p>
                </div>
                <Link href="/api/auth/signin">
                  <Button>
                    Login
                    <span aria-hidden="true">→</span>
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className="space-y-2 border-b border-slate-200 px-6 py-6 text-sm text-slate-900">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-slate-100"
            >
              <HomeIcon className="h-5 w-5" />
              Início
            </Link>
            <Link
              href="/bookings"
              className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-slate-100"
            >
              <CalendarDays className="h-5 w-5" />
              Agendamentos
            </Link>
          </div>

          <div className="space-y-2 px-6 py-6 text-sm text-slate-900">
            {[
              "Cabelo",
              "Barba",
              "Acabamento",
              "Sobrancelha",
              "Massagem",
              "Hidratação",
            ].map((category) => (
              <button
                key={category}
                type="button"
                className="w-full rounded-lg px-3 py-3 text-left text-base font-medium text-slate-900 hover:bg-slate-100"
              >
                {category}
              </button>
            ))}
          </div>

          <div className="border-t border-slate-200 px-6 py-6">
            <button
              type="button"
              onClick={() => void authClient.signOut()}
              className="flex w-full items-center justify-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
            >
              <LogOutIcon className="h-4 w-4" />
              Sair da conta
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
