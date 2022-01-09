import { handleAuth } from "@auth0/nextjs-auth0";
export default handleAuth();
// import { handleAuth, handleCallback } from "@auth0/nextjs-auth0";
// import { UserProvider } from "@auth0/nextjs-auth0";
// //export default handleAuth();
// import { createUser } from "../../../utils/db";
// import { PrismaClient } from "@prisma/client";

// const afterCallback = async (req, res, session, state) => {
//   const prisma = new PrismaClient({
//     log: [
//       {
//         emit: "event",
//         level: "query",
//       },
//     ],
//   });

//     const getUser = await prisma.users.findUnique({
//       where: {
//         email: session.user.email,
//       },
//     });
//    try {
//      if (getUser === null) {
//        const dbUser = await createUser(session.user);
//        return { session,  localStorage.setItem("user_id", dbUser.id) };
//      } else {
//        return { session, getUser.id };
//      }
//    } catch (err) {
//      console.log(err);
//    }

// };

// export default handleAuth({
//   async callback(req, res) {
//     try {
//       await handleCallback(req, res, { afterCallback });
//       console.log(session);
//     } catch (error) {
//       res.status(error.status || 500).end(error.message);
//     }
//   },
// });
