import { PrismaClient } from "@prisma/client";
//import type { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";
const prisma = new PrismaClient();

export default async function handlers(req, res) {
  const { bid } = req.query;

  if (req.method == "POST") {
    const eduqual = await prisma.qualification.createMany({
      data: req.body,
      skipDuplicates: true,
    });
    res.send(eduqual);
  } else if (req.method == "GET") {
    const ssce = await prisma.qualification.findFirst({
      where: {
        AND: [
          {
            certificateObtained: { contains: "ssce/gce" },
          },
          {
            matricNumber: { equals: bid },
          },
        ],
      },
    });
    res.send(ssce);
  } else if (req.method == "PUT") {
  } else if (req.method == "DELETE") {
  } else {
  }
}
