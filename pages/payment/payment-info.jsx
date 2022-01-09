import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios from "axios";


export default function PaymentForm() {
  const router = useRouter();

  const [enteredData, setEnteredData] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    programme: "",
    purpose: "",
    amount: "",
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmithandler = (data) => {
    // data.purpose ==="Admission Form" && data.amount ===20000
    setEnteredData(data);
    localStorage.setItem("data", JSON.stringify(data));
    router.push({
      pathname: "/payment/payment-form",
      query: data,
    });
  };
  return (
    <>
      <div className="card">
        <button type="button" className="btn btn-primary">
          Payment online<span className="badge bg-danger"></span>
        </button>
        <div className="card-header">
          Fast and Easy Payment
          <form onSubmit={handleSubmit(onSubmithandler)}>
            <label className="form-label">Name in Full</label>
            <input
              className="form-control"
              type="text"
              placeholder="Full Name"
              {...register("fullname", { required: true, maxLength: 100 })}
            />
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
            <label className="form-label">Purpose for Payment</label>
            <select
              className="form-select"
              {...register("purpose", { required: true })}
            >
              <option value="">Choose...</option>
              <option value="Admission Form">Admission Form</option>
              <option value="School Fee">School Fee</option>
              <option value="School Fee">Acceptance Form</option>
              <option value="School Fee">Others</option>
            </select>
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
            <label className="form-label">Amount</label>
            <input
              className="form-control"
              type="number"
              placeholder="amount"
              {...register("amount", { min: 200 })}
            />

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
