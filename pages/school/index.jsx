import { Table } from "react-bootstrap";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

import React from "react";

const index = ({ dept, programme }) => {
  return (
    <div>
      <div>
        <Table className="table table-responsive-sm table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Programme Name</th>
              <th scope="col">Department</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {programme.map((subList, key) => {
              return (
                <tr key={key} className="">
                  <td className="">{subList.programme}</td>
                  <td className="">{subList.deptcode}</td>
                  <td className="">
                    <link href={`/api/school/department/:${dept.code}`}>
                      Edit
                    </link>
                    <link href={`/api/school/department/:${dept.code}`}>
                      View
                    </link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <div>
        <Table className="table table-responsive-sm table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Code</th>
              <th scope="col">Department</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {dept.map((dept, key) => {
              return (
                <tr key={key} className="">
                  <td className="">{dept.code}</td>
                  <td className="">{dept.departmentName}</td>
                  <td className="">
                    <link href={`/api/school/department/:${dept.code}`}>
                      Edit
                    </link>
                    <link href={`/api/school/department/:${dept.code}`}>
                      View
                    </link>
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

export async function getServerSideProps({ query }) {
  const prisma = new PrismaClient();
  const dept = await prisma.department.findMany();
  const programme = await prisma.programme.findMany();

  return {
    props: {
      dept: dept,
      programme: programme,
    },
  };
}

export default index;
