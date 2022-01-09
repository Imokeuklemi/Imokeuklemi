import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

import axios from "axios";
import * as Yup from "yup";
import { PrismaClient } from "@prisma/client";

export default function Create({ listOfState, listOfLocal, countryList }) {
  const { user, isLoading } = useUser();

  const router = useRouter();

  const [dState, setDState] = useState("");
  const [dlocal, setLocal] = useState("");

  const countryChange = (e) => {
    setDState(e.target.value);
    console.log(dState);
  };

  const stateChange = (e) => {
    setLocal(e.target.value);
    console.log(dlocal);
  };

  const initialValues = {
    firstName: "",
    surname: "",
    middleName: "",
    dateOfBirth: "",
    sex: "",
    maidenName: "",
    maritalStatus: "",
    lgaOfOrigin: "",
    stateOfOrigin: "",
    ctOfOrigin: "",
    pPhone: "",
    pEmail: "",
    nationality: "",
    contEmail: "",
    contLGA: "",
    contPhone: "",
    contState: "",
    address: "",
    country: "",
    programme: "",
    courseOfStudy: "",
    altCourseOfStudy: "",
    modeOfStudies: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("most be more than 5 Charracter").min(5),
    surname: Yup.string().required(),
    middleName: Yup.string().required(),
    dateOfBirth: Yup.date().required(),
    sex: Yup.string().required(),
    maidenName: Yup.string(),
    maritalStatus: Yup.string().required(),
    lgaOfOrigin: Yup.string().required(),
    stateOfOrigin: Yup.string().required(),
    ctOfOrigin: Yup.string().required(),
    pPhone: Yup.number().max(11).required(),
    pEmail: Yup.string().required(),
    nationality: Yup.string().required(),
    contEmail: Yup.string(),
    contLGA: Yup.string(),
    contPhone: Yup.number().max(11),
    contState: Yup.string(),
    address: Yup.string(),
    country: Yup.string(),
    programme: Yup.string().required(),
    courseOfStudy: Yup.string().required(),
    altCourseOfStudy: Yup.string(),
    modeOfStudies: Yup.string().required(),
  });

  const handleSubmit = async (values) => {
    values.user_id = 1;
    values.dateOfBirth = new Date(values.dateOfBirth);
    values.pPhone = String(values.pPhone);
    values.contPhone = String(values.contPhone);

    axios.post("/api/personal_data/create", values).then((response) => {
      if (response.data.error) {
        console.log(response.data);
        return response.data;
      }
      localStorage.setItem("bid", response.data.bid);

      router.push({
        pathname: "/biodata/qualifications",
        query: { bid: response.data.bid },
      });
    });
  };

  return (
    <>
      {isLoading && <h4>loading...</h4>}
      {user && (
        <div className="container" style={{ maxWidth: "700px" }}>
          <div className="row">
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}>
              <Form className="g-3">
                <div className="card">
                  <div className="card-header">
                    <legend>Personal Information</legend>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="p-2 flex-fill flex-row">
                        <input type="hidden" name="user_id" />
                        <div className="form-floating mb-3 mt-3">
                          <Field
                            type="text"
                            className="form-control"
                            name="firstName"
                          />
                          <label htmlFor="firstName" className="form-label">
                            First name
                          </label>
                          <ErrorMessage
                            name="firstName"
                            className="text-danger"
                            component="span"
                          />
                        </div>
                      </div>
                      <div className="p-2 flex-fill">
                        {" "}
                        <div className="form-floating mb-3">
                          <Field
                            type="Text"
                            className="form-control"
                            name="middleName"
                          />
                          <label htmlFor="middleName" className="form-label">
                            Middle Name
                          </label>
                          <ErrorMessage
                            name="middleName"
                            className="text-danger"
                            component="span"
                          />
                        </div>
                      </div>
                      <div className="p-2 flex-fill">
                        {" "}
                        <div className="form-floating mb-3">
                          <Field
                            type="text"
                            className="form-control"
                            name="surname"
                          />
                          <label htmlFor="surname" className="form-label">
                            surname
                          </label>
                          <ErrorMessage name="surname" component="span" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-floating mb-3">
                        <Field as="select" className="form-select" name="sex">
                          <option>Select</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </Field>
                        <label htmlFor="sex" className="form-label">
                          Sex
                        </label>
                        <ErrorMessage
                          name="middleName"
                          className="text-danger"
                          component="span"
                        />
                      </div>
                      <div className="form-floating mb-3">
                        <Field
                          type="text"
                          className="form-control"
                          name="maidenName"
                        />
                        <label htmlFor="maidenName" className="form-label">
                          Maiden Name (Where applicable)
                        </label>
                        <ErrorMessage
                          name="middleName"
                          className="text-danger"
                          component="span"
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="form-floating mb-3 col-6">
                        <Field
                          as="select"
                          className="form-select"
                          name="maritalStatus"
                          aria-label="Default select example">
                          <option value="">Select</option>
                          <option value="married">Married</option>
                          <option value="single">Single</option>
                          <option value="others">Others</option>
                        </Field>
                        <label htmlFor="maritalStatus" className="form-label">
                          Marrital Status
                        </label>
                        <ErrorMessage
                          name="maritalStatus"
                          className="text-danger"
                          component="span"
                        />
                      </div>

                      <div className="form-floating mb-3 col-6">
                        <Field
                          type="date"
                          className="form-control"
                          name="dateOfBirth"
                        />
                        <label htmlFor="dateOfBirth" className="form-label">
                          Date of Birth
                        </label>
                        <ErrorMessage
                          name="dateOfBirth"
                          className="text-danger"
                          component="span"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-floating mb-3 col-6">
                        <Field
                          as="select"
                          className="form-select"
                          name="nationality"
                          onSelect={countryChange}>
                          <option>Select</option>
                          {countryList.map((country) => (
                            <option value={country.name} key={country.id}>
                              {country.name}
                            </option>
                          ))}
                        </Field>
                        <label
                          className="form-check-label"
                          htmlFor="nationality">
                          Nationality{" "}
                        </label>
                        <ErrorMessage
                          name="nationality"
                          className="text-danger"
                          component="span"
                        />
                      </div>

                      <div className="form-floating mb-3 col-6">
                        <Field
                          as="select"
                          className="form-select"
                          name="stateOfOrigin"
                          onSelect={stateChange}>
                          <option>Select one</option>
                          {listOfState.map((state) => (
                            <option value={state.name} key={state.id}>
                              {state.name}
                            </option>
                          ))}
                        </Field>
                        <label htmlFor="stateOfOrigin" className="form-label">
                          State of Origin
                        </label>
                        <ErrorMessage
                          name="stateOfOrigin"
                          className="text-danger"
                          component="span"
                        />
                      </div>
                      <div className="form-floating mb-3 col-6">
                        <Field
                          as="select"
                          className="form-select"
                          name="lgaOfOrigin"
                          aria-label="Default select example">
                          <option>Select</option>
                          {listOfLocal.map((local) => (
                            <option value={local.name} key={local.id}>
                              {local.name}
                            </option>
                          ))}
                        </Field>
                        <label htmlFor="lgaOfOrigin" className="form-label">
                          LGA of Origin
                        </label>
                        <ErrorMessage
                          name="lgaOfOrigin"
                          className="text-danger"
                          component="span"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-floating mb-3">
                        <Field
                          type="text"
                          className="form-control"
                          name="ctOfOrigin"
                        />
                        <label htmlFor="ctOfOrigin" className="form-label">
                          City/Town of Birth
                        </label>
                        <ErrorMessage
                          name="ctOfOrigin"
                          className="text-danger"
                          component="span"
                        />
                      </div>

                      <div className="row">
                        <div className="form-floating mb-3">
                          <Field
                            value={user.email}
                            type="email"
                            name="pEmail"
                            readly
                            className="form-control"
                          />
                          <label htmlFor="pEmail" className="form-label">
                            Working Email{" "}
                          </label>
                          <ErrorMessage
                            name="pEmail"
                            className="text-danger"
                            component="span"
                          />
                        </div>
                        <div className="form-floating mb-3">
                          <Field
                            type="number"
                            className="form-control"
                            name="pPhone"
                          />
                          <label htmlFor="pPhone" className="form-label">
                            Personal Phone Number
                          </label>
                          <ErrorMessage
                            name="pPhone"
                            className="text-danger"
                            component="span"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header">
                      <legend>
                        <h1>Personal Contact</h1>
                        <hr />
                      </legend>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <hr />
                        <div className="row">
                          <div className="form-floating mb-3">
                            <Field
                              type="text"
                              className="form-control"
                              name="address"
                              id="dateOfBirth"
                              placeholder="1234 Main St"
                            />
                            <label htmlFor="address" className="form-label">
                              Address
                            </label>
                            <ErrorMessage
                              name="address"
                              className="text-danger"
                              component="span"
                            />
                          </div>
                          <div className="form-floating mb-3 col-6">
                            <Field
                              as="select"
                              className="form-select"
                              name="contState"
                              aria-label="Default select example">
                              <option>Select</option>
                              {listOfLocal.map((state) => (
                                <option value={state.name} key={state.id}>
                                  {state.name}
                                </option>
                              ))}
                            </Field>
                            <label htmlFor="contState" className="form-label">
                              State
                            </label>
                            <ErrorMessage
                              name="contState"
                              className="text-danger"
                              component="span"
                            />
                          </div>
                          <div className="form-floating mb-3 col-6">
                            <Field
                              as="select"
                              className="form-select"
                              name="contLGA"
                              aria-label="Default select example">
                              <option>Select</option>
                              {listOfLocal.map((local) => (
                                <option value={local.name} key={local.id}>
                                  {local.name}
                                </option>
                              ))}
                            </Field>
                            <label htmlFor="contLGA" className="form-label">
                              LGA
                            </label>
                            <ErrorMessage
                              name="contLGA"
                              className="text-danger"
                              component="span"
                            />
                          </div>

                          <div className="form-floating mb-3 col-6">
                            <Field
                              as="select"
                              className="form-select"
                              name="country">
                              <option>Select</option>
                              {countryList.map((country) => (
                                <option value={country.name} key={country.id}>
                                  {country.name}
                                </option>
                              ))}
                            </Field>
                            <label htmlFor="country" className="form-label">
                              Country
                            </label>
                            <ErrorMessage
                              name="country"
                              className="text-danger"
                              component="span"
                            />
                          </div>
                          <div className="form-floating mb-3 col-6">
                            <Field
                              type="email"
                              className="form-control"
                              name="contEmail"
                              id="FieldZip"
                            />
                            <label htmlFor="contEmail" className="form-label">
                              Contact Email
                            </label>
                            <ErrorMessage
                              name="contEmail"
                              className="text-danger"
                              component="span"
                            />
                          </div>
                          <div className="form-floating mb-3">
                            <Field
                              type="number"
                              className="form-control"
                              name="contPhone"
                              id="contPhone"
                              placeholder="1234"
                            />
                            <label htmlFor="contPhone" className="form-label">
                              Phone Number
                            </label>
                            <ErrorMessage
                              name="contPhone"
                              className="text-danger"
                              component="span"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <legend>
                        <h2>programme of Studies</h2>
                        <hr />
                      </legend>
                      <div className="form-floating mb-3 col-6">
                        <Field
                          as="select"
                          className="form-select"
                          name="programme"
                          aria-label="Default select example">
                          <option>Select</option>
                          <option value="CRS">ND</option>
                          <option value="AkwaIbom">HND</option>
                          <option value="Lagos">Degree</option>
                          <option value="others">Post Graduate</option>
                        </Field>
                        <label htmlFor="programme" className="form-label">
                          programme
                        </label>
                        <ErrorMessage
                          name="programme"
                          className="text-danger"
                          component="span"
                        />
                      </div>
                      <div className="form-floating mb-3 col-6">
                        <Field
                          as="select"
                          id="courseOfStudy"
                          className="form-select"
                          name="courseOfStudy"
                          aria-label="Default select example">
                          <option>Select</option>
                          <option value="Computer Science">
                            Computer Science
                          </option>
                          <option value="Engineering">Engineering</option>
                          <option value="Public Administration">
                            Public Administration
                          </option>
                          <option value="Business Administration">
                            Business Administration
                          </option>
                        </Field>
                        <label htmlFor="courseOfStudy" className="form-label">
                          Course of Studies
                        </label>
                        <ErrorMessage
                          name="courseOfStudy"
                          className="text-danger"
                          component="span"
                        />
                      </div>
                      <div className="form-floating mb-3 col-6">
                        <Field
                          as="select"
                          id="altCourseOfStudy"
                          className="form-select"
                          name="altCourseOfStudy"
                          aria-label="Default select example">
                          <option>Select</option>
                          <option value="Computer Science">
                            Computer Science
                          </option>
                          <option value="Engineering">Engineering</option>
                          <option value="Public Administration">
                            Public Administration
                          </option>
                          <option value="Business Administration">
                            Business Administration
                          </option>
                        </Field>
                        <label
                          htmlFor="altCourseOfStudy"
                          className="form-label">
                          Alternative Course of Studies
                        </label>
                        <ErrorMessage
                          name="altCourseOfStudy"
                          className="text-danger"
                          component="span"
                        />
                      </div>
                      <div className="form-floating mb-3 col-6">
                        <Field
                          as="select"
                          id="modeOfStudies"
                          className="form-select"
                          name="modeOfStudies"
                          aria-label="Default select example">
                          <option value="">Select</option>
                          <option value="Part-Time">Part-Time</option>
                          <option value="Full-Time">Full-Time</option>
                          <option value="self Space">Self-Space</option>
                        </Field>
                        <label htmlFor="modeOfStudies" className="form-label">
                          Mode of Studies
                        </label>
                        <ErrorMessage
                          name="modeOfStudies"
                          className="text-danger"
                          component="span"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const { param, req, res } = context;
  const prisma = new PrismaClient();
  const listOfState = await prisma.states.findMany();
  const listOfLocal = await prisma.local.findMany();
  const countryList = await prisma.country.findMany();

  return {
    props: {
      listOfState: JSON.parse(JSON.stringify(listOfState)),
      listOfLocal: JSON.parse(JSON.stringify(listOfLocal)),
      countryList: JSON.parse(JSON.stringify(countryList)),
    },
  };
}
