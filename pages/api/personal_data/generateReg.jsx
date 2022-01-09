import { PrismaClient } from "@prisma/client";
// import type { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const id = req.query.id;
    const genReg = await prisma.users.update({
      where: { id: id },
    });
    res.json(genReg);
  } catch (error) {
    console.log("Error happened here!");
    console.error(error);
  }
}
