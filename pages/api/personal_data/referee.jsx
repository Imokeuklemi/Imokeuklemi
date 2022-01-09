//import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handleInsert(req, res) {
  const { fullName, org, pid, phone, email, relationship } = req.body;
  const refree = await prisma.referee.create({
    data: {
      fullName,
      org,
      phone,
      email,
      relationship,
      pid,
    },
  });
  res.json(refree);
}
