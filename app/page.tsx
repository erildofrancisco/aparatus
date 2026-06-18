import Image from "next/image";
import { Header } from "./_components/header";
import { SearchInput } from "./_components/search-input";
import banner from "../public/banner.png";
import { BookingItem } from "./_components/booking-item";

export default function Home() {
  return (
    <div>
      <Header />;
      <div className="space-y-4 px-5">
        <SearchInput />
        <Image
          src={banner}
          className="h-auto w-full"
          alt="Agende agora!"
          sizes="100vw"
        />
        <h2 className="text-foreground text-xs font-semibold uppercase">
          Agendamentos
        </h2>
        <BookingItem
          serviceName="Corte de cabelo"
          barbershopName="Barbearia do joao"
          barbershopImageUrl="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"
          date={new Date()}
        />
      </div>
    </div>
  );
}
