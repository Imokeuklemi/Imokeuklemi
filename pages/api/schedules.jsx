import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  const { sid } = req.query;
  if (sid === undefined || sid === null || sid === NaN) {
    return null;
  }
  const getSchedule = await prisma.schedules.findUnique({
    where: {
      id: Number(sid),
    },
  });
  res.status(200).json(getSchedule);
}
