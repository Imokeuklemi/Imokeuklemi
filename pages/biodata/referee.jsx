import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

export default function Referee() {
  // const { data: session, status } = useSession();
  const router = useRouter();
  const { pid } = router.query;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.pid = parseFloat(pid);
    console.log(data);
    axios
      .post("http://localhost:3000/api/personal_data/referee", data)
      .then((respose) => {
        router.push(`/biodata/printout?pid=${data.pid}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="card m-auto d-flex w-75 justify-content-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card-header">Enter Referee Details</div>
        <div className="card-body">
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <input
            className="form-control mt-0"
            type="text"
            placeholder="Full Name"
            {...register("fullName", { required: true, maxLength: 80 })}
          />
        </div>
        <div className="card-body">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="Email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
        </div>
        <div className="card-body">
          <label htmlFor="phone" className="form-label">
            Mobile Number
          </label>
          <input
            className="form-control"
            type="tel"
            placeholder="mobile phone number"
            {...register("phone", {
              required: true,
            })}
          />
        </div>
        <div className="card-body">
          <label htmlFor="org" className="form-label">
            Work place/Organozation
          </label>

          <input
            className="form-control"
            type="text"
            placeholder="Work Place/Organization"
            {...register("org", { required: true })}
          />
        </div>
        <div className="card-body">
          <label htmlFor="relationship" className="form-label">
            Relationship
          </label>

          <select
            className="form-select"
            {...register("relationship", { required: true })}
          >
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
            <option value="Brother">Brother</option>
            <option value="Sister">Sister</option>
            <option value="Uncle">Uncle</option>
            <option value="Aunt">Aunt</option>
            <option value="Cousine">Cousine</option>
            <option value="Nephew">Nephew</option>
            <option value="Niece">Niece</option>
          </select>
        </div>
        <input value={pid} hidden {...register("pid", {})} />

        <div className="card-footer d-grid">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
