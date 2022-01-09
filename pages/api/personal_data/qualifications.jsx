import { PrismaClient } from "@prisma/client";
//import type { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";
const prisma = new PrismaClient();

export default async function handlers(req, res) {
  const { pid } = req.query;

  if (req.method == "POST") {
    req.body.forEach((element) => {
      element.yearGraduated = parseFloat(element.yearGraduated);
    });
    try {
      const eduqual = await prisma.qualification.createMany({
        data: req.body,
      });
      res.send(eduqual);
    } catch (error) {
      console.log(error);
    }
  } else if (req.method == "GET") {
    const ssce = await prisma.qualification.findFirst({
      where: {
        AND: [
          {
            certificateObtained: { contains: "ssce/gce" },
          },
          {
            pid: { equals: pid },
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
