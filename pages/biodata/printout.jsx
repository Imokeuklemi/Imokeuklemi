import React from "react";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { PrismaClient } from "@prisma/client";

import jsPDF from "jspdf";
import { Table } from "react-bootstrap";

const generatePDF = () => {
  var doc = new jsPDF("p", "pt", "a4");

  doc.internal.pageSize.getWidth();
  doc.internal.pageSize.getHeight();
  doc.text("Admission Form Printout", 10, 10);
  doc.addFont("", "", "10px");
  doc.html(document.querySelector("#print-out"), {
    x: 10,
    y: 10,
    fontSize: 10,
    callback: function (pdf) {
      pdf.save("myPrintOut.pdf");
    },
  });
};

export default function Printout({ student, user }) {
  if (student !== "error" || undefined) {
    return (
      <div>
        <div
          id="print-out"
          className="row flex-wrap"
          style={{ fontSize: "10px" }}
        >
          <div className="col-md-4">
            <h5>Personal Details</h5>
            <Table className="table d-table table-responsive-md table-striped table-hover">
              <tbody>
                <tr>
                  <th scope="col">Name</th>
                  <td className="">
                    {student.firstName +
                      " " +
                      student.middleName +
                      " " +
                      student.surname}
                  </td>
                </tr>
                <tr>
                  <th scope="col">Maiden name</th>
                  <td className="">{student.maidenName}</td>
                </tr>
                <tr>
                  <th scope="col">Date of Birth</th>
                  <td className="">{student.dateOfBirth}</td>
                </tr>
                <tr>
                  <th scope="col">Sex</th>
                  <td className="">{student.sex}</td>
                </tr>
                <tr>
                  <th scope="col">Marital Status</th>
                  <td className="">{student.maritalStatus}</td>
                </tr>
                <tr>
                  <th scope="col">Personal Email</th>
                  <td className="">{student.pEmail}</td>
                </tr>
                <tr>
                  <th scope="col">Personal Phone</th>
                  <td className="">{student.pPhone}</td>
                </tr>
                <tr>
                  <th scope="col">City</th>
                  <td className="">{student.ctOfOrigin}</td>
                </tr>
                <tr>
                  <th scope="col">LGA</th>
                  <td className="">{student.lgaOfOrigin}</td>
                </tr>
                <tr>
                  <th scope="col">State</th>
                  <td className="">{student.stateOfOrigin}</td>
                </tr>
                <tr>
                  <th scope="col">Nationality</th>
                  <td className="">{student.country}</td>
                </tr>
              </tbody>
            </Table>
            <h5>referee</h5>
            <Table className="table table-responsive-md table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Full name</th>
                  <th scope="col">Organization/Work place</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Email</th>
                  <th scope="col">Relationship</th>
                </tr>
              </thead>
              <tbody>
                {student.referee
                  ? student.referee.map((refree, key) => {
                      return (
                        <tr key={key} className="">
                          <td className="">{refree.fullName}</td>
                          <td className="">{refree.org}</td>
                          <td className="">{refree.phone}</td>
                          <td className="">{refree.email}</td>
                          <td className="">{refree.relationship}</td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </Table>
          </div>
          <div className="col-md-4">
            <h5>Personal Contact</h5>
            <Table className="table table-responsive-md table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Address</th>
                  <th scope="col">LGA</th>
                  <th scope="col">State</th>
                  <th scope="col">Country</th>
                  <th scope="col">Contact Phone</th>
                  <th scope="col">Contact Email</th>
                </tr>
              </thead>
              <tbody>
                {student.addresses &&
                  student.addresses.map((adress, key) => {
                    return (
                      <tr key={key} className="">
                        <td className="">{adress.address}</td>
                        <td className="">{adress.contact_lg}</td>
                        <td className="">{adress.contState}</td>
                        <td className="">{adress.country}</td>
                        <td className="">{adress.contPhone}</td>
                        <td className="">{adress.contEmail}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
            <h5>Programme Details</h5>
            <Table className="table table-responsive-md table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Programme</th>
                  <th scope="col">First Choice</th>
                  <th scope="col">Second Choice</th>
                  <th scope="col">Mode of Studies</th>
                </tr>
              </thead>
              <tbody>
                <tr className="">
                  <td className="">{student.programme}</td>
                  <td className="">{student.courseOfStudy}</td>
                  <td className="">{student.alternateCourseOfStudy}</td>
                  <td className="">{student.modeOfStudy}</td>
                </tr>
              </tbody>
            </Table>
            <h5>Education Qualification</h5>
            <Table className="table table-responsive-md table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Institution</th>
                  <th scope="col">Year Graduated</th>
                  <th scope="col">Certificate Obtained</th>
                  <th scope="col">Specialty</th>
                </tr>
              </thead>
              <tbody>
                {student.qualification.map((qual, key) => {
                  return (
                    <tr key={key} className="">
                      <td className="">{qual.institute}</td>
                      <td className="">{qual.yearGraduated}</td>
                      <td className="">{qual.certificateObtained}</td>
                      <td className="">{qual.specialty}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <h5>SSSC Subjects</h5>
            <Table className="table table-responsive-sm table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Qualification Id</th>
                  <th scope="col">Subjects</th>
                  <th scope="col">Grade Obtained</th>
                  <th scope="col">Exam Type</th>
                </tr>
              </thead>
              <tbody>
                {student.subjects
                  ? student.subjects.map((subject, key) => {
                      return (
                        <tr key={key} className="">
                          <td className="">{subject.pid}</td>
                          <td className="">{subject.subject}</td>
                          <td className="">{subject.grade}</td>
                          <td className="">{subject.examType}</td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </Table>
          </div>
          <div className="col-md-6"></div>
        </div>
        <button onClick={generatePDF} type="primary">
          Download pdf
        </button>
      </div>
    );
  }
}

export async function getServerSideProps(ctx) {
  // access the user session
  const prisma = new PrismaClient();
  try {
    const response = await prisma.personalinfo.findUnique({
      where: { id: Number(ctx.query.pid) },
      include: {
        qualification: true,
        subjects: true,
        addresses: true,
        referee: true,
      },
    });
    return {
      props: {
        student: JSON.parse(JSON.stringify(response)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { student: JSON.parse(JSON.stringify(error)) },
    };
  }
}
