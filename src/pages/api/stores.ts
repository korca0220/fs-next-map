// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { StoreType } from "@/interface";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    responseLimit: "8mb",
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreType[]>
) {
  const prisma = new PrismaClient();
  const stores = await prisma.store.findMany({
    orderBy: {
      id: "asc",
    },
  });

  res.status(200).json(stores);
}
