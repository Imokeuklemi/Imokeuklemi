import React, { useState } from "react";
import { useRouter } from "next/router";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import prisma from "../../lib/prisma";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Axios from "axios";
import * as yup from "yup";
import { pid } from "process";

const schema = yup.object({
  contEmail: yup.string(),
  contact_lg: yup.string("required"),
  contPhone: yup.number().required("Phone number is required."),
  contState: yup.string("required"),
  address: yup.string("required"),
  country: yup.string("required"),
});

export default function AdmissionFormPage2({
  user,
  listOfState,
  listOfLocal,
  countryList,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const { pid } = router.query;

  const initialValues = {
    address: "",
    contEmail: "",
    contact_lg: "",
    contactState: "",
    country: "",
    contPhone: "",
    pid: pid,
  };

  const [contactCountrySelected, setContactCountrySelected] = useState("");
  const [contactStateSelected, setContactStateSelected] = useState("");

  const contactCountryChange = (e) => {
    setContactCountrySelected(e.target.value);
  };
  const contactStateChange = (e) => {
    setContactStateSelected(e.target.value);
  };

  const onSubmit = async (data) => {
    console.log(data);
    Axios.post(`/api/personal_data/address?pid=${pid}`, data)
      .then((response) => {
        localStorage.setItem("pid", response.data.pid);
        router.push(`/biodata/qualification?pid=${pid}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const regContactNation = register("country", { required: true });
  const regContactState = register("contactState", { required: true });

  return (
    <>
      <div className="container" style={{ maxWidth: "700px" }}>
        <form onSubmit={handleSubmit(onSubmit)} className="g-3">
          <div className="card">
            <div className="card-header">
              <legend>
                <h1>Personal Contact</h1>
                <hr />
              </legend>
            </div>
            <div className="card-body">
              <div className="row">
                <input type="hidden" name="pid" value={pid} />
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
                  <span className="text-danger">{errors.address?.message}</span>
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
                  <span className="text-danger">{errors.country?.message}</span>
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
                        <option value={contactState.id} key={contactState.id}>
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
    </>
  );
}
export async function getServerSideProps(ctx) {
  // access the user session

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
}
