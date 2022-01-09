import React from "react";
import StudentLayout from "../../components/studentLayout";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { PrismaClient } from "@prisma/client";
import { Table } from "react-bootstrap";
import Link from "next/link";

export default withPageAuthRequired(function index({
  user,
  studentList,
}) {
  console.log(studentList);
  console.log(user);
  return (
    <div>
      <div>
        <Table className="table table-responsive-sm table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Date of Birth</th>
              <th scope="col">Sex</th>
              <th scope="col">Programme</th>
              <th scope="col">First Choice</th>
              <th scope="col">Second Choice</th>
              <th scope="col">Email Address</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
               <tr>
                  <td className="">
                    {studentList.firstName +
                      " " +
                      studentList.middleName +
                      " " +
                      studentList.surname}
                  </td>
                  <td className="">{studentList.dateOfBirth}</td>
                  <td className="">{studentList.sex}</td>
                  <td className="">{studentList.programme}</td>
                  <td className="">{studentList.courseOfStudy}</td>
                  <td className="">{studentList.altCourseOfStudy}</td>
                  <td className="">{studentList.pEmail}</td>
                  <td className="">
                    <Link href={`/api/biodata/matric/${studentList.id}`}>
                      Generate Matric
                    </Link>
                  </td>
                </tr>
              </tbody>
        </Table>
      </div>
    </div>
  );
});

withPageAuthRequired.layout = StudentLayout;

export const getServerSideProps = withPageAuthRequired({
  returnTo: "/foo",
  async getServerSideProps(ctx) {
    // access the user session
    const {session, user} = getSession(ctx.req, ctx.res);
    const prisma = new PrismaClient();
    const studentList = await prisma.biodata.findFirst({
      where: {
        pEmail: user.email,
      },
    });

    return {
      props: {
        studentList: JSON.parse(JSON.stringify(studentList)),
      },
    };
  },
});
