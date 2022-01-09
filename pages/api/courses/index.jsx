import { PrismaClient } from "@prisma/client";
import prisma  from "../../../lib/prisma";

export default async function handleInsert(req, res) {
  if (req.method === "POST") {
  } else if (req.method === "GET") {
    const semester = req.params.semester;
    const list_of_course = await prisma.courses.findMany({
      where: {
        semester: semester,
        programmes: req.params.programmes,
      },
    });
    res.status(200).json(list_of_course);
  }
}
