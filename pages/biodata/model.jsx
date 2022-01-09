import React, { useState } from "react";
import { useRouter } from "next/router";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import prisma from "../../lib/prisma";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Axios from "axios";
import * as yup from "yup";

const schema = yup.object({
  programme: yup.string().required("select your programme from the list"),
  courseOfStudy: yup
    .string()
    .required("select your first course from the list"),
  altCourseOfStudy: yup.string("select your secondaru course"),
  modeOfStudies: yup.string().required("Indecate your model of studies"),
});

export default withPageAuthRequired(function ModeForm({
  user,
  listOfState,
  listOfLocal,
  countryList,
  programmes,
  departments,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const initialValues = {
    programme: "",
    courseOfStudy: "",
    altCourseOfStudy: "",
    modeOfStudies: "",
  };
  const router = useRouter();
  const { isLoading } = useUser();

  const [selectedCourseOfStudy, setSelectedCourseOfStudy] = useState("");

  const handleProgOfStudy = (e) => {
    setSelectedCourseOfStudy(e.target.value);
  };

  const onSubmit = async (data) => {
    data.dateOfBirth = new Date(data.dateOfBirth);
    data.pPhone = String(data.pPhone);
    data.contPhone = String(data.contPhone);
    console.log(data);
    Axios.post("/api/personal_data/registration", data)
      .then((response) => {
        // if (response.data.error) {
        //   console.log(response.data);
        // }
        localStorage.setItem("bid", response.data.bid);
        router.push({
          pathname: "/biodata/qualifications",
          query: { bid: response.data.bid },
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const regCourseofStudy = register("courseOfStudy", { required: true });

  return (
    <>
      {isLoading && <h4>loading...</h4>}
      {user && (
        <div className="container" style={{ maxWidth: "700px" }}>
          <form onSubmit={handleSubmit(onSubmit)} className="g-3">
            <div className="card">
              <h6>Carefully fill the form</h6>
              <div className="card-header">
                <legend>
                  <h2>programme of Studies</h2>
                  <hr />
                </legend>{" "}
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="form-floating mb-3 col-md-6">
                    <select
                      className="form-select"
                      {...register("programme", {
                        required: true,
                      })}
                      aria-label="Default select example"
                    >
                      <option>Select</option>
                      {programmes.map((programme, index) => (
                        <option value={programme.prog_name} key={index}>
                          {programme.prog_name}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="programme" className="form-label">
                      programme
                    </label>
                    <span className="text-danger">
                      {errors.programme?.message}
                    </span>
                  </div>
                  <div className="form-floating mb-3 col-md-6">
                    <select
                      id="courseOfStudy"
                      className="form-select"
                      {...register("courseOfStudy", {
                        required: true,
                      })}
                      onChange={(e) => {
                        handleProgOfStudy(e);
                        regCourseofStudy.onChange(e);
                      }}
                      ref={regCourseofStudy.ref}
                      name={regCourseofStudy.name}
                      aria-label="Default select example"
                    >
                      <option>Select</option>
                      {departments.map((department, index) => (
                        <option value={department.deptName} key={department.id}>
                          {department.deptName}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="courseOfStudy" className="form-label">
                      Course of Studies
                    </label>
                    <span className="text-danger">
                      {errors.courseOfStudy?.message}
                    </span>
                  </div>
                  <div className="form-floating mb-3 col-md-6">
                    <select
                      id="altCourseOfStudy"
                      className="form-select"
                      {...register("altCourseOfStudy", {
                        required: true,
                      })}
                      aria-label="Default select example"
                    >
                      <option>Select</option>
                      {departments
                        .filter(
                          (secondChoice) =>
                            secondChoice.deptName !== selectedCourseOfStudy
                        )
                        .map((department, index) => (
                          <option
                            value={department.deptName}
                            key={department.id}
                          >
                            {department.deptName}
                          </option>
                        ))}
                    </select>
                    <label htmlFor="altCourseOfStudy" className="form-label">
                      Alternative Course of Studies
                    </label>
                    <span className="text-danger">
                      {errors.alternateCourseOfStudy?.message}
                    </span>
                  </div>
                  <div className="form-floating mb-3 col-md-6">
                    <select
                      as="select"
                      id="modeOfStudies"
                      className="form-select"
                      {...register("modeOfStudies", {
                        required: true,
                      })}
                      aria-label="Default select example"
                    >
                      <option value="">Select</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Full-Time">Full-Time</option>
                      <option value="self Space">Self-Space</option>
                    </select>
                    <label htmlFor="modeOfStudies" className="form-label">
                      Mode of Studies
                    </label>
                    <span className="text-danger">
                      {errors.modeOfStudies?.message}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-block">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
});

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    // access the user session
    const { session } = getSession(ctx.req, ctx.res);

    const listOfState = await prisma.states.findMany({
      orderBy: {
        name: "asc",
      },
    });
    const listOfLocal = await prisma.local.findMany({
      orderBy: {
        name: "asc",
      },
    });
    const countryList = await prisma.countries.findMany({
      orderBy: {
        name: "asc",
      },
    });
    const dept = await prisma.department.findMany();
    const prog = await prisma.programme.findMany();

    return {
      props: {
        listOfState: JSON.parse(JSON.stringify(listOfState)),
        listOfLocal: JSON.parse(JSON.stringify(listOfLocal)),
        countryList: JSON.parse(JSON.stringify(countryList)),
        departments: JSON.parse(JSON.stringify(dept)),
        programmes: JSON.parse(JSON.stringify(prog)),
      },
    };
  },
});
