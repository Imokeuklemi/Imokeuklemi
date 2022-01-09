import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";

import Link from "next/link";
import { PrismaClient } from "@prisma/client";

function Programme(props) {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      courses: [
        {
          id: uuid(),
          programme: "",
          deptcode: "",
        },
      ],
    },

    onSubmit: (values) => {
      const courses = values.courses;
      axios
        .post("/api/personal_data/ssce", courses)
        .then((response) => {
          if (!response.data.error) {
            router.push(`/biodata/referee?bid=${props.bid}`);
          }
        })
        .catch(function (error) {
          return error;
        });
    },
  });

  const handleNewField = () => {
    formik.setFieldValue("courses", [
      ...formik.values.courses,
      {
        id: uuid(),
        programme: "",
        deptcode: "",
      },
    ]);
  };

  const handleRemoveField = (id) => {
    formik.setFieldValue(
      "courses",
      formik.values.courses.filter((courses) => courses.id !== id)
    );
  };

  return (
    <div className="form">
      <form onSubmit={formik.handleSubmit}>
        {formik.values.courses.map((courses, index) => (
          <div key={courses.id}>
            <div className="row">
              <input type="hidden" name="qualification_id" value={""} />
              <div className="mb-3 col-md-3 col-sm-6">
                <label className="form-label">Programme Name</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  {...formik.getFieldProps(`courses[${index}].programme`)}
                />
                {formik.touched.programme && formik.errors.programme ? (
                  <div>{formik.errors.programme}</div>
                ) : null}
              </div>

              <div className="mb-3 col-md-3 col-sm-6">
                <label className="form-label">Department Code</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  {...formik.getFieldProps(`courses[${index}].deptcode`)}
                />
                {formik.touched.deptcode && formik.errors.deptcode ? (
                  <div>{formik.errors.deptcode}</div>
                ) : null}
              </div>

              <div className="mt-4 col-md-3 btn-lg btn-md col-sm-6 justify-content-center align-items-center">
                <button
                  type="button"
                  onClick={() => handleRemoveField(courses.id)}
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

export default Programme;
