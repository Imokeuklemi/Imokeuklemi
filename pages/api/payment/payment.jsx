import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { PrismaClient } from "@prisma/client";
import {
  useFlutterwave,
  FlutterWaveButton,
  closePaymentModal,
} from "flutterwave-react-v3";

export default async function Handler(req, res) {
  const { user } = getSession(req, res);
  const flw = useFlutterwave();

  const prisma = new PrismaClient();
  if (req.method === "POST") {
    try {
      const paymentCallback = await prisma.payment
        .create({
          data: {
            status: req.body.status,
            transaction_id: req.body.transaction_id,
            tx_ref: req.body.tx_ref,
            currency: req.body.currency,
            amount: req.body.amount,
            name: req.body.customer.name,
            email: req.body.customer.email,
            phone_number: req.body.customer.phone_number,
          },
        })
        .then((response) => {
          res.send(response);
        });
    } catch (error) {
      res
        .status(500)
        .send({ error: "problem verifying your transaction, try again later" });
    }
  } else if (req.method === "GET") {
    try {
      const payload = { id: req.query.id }; //This is the transaction unique identifier. It is returned in the initiate transaction call as data.id
      const response = await flw.Transaction.verify(payload);
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  }
}
