import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handle(req, res) {
  if (req.method === "POST") {
    const createdUser = await prisma.personalinfo
      .create(req.body)
      .then(() => {
        res.send(JSON.stringify(createdUser));
      })
      .catch(function (err) {
        res.json(err);
      });
    res.json(createdUser.id);
  } else if (req.method === "GET") {
    const role = "personal";
    console.log(req.query);
    if (req.query.pid !== null || undefined) {
      try {
        const getStudent = await prisma.personalinfo.findUnique({
          where: {
            registrationNumber: req.query.pid,
          },
        });
        if (getStudent === undefined || null) {
          res.send("message");
        }
        res.send({ id: getStudent.id, pid: getStudent.pid });
      } catch (error) {
        res.json(error);
      }
      // } else if (role === "admin") {
      //   const getStudent = await prisma.personalinfo.findAll();
      //   res.json(getStudent.id, getStudent.registrationNumber);
      // }
    } else if (req.method === "PUT") {
      try {
        const id = req.params.id;
        const userDetail = await prisma.personalinfo.findOne({
          where: { uid: id },
        });
        res.json(userDetail);
      } catch (error) {
        console.log("Error happened here!");
        console.error(error);
      }
    } else {
      console.log("something else");
    }
  }
}
