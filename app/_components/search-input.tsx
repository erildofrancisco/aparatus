import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";

export function SearchInput() {
  return (
    <div className="flex items-center gap-2">
      <Input
        type="text"
        placeholder="Pesquise serviços ou barbearias"
        className="border-border rounded-full"
      />
      <Button variant="default" size="icon" className="rounded-full">
        <SearchIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
