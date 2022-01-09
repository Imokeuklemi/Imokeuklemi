import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";

import Link from "next/link";
import { PrismaClient } from "@prisma/client";

function DepartmentPage(props) {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      department: [
        {
          id: uuid(),
          code: "",
          departmentName: "",
        },
      ],
    },

    onSubmit: (values) => {
      const department = values.department;
      axios
        .post("/api/school/department", department)
        .then((response) => {
          if (!response.data.error) {
            router.push(`/school/department}`);
          }
        })
        .catch(function (error) {
          return error;
        });
    },
  });

  const handleNewField = () => {
    formik.setFieldValue("department", [
      ...formik.values.department,
      {
        id: uuid(),
        code: "",
        departmentName: "",
      },
    ]);
  };

  const handleRemoveField = (id) => {
    formik.setFieldValue(
      "department",
      formik.values.department.filter((department) => department.id !== id)
    );
  };

  return (
    <div className="form">
      <form onSubmit={formik.handleSubmit}>
        {formik.values.department.map((department, index) => (
          <div key={department.id}>
            <div className="row">
              <input type="hidden" name="qualification_id" value={""} />
              <div className="mb-3 col-md-3 col-sm-6">
                <label className="form-label">code</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  {...formik.getFieldProps(`department[${index}].code`)}
                />
                {formik.touched.code && formik.errors.code ? (
                  <div>{formik.errors.code}</div>
                ) : null}
              </div>

              <div className="mb-3 col-md-3 col-sm-6">
                <label className="form-label">Department Name</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  {...formik.getFieldProps(
                    `department[${index}].departmentName`
                  )}
                />
                {formik.touched.departmentName &&
                formik.errors.departmentName ? (
                  <div>{formik.errors.departmentName}</div>
                ) : null}
              </div>
              <div className="mt-4 col-md-3 btn-lg btn-md col-sm-6 justify-content-center align-items-center">
                <button
                  type="button"
                  onClick={() => handleRemoveField(department.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="mb-3 d-flex gap-3 d-grid justify-content-center align-items-center">
          <button className="btn btn-primary me-3 btn-lg" type="submit">
            Submit
          </button>
          <button
            className="btn btn-Secondary me-3 btn-lg"
            type="button"
            onClick={handleNewField}
          >
            Add Field
          </button>
        </div>
      </form>
    </div>
  );
}

// export async function getServerSideProps({ query }) {
//   const prisma = new PrismaClient();
//   const { bid } = query;
//   const ssceCert = await prisma.qualification.findMany({
//     where: {
//       matricNumber: bid,
//     },
//   });

//   for (const iterator of ssceCert) {
//     if (iterator.certificateObtained == "ssce/gce") {
//       const ssceCertId = iterator.id;
//       return {
//         props: {
//           ssceCertId,
//           bid,
//         },
//       };
//     }
//   }
// }

export default DepartmentPage;
