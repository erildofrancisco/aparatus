import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

export function Header() {
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
      <Button variant="outline" size="icon">
        <MenuIcon />
      </Button>
    </header>
  );
}
