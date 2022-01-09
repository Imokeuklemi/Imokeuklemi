import React, { Fragment } from "react";
import { SessionProvider } from "next-auth/react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import Script from "next/script";
import Head from "next/head";
import TopHead from "../components/site-top";
import SiteFooter from "../components/site-footer";
//import "../styles/home.css";
import "../styles/Hub.css";
import { UserProvider } from "@auth0/nextjs-auth0";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const { user } = pageProps;
  const Layout = Component.Layout || EmptyLayout;
  return (
    <div className="container-fluid">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Fragment>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/js/bootstrap.bundle.min.js"></Script>

        <Script
          src="https://kit.fontawesome.com/a076d05399.js"
          crossOrigin="anonymous"
        ></Script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
          crossOrigin="anonymous"
        />
      </Fragment>
      <UserProvider user={user}>
        <TopHead />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <SiteFooter />
      </UserProvider>
    </div>
  );
}
const EmptyLayout = ({ children }) => <> {children}</>;
