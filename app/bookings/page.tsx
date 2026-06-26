import { getUserBookings } from "@/_data/bookings";
import BookingItem from "../../_components/booking-item";
import Footer from "../../_components/footer";
import Header from "../../_components/header";
import {
  PageContainer,
  PageSection,
  PageSectionTitle,
} from "../../_components/ui/page";

const BookingsPage = async () => {
  const { confirmedBookings, finishedBookings } = await getUserBookings();

  return (
    <div>
      <Header />
      <PageContainer>
        <h1 className="text-xl font-bold">Agendamentos</h1>

        <PageSection>
          <PageSectionTitle>Confirmados</PageSectionTitle>
          {confirmedBookings.length > 0 ? (
            <div className="flex flex-col gap-3">
              {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              Nenhum agendamento confirmado.
            </p>
          )}
        </PageSection>

        <PageSection>
          <PageSectionTitle>Finalizados</PageSectionTitle>
          {finishedBookings.length > 0 ? (
            <div className="flex flex-col gap-3">
              {finishedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              Nenhum agendamento finalizado.
            </p>
          )}
        </PageSection>
      </PageContainer>
      <Footer />
    </div>
  );
};

export default BookingsPage;
