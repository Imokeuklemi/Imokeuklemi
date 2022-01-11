import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0";

export default function DetailsForm({ schedules }) {
  const router = useRouter();
  const user = useUser();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const watchpaidFor = watch("purpose", false);
  const [dSchedule, setDSchedule] = useState({});
  const [programme, setProgramme] = useState();
  const paidFor = register("purpose", { required: true });

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      // if (programme != "undefined" || programme != "") {
      axios.get(`/api/schedules?sid=${programme}`).then((res) => {
        setDSchedule(res.data);
      });
    } else {
      isMounted.current = true;
    }
  }, [programme]);

  // An effect to fetch the data
  // Do something else with the data
  // useEffect(() => {
  //   if (isMounted.current) {
  //     doSomething(data);
  //   } else {
  //     isMounted.current = true;
  //   }
  // }, [data]);

  console.log("Programme" + programme);
  console.log(dSchedule);

  return (
    <>
      <div className="card">
        <button
          type="button"
          className="btn btn-primary justify-content-center align-content-center"
        >
          Fast, Easy and secure<span className="badge bg-danger"></span>
        </button>
        <div className="card-header">
          <form
            onSubmit={handleSubmit((data) =>
              router.push({ pathname: "/payment/payment-form", query: data })
            )}
          >
            <div>
              <label className="form-label">Name in Card</label>
              <input
                className="form-control"
                type="text"
                placeholder="Full Name"
                {...register("fullname", { required: true, maxLength: 100 })}
              />
            </div>
            <div>
              <label className="form-label">Email </label>
              <input
                className="form-control"
                type="text"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
            </div>
            <div>
              <label className="form-label">Mobile Number</label>
              <input
                className="form-control"
                type="tel"
                placeholder="Mobile number"
                {...register("phonenumber", {
                  required: true,
                  minLength: 11,
                  maxLength: 15,
                })}
              />
            </div>
            <div>
              <label className="form-label">Purpose for Payment</label>
              <select
                onChange={(e) => {
                  setProgramme(e.target.value);
                  paidFor.onChange(e);
                }}
                ref={paidFor.ref}
                name={paidFor.name}
                className="form-select"
              >
                <option value="">Choose...</option>
                {schedules.map((schedule) => (
                  <option key={schedule.id} value={schedule.id}>
                    {schedule.purpose}
                  </option>
                ))}
              </select>
            </div>
            <div>
              {dSchedule.purpose === "Admission Form" && (
                <>
                  <label className="form-label">Programme Paying For</label>
                  <select
                    className="form-select"
                    {...register("Programme", { required: true })}
                  >
                    <option value="">Choose...</option>
                    <option value="ND">ND</option>
                    <option value="HND">HND</option>
                    <option value="Degree">Degree</option>
                    <option value="PG">PG</option>
                  </select>

                  <>
                    <label className="form-label">Amount</label>
                    <input
                      className="form-control"
                      type="number"
                      {...register("amount", {})}
                    />
                  </>
                </>
              )}
            </div>
            <div>
              {watchpaidFor &&
                (dSchedule.purpose === "Admission Form" ? null : (
                  <>
                    <label className="form-label">Amount</label>
                    <input
                      className="form-control"
                      type="number"
                      value={dSchedule.amount}
                      {...register("amount", {})}
                    />
                  </>
                ))}
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="card-body">
          <p>pay through out online secured platform</p>
          {/* <FlutterWaveButton
              className="btn btn-success btn-lg"
              {...fwConfig}
            /> */}
        </div>
        <div className="card-footer">
          <h6>
            <a href="/support">Request support</a>
          </h6>
        </div>
      </div>
    </>
  );
}
