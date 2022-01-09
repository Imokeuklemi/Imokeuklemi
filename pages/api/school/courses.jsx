//import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handleInsert(req, res) {
  if (req.method === "POST") {
    const course = await prisma.courses
      .createMany(req.body)
      .then(() => {
        res.send(JSON.stringify(course));
      })
      .catch(function (err) {
        res.json(err);
      });
    res.json(course.id);
  } else if (req.method === "GET") {
    const listCourses = await prisma.courses.findAll();
    res.send(listDetail);
  } else if (req.method === "PUT") {
    try {
      const id = req.params.id;
      const updatedCourse = await prisma.courses.updatedCourse({
        where: { id: id },
      });
      res.json(updatedCourse);
    } catch (error) {
      console.log("Error happened here!");
      console.error(error);
    }
  } else {
    console.log("something else");
  }
}
