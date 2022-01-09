//import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handleInsert(req, res) {
  const get_user = await prisma.users.findUnique({
    where: { email: req.email },
  });
  res.send(get_user);
}
