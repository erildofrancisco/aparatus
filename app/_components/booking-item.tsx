import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

interface BookingItemProps {
  serviceName: string;
  barbershopName: string;
  barbershopImageUrl: string;
  date: Date;
}

export function BookingItem({
  serviceName,
  barbershopName,
  barbershopImageUrl,
  date,
}: BookingItemProps) {
  return (
    <Card className="flex h-full min-h-full w-full flex-row items-center justify-between p-0">
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Badge>Confirmado</Badge>

        <div className="flex flex-col gap-2">
          <p className="font-black">{serviceName}</p>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={barbershopImageUrl} alt={barbershopName} />
            </Avatar>
            <p className="text-muted-foreground text-sm">{barbershopName}</p>
          </div>
        </div>
      </div>

      <div className="flex h-full flex-col items-center justify-center border-l p-4">
        <p className="text-xs capitalize">
          {date.toLocaleDateString("pt-AO", {
            month: "long",
          })}
        </p>
        {
          <p className="text-xs capitalize">
            {date.toLocaleDateString("pt-AO", {
              day: "2-digit",
            })}
          </p>
        }
        <p className="text-xs capitalize">
          {date.toLocaleTimeString("pt-AO", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </Card>
  );
}
