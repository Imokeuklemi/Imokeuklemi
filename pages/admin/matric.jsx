import React from "react";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useForm } from "react-hook-form";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import * as Yup from "yup";

export default function CreateMatric({ progList, deptList, bioUser }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.id = Number(data.id);
    axios.put(`/api/personal_data/registration`, data).then((response) => {
      if (response.data.error) {
        console.log(response.data);
        return response.data.error;
      }
      console.log(response);
      router.push(`/admin/`);
    });
  };

  const currentYear = new Date().getFullYear();
  const range = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );
  const yearList = range(currentYear, currentYear - 10, -1);
  // [2019, 2018, 2017, 2016, ..., 1969]

  return (
    <>
      <div className="card text-center mw-50">
        <div className="card-header">
          Generating Student Matriculation Number
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card-body">
            <h5 className="card-title">
              <input
                type="number"
                placeholder="enter the Student form number"
                className="form-control mt-2 mb-2"
                {...register("id", { required: true })}
              />
            </h5>
            <div className="row">
              <div className="col-4">
                <label className="form-label">Department</label>
                <select
                  className="form-control"
                  {...register("dept", { required: true })}
                >
                  <option value="">select here</option>
                  {deptList.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.deptName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-4">
                <label className="form-label">Programme</label>
                <select
                  className="form-control"
                  {...register("programme", { required: true })}
                >
                  <option value="">select here</option>
                  {progList.map((prog) => (
                    <option key={prog.id} value={prog.programme}>
                      {prog.programme}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-4">
                <label htmlFor="yearAdmitted" className="form-label">
                  Year of Admission
                </label>
                <select
                  className="form-control"
                  {...register("yearAdmitted", { required: true })}
                >
                  <option value="select here">select year</option>
                  {yearList.map((year, index) => (
                    <option key={index} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="card-footer text-muted">
            <button type="submit" className="btn btn-success m-2">
              Get Matric Number
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { param, req, res } = context;
  const prisma = new PrismaClient();
  const deptList = await prisma.department.findMany({
    distinct: ["deptName"],
    orderBy: {
      deptName: "asc",
    },
  });

  const progList = await prisma.programme.findMany({
    distinct: ["programme"],
    orderBy: {
      programme: "asc",
    },
  });

  const bioUser = await prisma.users.findMany({
    where: {
      email: "benuklemi@gmail.com",
    },
  });
  return {
    props: {
      progList: JSON.parse(JSON.stringify(progList)),
      bioUser: JSON.parse(JSON.stringify(bioUser)),
      deptList: JSON.parse(JSON.stringify(deptList)),
    },
  };
}
