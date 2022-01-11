import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0";
import jsPDF from "jspdf";

export default function PaymentForm() {
  const router = useRouter();
  const user = useUser();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const watchShowAge = watch("showAge", false);
  const [amount, setAmount] = useState(0);
  const [programme, setProgramme] = useState();
  const paidFor = register("showAge", { required: true });

  return (
    <>
      <div className="card">
        <button type="button" className="btn btn-primary">
          Payment online<span className="badge bg-danger"></span>
        </button>
        <div className="card-header">
          Fast and Easy Payment
          <form
            onSubmit={handleSubmit((data) =>
              router.push({ pathname: "/payment/payment-form", query: data })
            )}
          >
            <div>
              <label className="form-label">Name in Full</label>
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
                  minLength: 6,
                  maxLength: 12,
                })}
              />
            </div>
            <div>
              <label className="form-label">Purpose for Payment</label>
              <select
                onChange={(e) => {
                  setProgramme(e.target.value);
                  setAmount(e.target.key);

                  paidFor.onChange(e);
                }}
                ref={paidFor.ref}
                name={paidFor.name}
                className="form-select"
                // {...register("purpose", { required: true })}
              >
                <option value="">Choose...</option>
                {schedules.map((schedule) => (
                  <option key={schedule.id} value={schedule.purpose}>
                    {schedule.purpose}
                  </option>
                ))}
              </select>
            </div>
            <div>
              {programme === "Admission Form" && (
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
                </>
              )}
            </div>
            <div>
              {watchpaidFor && (
                <>
                  {schedules
                    .filter((schedule) => schedule.id === amount)
                    .map((schedul) => (
                      <>
                        <label className="form-label">Amount</label>
                        <input
                          className="form-control"
                          type="number"
                          value={schedul.amount}
                          disabled
                          {...register("amount", {})}
                        />
                      </>
                    ))}
                </>
              )}
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

export async function getServerSideProps() {
  const schedules = await prisma.schedules.findAll();
  return {
    props: {
      schedules: JSON.parse(JSON.stringify(schedules)),
    },
  };
}
