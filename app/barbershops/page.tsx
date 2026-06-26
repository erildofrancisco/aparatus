import Header from "@/_components/header";
import Footer from "@/_components/footer";
import BarbershopItem from "@/_components/barbershop-item";
import { getBarbershopsByServiceName } from "@/_data/barbershops";
import {
  PageContainer,
  PageSection,
  PageSectionTitle,
} from "@/_components/ui/page";

interface BarbershopsPageProps {
  searchParams: Promise<{
    search?: string;
  }>;
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const { search } = await searchParams;
  const barbershops = search ? await getBarbershopsByServiceName(search) : [];

  return (
    <div>
      <Header />
      <PageContainer>
        <PageSection>
          <PageSectionTitle>
            Resultados para &quot;{search || ""}&quot;
          </PageSectionTitle>
          {barbershops.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              Nenhuma barbearia encontrada.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {barbershops.map((barbershop) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              ))}
            </div>
          )}
        </PageSection>
      </PageContainer>
      <Footer />
    </div>
  );
};

export default BarbershopsPage;
