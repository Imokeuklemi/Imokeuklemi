import React, { useState } from "react";
import { useRouter } from "next/router";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import prisma from "../../lib/prisma";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Axios from "axios";
import * as yup from "yup";
import { date } from "yup/lib/locale";

const schema = yup.object({
  firstName: yup.string().required("Your first name is required."),
  surname: yup.string().required("Your surname is required."),
  middleName: yup.string().required("Your middle name is required."),
  dateOfBirth: yup.date("dd/mm/yyyy").required("Date of Birth is required."),
  sex: yup.string().required("Required"),
  maidenName: yup.string(),
  maritalStatus: yup.string().required("required"),
  lgaOfOrigin: yup.string().required("required"),
  stateOfOrigin: yup.string().required("required"),
  ctOfOrigin: yup.string(),
  pPhone: yup.number().required("Provide your phone number"),
  email: yup
    .string()
    .required("Required. and should be same aa you login email"),
  nationality: yup.string().required("required"),
  contEmail: yup.string(),
  contact_lg: yup.string("required"),
  contPhone: yup.number().required("Phone number is required."),
  contState: yup.string("required"),
  address: yup.string("required"),
  country: yup.string("required"),
  programme: yup.string().required("select your programme from the list"),
  courseOfStudy: yup
    .string()
    .required("select your first course from the list"),
  altCourseOfStudy: yup.string("select your secondaru course"),
  modeOfStudies: yup.string().required("Indecate your model of studies"),
});

