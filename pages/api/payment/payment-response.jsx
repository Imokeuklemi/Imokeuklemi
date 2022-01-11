import {
  withApiAuthRequired,
  getAccessToken,
  getSession,
} from "@auth0/nextjs-auth0";
import { PrismaClient } from "@prisma/client";
import prisma from "../../../lib/prisma";

export default withApiAuthRequired(async function PaymentResponse(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  const { user } = getSession(req, res);

  const { transaction_id } = req.query;
  // URL with transaction ID of which will be used to confirm transaction status
  const url = `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`;

  // Network call to confirm transaction status
  const response = await fetch(url, {
    headers: {
      Authorization: process.env.FLUTTERWAVE_V3_SECRET_KEY,
    },
  });

  const verified = await response.json();
  const { status, tx_ref, currency, amount } = verified.data;
  const { name, phone_number, email, id } = verified.data.customer;

  const { purpose } = await prisma.schedules.findUnique({
    where: { id: Number(req.query.purpose) },
  });

  // check if customer exist in our database
  //const userExist = await prisma.users.findOne({ email: email });

  // // check if user have a wallet, else create wallet
  // const userHasWallet = await validateUserWallet(user._id);

  // // create wallet transaction
  // await createWalletTransaction(user._id, status, currency, amount);

  // create transaction
  await createTransaction(
    id,
    status,
    transaction_id,
    tx_ref,
    currency,
    amount,
    name,
    phone_number,
    email,
    purpose
  );

  // await updateWallet(user._id, amount);

  // return res.status(200).json({
  //   response: "wallet funded successfully",
  //   data: wallet,
  // });

  res.redirect("/biodata/create");
});

// // Validating User wallet
// const validateUserWallet = async (userId) => {
//     try {
//       // check if user have a wallet, else create wallet
//       const userWallet = await Wallet.findOne({ userId });

//       // If user wallet doesn't exist, create a new one
//       if (!userWallet) {
//         // create wallet
//         const wallet = await prisma.payment.create({
//           userId,
//         });
//         return wallet;
//       }
//       return userWallet;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Create Wallet Transaction
//   const createWalletTransaction = async (userId, status, currency, amount) => {
//     try {
//       // create wallet transaction
//       const walletTransaction = await WalletTransaction.create({
//         amount,
//         userId,
//         isInflow: true,
//         currency,
//         status,
//       });
//       return walletTransaction;
//     } catch (error) {
//       console.log(error);
//     }
//   };

// Create Transaction
const createTransaction = async (
  id,
  status,
  transaction_id,
  tx_ref,
  currency,
  amount,
  name,
  phone_number,
  email,
  purpose
) => {
  try {
    // create transaction
    const transaction = await prisma.payment.create({
      data: {
        id,
        transactionId: transaction_id.toString(),
        txref: tx_ref,
        payer: name,
        email,
        phoneNumber: phone_number,
        amount,
        currency,
        paymentStatus: status,
        purpose,
      },
    });
    return transaction;
  } catch (error) {
    console.log(error);
  }
};

//   // Update wallet
//   const updateWallet = async (userId, amount) => {
//     try {
//       // update wallet
//       const wallet = await Wallet.findOneAndUpdate(
//         { userId },
//         { $inc: { balance: amount } },
//         { new: true }
//       );
//       return wallet;
//     } catch (error) {
//       console.log(error);
//     }
//   };
