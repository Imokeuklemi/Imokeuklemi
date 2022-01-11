import React, { useEffect } from "react";
import { useFlutterwave } from "flutterwave-react-v3";
import { useRouter } from "next/router";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(function PaymentForm() {
  const router = useRouter();
  const data = router.query;

  const handleFlutterPayment = useFlutterwave({
    public_key: "FLWPUBK_TEST-c7b632ad2ee96432a8b7b2c6161687bc-X",
    tx_ref: Math.random() * 1000000000,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    amount: Number(router.query.amount),
    // specified redirect URL
    redirect_url: `http://localhost:3000/api/payment/payment-response?purpose=${router.query.purpose}`,
    customer: {
      email: router.query.email,
      phonenumber: router.query.phonenumber,
      name: router.query.fullname,
    },
    customizations: {
      title: "EDUHUB Africa",
      description: `Payment for ${router.query.purpose}`,
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  });

  if (router.query !== null) {
    return (
      <div className="App">
        <h1>Proceed to Payment</h1>
        <button
          onClick={() => {
            handleFlutterPayment({
              callback: (response) => {
                console.log(response);
              },
              onClose: () => {},
            });
          }}
        >
          Click to Proceed
        </button>
      </div>
    );
  }
});
