import { Router, useRouter } from "next/router";
import PaymentInfo from "../payment/payment-info";
import PaymentVer from "../payment/verify-form";


import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(function Payment({schedules}) {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="d-flex m-2 row">
      <div className="col-md-6">
        <PaymentVer />
      </div>
      <div className="col-md-6">
        <PaymentInfo schedules={schedules}  />
      </div>
    </div>
  );
});

