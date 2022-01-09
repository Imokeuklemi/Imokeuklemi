import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import SiteHeader from "./site-head";
import Mainbar from "./main-navbar";
import Middlebar from "./middle-bar";

const Top = (props) => {
  return (
    <div className="text-white text-center">
      <SiteHeader />      
      <Mainbar />
      <Middlebar/>
    </div>
  );
};

export default Top;
