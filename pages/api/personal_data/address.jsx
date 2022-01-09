import prisma from "../../../lib/prisma";
//import { PrismaClient } from "@prisma/client";

// import type { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const createContact = await prisma.addresses.create({
        data: {
          address: req.body.address,
          contact_lg: Number(req.body.contact_lg),
          contPhone: req.body.contPhone.toString(),
          contEmail: req.body.contEmail,
          pid: Number(req.query.pid),
        },
      });
      console.log(createContact);
      res.status(200).json({ pid: req.query.pid });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "failed to load data" });
    }
  } else if (req.method === "GET") {
    // const id = req.query.id;
    // if (id !== undefined) {
    //   const ListAll = await prisma.users.findMany({
    //     where: {
    //       id: id,
    //     },
    //   });
    //   return ListAll;
    // }
    // else{

    // }
    const ListAll = await prisma.adresses.findMany();
    res.status(200).json(ListAll);
  } else if (req.method === "PUT") {
    const id = req.body.id;

    const getUser = await prisma.adresses.findUnique({
      where: { id: id },
      select: {
        registrationNumber: true,
      },
    });

    if (getUser.registrationNumber !== null) {
      console.log(getUser);
      res.json(getUser);
    } else {
      const letter = req.body.programme.charAt(0);
      const deptCode =
        req.body.dept.length < 2 ? "0" + req.body.dept : req.body.dept;

      function pad(n, width, z) {
        z = z || "0";
        n = n + "";
        return n.length >= width
          ? n
          : new Array(width - n.length + 1).join(z) + n;
      }
      try {
        const regId = letter + deptCode + req.body.yearAdmitted + pad(id, 4);
        const genReg = await prisma.users.update({
          where: { id: id },
          data: { registrationNumber: regId },
        });
        res.json(genReg);
      } catch (error) {
        console.log("Error happened here!");
        console.error(error);
      }
    }
  }
};
