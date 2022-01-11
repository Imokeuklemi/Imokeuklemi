import React from "react";
import Axios from "axios";
import { useForm } from "react-hook-form";

//import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";

export default function Verifier() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    Axios.get(`/api/payment/payment-response?transaction_id=${data.transaction_id}`).then((response) => {
      if (response.data.error) {
        console.log(response.data);
      }
      router.push(`/biodata/${response.data.id}`);
    });
  };

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>{error.message}</div>;
  return (
    <>
      <div className="card">
        <button type="button" className="btn btn-primary">
          Completed Payment<span className="badge bg-danger"></span>
        </button>
        <div className="card-header">Submit you Payment Id</div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="form-control"
              {...register("transaction_id", { required: true })}
            />
            <div className="input-group mt-2">
              <button type="submit" className="btn btn-success btn-lg">
                Verify Payment
              </button>
            </div>
          </form>
        </div>
        <div className="card-footer">
          <Link href="/api/auth/login">
            <>
              Not sign in <a>click here</a>
            </>
          </Link>
        </div>
      </div>
    </>
  );
}
