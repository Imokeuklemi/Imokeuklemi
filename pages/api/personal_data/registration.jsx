import prisma from "../../../lib/prisma";
//import { PrismaClient } from "@prisma/client";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
// import type { NextApiRequest, NextApiResponse } from "next";

export default withApiAuthRequired(async function handler(req, res) {
  const { user } = getSession(req, res);
  //const prisma = new PrismaClient();

  if (req.method === "POST") {
    try {
      const bios = await prisma.personalinfo.create({
        data: {
          firstName: req.body.firstName,
          surname: req.body.surname,
          middleName: req.body.middleName,
          dateOfBirth: new Date(req.body.dateOfBirth),
          sex: req.body.sex,
          maidenName: req.body.maidenName,
          maritalStatus: req.body.maritalStatus,
          ctOfOrigin: req.body.ctOfOrigin,
          mobileNumber: req.body.mobileNumber.toString(),
          email: req.body.email,
          programme: Number(req.body.programme),
          courseOfStudy: Number(req.body.courseOfStudy),
          alternateCourseOfStudy: Number(req.body.alternateCourseOfStudy),
          modeOfStudy: req.body.modeOfStudy,
        },
      });
      console.log(bios);
      res.status(200).json({ bid: bios.id });
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
    const ListAll = await prisma.personalInfo.findMany();
    res.status(200).json(ListAll);
  } else if (req.method === "PUT") {
    const id = req.body.id;

    const getUser = await prisma.personalInfo.findUnique({
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
});
