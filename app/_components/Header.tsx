import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

export function Header() {
  return (
    <header className="flex items-center justify-between bg-white px-5 py-6">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={100}
        height={26.09}
        className="h-auto w-auto"
      />
      <Button variant="ghost" size="icon">
        <MenuIcon />
      </Button>
    </header>
  );
}
