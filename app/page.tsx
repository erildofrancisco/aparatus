import Header from "@/_components/header";
import Image from "next/image";
import banner from "@/public/banner.png";
import BookingItem from "@/_components/booking-item";

import { getBarbershops, getPopularBarbershops } from "@/_data/barbershops";
import { getUserBookings } from "@/_data/bookings";
import BarbershopItem from "@/_components/barbershop-item";
import {
  PageContainer,
  PageSection,
  PageSectionScroller,
  PageSectionTitle,
} from "@/_components/ui/page";
import Footer from "@/_components/footer";
import QuickSearch from "@/_components/quick-search";

export default async function Home() {
  const barbershops = await getBarbershops();
  const popularBarbershops = await getPopularBarbershops();
  const { confirmedBookings } = await getUserBookings();

  return (
    <div>
      <Header />
      <PageContainer>
        <QuickSearch />
        <Image
          src={banner}
          alt="Agende nos melhores com a Aparatus"
          sizes="100vw"
          className="h-auto w-full"
        />
        {confirmedBookings.length > 0 && (
          <PageSection>
            <PageSectionTitle>Agendamentos</PageSectionTitle>
            <PageSectionScroller>
              {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </PageSectionScroller>
          </PageSection>
        )}
        <PageSection>
          <PageSectionTitle>Barbearias</PageSectionTitle>
          <PageSectionScroller>
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </PageSectionScroller>
        </PageSection>
        <PageSection>
          <PageSectionTitle>Barbearias populares</PageSectionTitle>
          <PageSectionScroller>
            {popularBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </PageSectionScroller>
        </PageSection>
      </PageContainer>
      <Footer />
    </div>
  );
}