export default withPageAuthRequired(function AdmissionForm({
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
    firstName: "",
    surname: "",
    middleName: "",
    dateOfBirth: "",
    sex: "",
    maidenName: "",
    maritalStatus: "",
    lgaOfOrigin: "",
    ctOfOrigin: "",
    stateOfOrigin: "",
    nationality: "",
    pPhone: "",
    email: "",
    address: "",
    contEmail: "",
    contact_lg: "",
    contactState: "",
    country: "",
    contPhone: "",
    programme: "",
    courseOfStudy: "",
    altCourseOfStudy: "",
    modeOfStudies: "",
  };
  const router = useRouter();
  const { isLoading } = useUser();

  const [dState, setDState] = useState("");
  const [countrySelected, setCountrySelected] = useState("");

  const [selectedCourseOfStudy, setSelectedCourseOfStudy] = useState("");

  const [contactCountrySelected, setContactCountrySelected] = useState("");
  const [contactStateSelected, setContactStateSelected] = useState("");

  const contactCountryChange = (e) => {
    setContactCountrySelected(e.target.value);
  };
  const contactStateChange = (e) => {
    setContactStateSelected(e.target.value);
  };

  const handleProgOfStudy = (e) => {
    setSelectedCourseOfStudy(e.target.value);
  };

  const countryChange = (e) => {
    setCountrySelected(e.target.value);
  };
  const stateChange = (e) => {
    setDState(e.target.value);
  };

  const onSubmit = async (data) => {
    const dday = data.dateOfBirth.getDate();
    const dmonth = data.dateOfBirth.getMonth();
    const dyear = data.dateOfBirth.getYear();
    console.log(dday);
    data.dateOfBirth = new date(dday, dmonth, dyear);
    data.pPhone = String(data.pPhone);
    data.contPhone = String(data.contPhone);
    console.log(data);
    Axios.post("/api/personal_data/registration", data)
      .then((response) => {
        if (response.data.error) {
          console.log(response.data);
        }
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
  const reNationality = register("nationality", { required: true });
  const regStateOfOrigin = register("stateOfOrigin", { required: true });
  const regContactNation = register("country", { required: true });
  const regContactState = register("contactState", { required: true });
  const regCourseofStudy = register("courseOfStudy", { required: true });
  const regAltCourseOfStudy = register("altCourseOfStudy", { required: true });

  return (
    <>
      {isLoading && <h4>loading...</h4>}
      {user && (
        <div className="container" style={{ maxWidth: "700px" }}>
          <form onSubmit={handleSubmit(onSubmit)} className="g-3">
            <div className="card">
              <h6>Carefully fill the form</h6>
              <div className="card-header">
                <legend>Personal Information</legend>
              </div>
              <div className="card-body">
                <div className="p-2 flex-fill flex-row">
                  <div className="row">
                    <input type="hidden" name="user_id" />
                    <>
                      <div className="form-floating mb-3 col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          {...register("firstName", {
                            required: true,
                          })}
                        />
                        <label htmlFor="firstName" className="form-label">
                          First name
                        </label>
                        <span className="text-danger">
                          {errors.firstName?.message}
                        </span>
                      </div>

                      <div className="form-floating mb-3 col-md-6 ">
                        <input
                          type="Text"
                          className="form-control"
                          {...register("middleName", {
                            required: true,
                          })}
                        />
                        <label htmlFor="middleName" className="form-label">
                          Middle Name
                        </label>
                        <span className="text-danger">
                          {errors.middleName?.message}
                        </span>
                      </div>

                      <div className="form-floating mb-3 col-md-6 ">
                        <input
                          type="text"
                          className="form-control"
                          {...register("surname", {
                            required: true,
                          })}
                        />
                        <label htmlFor="surname" className="form-label">
                          surname
                        </label>
                        <span className="text-danger">
                          {errors.surname?.message}
                        </span>
                      </div>

                      <div className="form-floating col-md-6 mb-3">
                        <select
                          className="form-select"
                          {...register("sex", {
                            required: true,
                          })}
                        >
                          <option>Select</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                        <label htmlFor="sex" className="form-label">
                          Sex
                        </label>
                        <span className="text-danger">
                          {errors.sex?.message}
                        </span>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          {...register("maidenName", {
                            required: true,
                          })}
                        />
                        <label htmlFor="maidenName" className="form-label">
                          Maiden Name (Where applicable)
                        </label>
                        <span className="text-danger">
                          {errors.maidenName?.message}
                        </span>
                      </div>
                      <div className="form-floating mb-3 col-md-6">
                        <select
                          as="select"
                          className="form-select"
                          {...register("maritalStatus", {
                            required: true,
                          })}
                          aria-label="Default select example"
                        >
                          <option value="">Select</option>
                          <option value="married">Married</option>
                          <option value="single">Single</option>
                          <option value="others">Others</option>
                        </select>
                        <label htmlFor="maritalStatus" className="form-label">
                          Marrital Status
                        </label>
                        <span className="text-danger">
                          {errors.maritalStatus?.message}
                        </span>
                      </div>

                      <div className="form-floating mb-3 col-md-6">
                        <input
                          type="date"
                          className="form-control"
                          {...register("dateOfBirth", {
                            required: true,
                          })}
                        />
                        <label htmlFor="dateOfBirth" className="form-label">
                          Date of Birth
                        </label>
                        <span className="text-danger">
                          {errors.dateOfBirth?.message}
                        </span>
                      </div>

                      <div className="form-floating mb-3 col-md-6">
                        <select
                          className="form-select"
                          onChange={(e) => {
                            countryChange(e);
                            reNationality.onChange(e);
                          }}
                          ref={reNationality.ref}
                          name={reNationality.name}
                        >
                          <option>Select</option>
                          {countryList.map((countryOfOrigin) => (
                            <option
                              value={countryOfOrigin.id}
                              key={countryOfOrigin.id}
                            >
                              {countryOfOrigin.name}
                            </option>
                          ))}
                        </select>
                        <label
                          className="form-check-label"
                          htmlFor="nationality"
                        >
                          Nationalit
                        </label>
                        <span className="text-danger">
                          {errors.nationality?.message}
                        </span>
                      </div>
                    </>
                    <div className="form-floating mb-3 col-md-6">
                      <select
                        className="form-select"
                        onChange={(e) => {
                          stateChange(e);
                          regStateOfOrigin.onChange(e);
                        }}
                        ref={regStateOfOrigin.ref}
                        name={regStateOfOrigin.name}
                      >
                        <option>Select one</option>
                        {listOfState
                          .filter(
                            (countryId) =>
                              countryId.country_id == countrySelected
                          )
                          .map((stateOrigin) => (
                            <option value={stateOrigin.id} key={stateOrigin.id}>
                              {stateOrigin.name}
                            </option>
                          ))}
                      </select>
                      <label htmlFor="stateOfOrigin" className="form-label">
                        State of Origin
                      </label>
                      <span className="text-danger">
                        {errors.stateOfOrigin?.message}
                      </span>
                    </div>
                    <div className="form-floating mb-3 col-md-6">
                      <select
                        className="form-select"
                        {...register("lgaOfOrigin", {
                          required: true,
                        })}
                      >
                        <option>Select</option>
                        {listOfLocal
                          .filter((stateId) => stateId.state_id == dState)
                          .map((localOrigin) => (
                            <option value={localOrigin.id} key={localOrigin.id}>
                              {localOrigin.name}
                            </option>
                          ))}
                      </select>
                      <label htmlFor="lgaOfOrigin" className="form-label">
                        LGA of Origin
                      </label>
                      <span className="text-danger">
                        {errors.lgaOfOrigin?.message}
                      </span>
                    </div>
                    <div className="form-floating mb-3 col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        {...register("ctOfOrigin", {
                          required: true,
                        })}
                      />
                      <label htmlFor="ctOfOrigin" className="form-label">
                        City/Town of Birth
                      </label>
                      <span className="text-danger">
                        {errors.ctOfOrigin?.message}
                      </span>
                    </div>

                    <div className="form-floating mb-3 col-md-6">
                      <input
                        value={user.email}
                        type="email"
                        {...register("email", {
                          required: true,
                        })}
                        readly="true"
                        className="form-control"
                      />
                      <label htmlFor="email" className="form-label">
                        Working Email
                      </label>
                      <span className="text-danger">
                        {errors.email?.message}
                      </span>
                    </div>
                    <div className="form-floating mb-3 col-md-6">
                      <input
                        type="number"
                        className="form-control"
                        {...register("pPhone", {
                          required: true,
                        })}
                      />
                      <label htmlFor="pPhone" className="form-label">
                        Personal Phone Number
                      </label>
                      <span className="text-danger">
                        {errors.pPhone?.message}
                      </span>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="p-2 flex-fill flex-row">
                      <legend>
                        <h1>Personal Contact</h1>
                        <hr />
                      </legend>
                      <div className="row">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            {...register("address", {
                              required: true,
                            })}
                            placeholder="1234 Main St"
                          />
                          <label htmlFor="address" className="form-label">
                            Address
                          </label>
                          <span className="text-danger">
                            {errors.address?.message}
                          </span>
                        </div>
                        <div className="form-floating mb-3 col-md-6">
                          <select
                            className="form-select"
                            onChange={(e) => {
                              contactCountryChange(e);
                              regContactNation.onChange(e);
                            }}
                            ref={regContactNation.ref}
                            name={regContactNation.name}
                          >
                            <option>Select</option>
                            {countryList.map((country) => (
                              <option value={country.id} key={country.id}>
                                {country.name}
                              </option>
                            ))}
                          </select>
                          <label htmlFor="country" className="form-label">
                            Country of Contact
                          </label>
                          <span className="text-danger">
                            {errors.country?.message}
                          </span>
                        </div>
                        <div className="form-floating mb-3 col-md-6">
                          <select
                            className="form-select"
                            onChange={(e) => {
                              contactStateChange(e);
                              regContactState.onChange(e);
                            }}
                            ref={regContactState.ref}
                            name={regContactState.name}
                            aria-label="Default select example"
                          >
                            <option>Select</option>
                            {listOfState
                              .filter(
                                (filteredCountry) =>
                                  filteredCountry.country_id ===
                                  Number(contactCountrySelected)
                              )
                              .map((contactState) => (
                                <option
                                  value={contactState.id}
                                  key={contactState.id}
                                >
                                  {contactState.name}
                                </option>
                              ))}
                          </select>
                          <label htmlFor="contactState" className="form-label">
                            State
                          </label>
                          <span className="text-danger">
                            {errors.contactState?.message}
                          </span>
                        </div>
                        <div className="form-floating mb-3 col-md-6">
                          <select
                            className="form-select"
                            {...register("contact_lg", {
                              required: true,
                            })}
                            aria-label="Default select example"
                          >
                            <option>Select</option>

                            {listOfLocal
                              .filter(
                                (filteredState) =>
                                  filteredState.state_id ===
                                  Number(contactStateSelected)
                              )
                              .map((contactLG) => (
                                <option value={contactLG.id} key={contactLG.id}>
                                  {contactLG.name}
                                </option>
                              ))}
                          </select>
                          <label htmlFor="contact_lg" className="form-label">
                            LGA
                          </label>
                          <span className="text-danger">
                            {errors.contactLG?.message}
                          </span>
                        </div>
                        <div className="form-floating mb-3 col-md-6">
                          <input
                            type="email"
                            className="form-control"
                            {...register("contEmail", {
                              required: true,
                            })}
                          />
                          <label htmlFor="contEmail" className="form-label">
                            Contact Email
                          </label>
                          <span className="text-danger">
                            {errors.contEmail?.message}
                          </span>
                        </div>
                        <div className="form-floating mb-3">
                          <input
                            type="number"
                            className="form-control"
                            {...register("contPhone", {
                              required: true,
                            })}
                            id="contPhone"
                            placeholder="1234"
                          />
                          <label htmlFor="contPhone" className="form-label">
                            Phone Number
                          </label>
                          <span className="text-danger">
                            {errors.contPhone?.message}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <legend>
                    <h2>programme of Studies</h2>
                    <hr />
                  </legend>
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
                          <option
                            value={department.deptName}
                            key={department.id}
                          >
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
