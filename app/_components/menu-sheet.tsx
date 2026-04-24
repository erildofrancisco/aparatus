"use client"

import Link from "next/link"
import { CalendarDaysIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"

const categories = [
  "Cabelo",
  "Barba",
  "Acabamento",
  "Sobrancelha",
  "Massagem",
  "Hidratação",
]

const isAuthenticated = true

export function MenuSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Abrir menu">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-92.5 gap-0 p-0 sm:max-w-92.5">
        <SheetHeader className="p-5 pt-6">
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Navegue pelas seções principais e categorias de serviços.
          </SheetDescription>
        </SheetHeader>
        <Separator />

        <div className="p-5">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Avatar size="lg" className="size-12">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1615109398623-88346a601842?auto=format&fit=crop&w=200&q=80"
                  alt="Pedro Lucas"
                />
                <AvatarFallback>PL</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-base font-semibold">Pedro Lucas</span>
                <span className="text-muted-foreground text-xs">
                  pedrolucas@gmail.com
                </span>
              </div>
            </div>
          ) : (
            <Button className="w-full">Fazer login</Button>
          )}
        </div>

        <div className="space-y-1 px-2 pb-5">
          <Button asChild variant="ghost" className="h-10 w-full justify-start">
            <SheetClose asChild>
              <Link href="/">
                <HomeIcon />
                Início
              </Link>
            </SheetClose>
          </Button>
          <Button asChild variant="ghost" className="h-10 w-full justify-start">
            <SheetClose asChild>
              <Link href="/bookings">
                <CalendarDaysIcon />
                Agendamentos
              </Link>
            </SheetClose>
          </Button>
        </div>

        <Separator />

        <div className="space-y-1 p-2">
          {categories.map((category) => (
            <Button
              asChild
              key={category}
              variant="ghost"
              className="h-10 w-full justify-start text-sm font-medium"
            >
              <SheetClose asChild>
                <Link href={`/barbershops?search=${encodeURIComponent(category)}`}>
                  {category}
                </Link>
              </SheetClose>
            </Button>
          ))}
        </div>

        <Separator className="mt-2" />

        <div className="p-2 pb-5">
          <Button
            type="button"
            variant="ghost"
            className="text-muted-foreground h-10 w-full justify-start"
          >
            <LogOutIcon />
            Sair da conta
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
