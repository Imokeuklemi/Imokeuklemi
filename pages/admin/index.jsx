import { Table } from "react-bootstrap";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

import React from "react";

const index = ({ studentList }) => {
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
            {studentList.map((slist, key) => {
              return (
                <tr key={key} className="">
                  <td className="">
                    {slist.firstName +
                      " " +
                      slist.middleName +
                      " " +
                      slist.surname}
                  </td>
                  <td className="">{slist.dateOfBirth}</td>
                  <td className="">{slist.sex}</td>
                  <td className="">{slist.programme}</td>
                  <td className="">{slist.courseOfStudy}</td>
                  <td className="">{slist.altCourseOfStudy}</td>
                  <td className="">{slist.pEmail}</td>
                  <td className="">
                    <Link href={`/api/admin/:${slist.id}`}>
                      Generate Matric
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { param, req, res } = context;
  const prisma = new PrismaClient();
  const studentList = await prisma.biodata.findMany({
    where: {
      id: parseFloat(context.query.id),
    },
  });

  return {
    props: {
      studentList: JSON.parse(JSON.stringify(studentList)),
    },
  };
}

export default index;
