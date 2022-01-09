//import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handleInsert(req, res) {
  if (req.method === "POST") {
    const programme = await prisma.programme
      .createMany(req.body)
      .then(() => {
        res.send(JSON.stringify(programme));
      })
      .catch(function (err) {
        res.json(err);
      });
    res.json(programme.code);
  } else if (req.method === "GET") {
    const listProgramme = await prisma.programme.findMany();
    res.send(listProgramme);
  } else if (req.method === "PUT") {
    try {
      const id = req.params.id;
      const updateProgramme = await prisma.programme.update({
        where: { id: id },
      });
      res.json(updateProgramme);
    } catch (error) {
      console.log("Error happened here!");
      console.error(error);
    }
  } else {
    console.log("something else");
  }
}
