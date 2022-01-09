import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import prisma from "../../lib/prisma";
import SiteCard from "./sitecard";
import StudentLayout from "../../components/studentLayout";
import Image from "next/image";

export default async function Profile() {
  return (
    <>
      <div className="col py-3">
        <div>
          Hello{" "}
          {userDetail &&
            userDetail.surname +
              " " +
              userDetail.firstname +
              " " +
              userDetail.middleName}
        </div>
        <Image
          src="/public/images/003.jpg"
          alt="picture"
          width="50"
          height="50"
          className="rounded-circle"
        />
        <main>
          <h1>Content</h1>
          <div className="row mb-3">
            <div className="col-4 bg-primary">
              <SiteCard
                head="Header"
                body="Lectures"
                title="Profile"
                footer="Footer"
              ></SiteCard>
            </div>
            <div className="col-4 bg-light">
              <SiteCard
                head="Header"
                body="Lectures"
                title="Profile"
                footer="Footer"
              ></SiteCard>
            </div>
            <div className="col-4 bg-danger">
              <SiteCard
                head="Header"
                body="Lectures"
                title="Profile"
                footer="Footer"
              ></SiteCard>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-4 bg-primary">
              <SiteCard
                head="Header"
                body="Lectures"
                title="Profile"
                footer="Footer"
              ></SiteCard>
            </div>
            <div className="col-4 bg-light">
              <SiteCard
                head="Header"
                body="Lectures"
                title="Profile"
                footer="Footer"
              ></SiteCard>
            </div>
            <div className="col-4 bg-danger">
              <SiteCard
                head="Header"
                body="Lectures"
                title="Profile"
                footer="Footer"
              ></SiteCard>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

Profile.Layout = StudentLayout;

export async function getServerSideProps(ctx) {
  // access the user session
  const session = getSession(ctx.req, ctx.res);

  console.log(session);
  console.log(ctx.req.body);
  try {
    const userDetail = await prisma.personalinfo.findUnique({
      where: { id: req.query.id },
    });
    return { props: { userDetail: JSON.parse(JSON.stringify(userDetail)) } };
  } catch (error) {
    console.log(error);
    return { props: { userDetail: null } };
  }
}
