//import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const payload = { id: req.body.payId }; //This is the transaction unique identifier. It is returned in the initiate transaction call as data.id
  const response = await flw.Transaction.verify(req.body.id);
  res.json(response);
}
