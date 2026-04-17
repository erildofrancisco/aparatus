import { prisma } from "@/app/lib/prisma";

export async function getBarbershopById(id: string) {
  return prisma.barbershop.findUnique({
    where: {
      id,
    },
    include: {
      services: {
        orderBy: {
          name: "asc",
        },
      },
    },
  });
}
