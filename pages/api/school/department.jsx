//import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handleInsert(req, res) {
  if (req.method === "POST") {
    const dept = await prisma.department
      .createMany({
        data: req.body,
      })
      .then(() => {
        res.send(JSON.stringify(dept));
      })
      .catch(function (err) {
        res.json(err);
      });
    res.json(dept.code);
  } else if (req.method === "GET") {
    const listDepartment = await prisma.department.findMany();
    res.send(listDepartment);
  } else if (req.method === "PUT") {
    try {
      const id = req.params.id;
      const updateDept = await prisma.department.update({
        where: { code: id },
      });
      res.json(updateDept);
    } catch (error) {
      console.log("Error happened here!");
      console.error(error);
    }
  } else {
    console.log("something else");
  }
}
