import Image from "next/image"

import { MenuSheet } from "./menu-sheet"

export function Header() {
  return (
    <header className="flex items-center justify-between bg-background px-5 py-6">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={100}
        height={26.09}
        className="h-auto w-auto"
      />
      <MenuSheet />
    </header>
  )
}
