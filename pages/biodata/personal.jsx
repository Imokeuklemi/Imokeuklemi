import React, { useState } from "react";
import { useRouter } from "next/router";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import prisma from "../../lib/prisma";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import Axios from "axios";
import * as yup from "yup";
import personalContact from "./contact";
import Model from "./model";
import {
  StateMachineProvider,
  createStore,
  useStateMachine,
} from "little-state-machine";


const schema = yup.object({
  firstName: yup.string().required("Your first name is required."),
  surname: yup.string().required("Your surname is required."),
  middleName: yup.string().required("Your middle name is required."),
  dateOfBirth: yup.date().required("Date of Birth is required."),
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
});

export default withPageAuthRequired(function AdmissionForm({
  user,
  listOfState,
  listOfLocal,
  countryList,
  programmes,
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
  };
  const router = useRouter();
  const { isLoading } = useUser();

  const [dState, setDState] = useState("");
  const [countrySelected, setCountrySelected] = useState("");

  const countryChange = (e) => {
    setCountrySelected(e.target.value);
  };
  const stateChange = (e) => {
    setDState(e.target.value);
  };

  const onSubmit = async (data) => {
    console.log(data);
    data.dateOfBirth = new Date(data.dateOfBirth);
    data.pPhone = String(data.pPhone);
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

  const reNationality = register("nationality", { required: true });
  const regStateOfOrigin = register("stateOfOrigin", { required: true });

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
                </div>
              </div>
              <div className="card-footer">
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-block">
                    Continue
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

    return {
      props: {
        listOfState: JSON.parse(JSON.stringify(listOfState)),
        listOfLocal: JSON.parse(JSON.stringify(listOfLocal)),
        countryList: JSON.parse(JSON.stringify(countryList)),
      },
    };
  },
});
