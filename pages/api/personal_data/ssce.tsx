import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function handleInsert(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { subject, grade, examType, qid } = req.body;
  if (req.method == "POST") {
    req.body.pid = Number(req.body.pid)
    const subjects = await prisma.subjects.createMany({
      data: req.body,
      skipDuplicates: true,
    });
    res.json(subjects);
  } else if (req.method == "GET") {
    const ssce = await prisma.qualification.findFirst({
      where: {
        pid: qid.toString(),
        certificateObtained: "ssce/gce",
      },
    });
  } else if (req.method == "PUT") {
  } else if (req.method == "DELETE") {
  } else {
  }
}
