import React from "react";
import Link from "next/link";

export default function Middlebar() {
  function sayHello() {
    alert("You clicked me!");
  }
  // Usage

  return (
    <div className="row d-flex m-2">
      <div className="col-sm-4">
        <span>
          <Link href="/payment/" passRef>
            <a className="btn btn-warning">Click here to register</a>
          </Link>
        </span>
      </div>
      <div className="col-sm-4">
        <button onClick={()=>(alert("Login with your cridentials"))}>Check admission status</button>;
      </div>
      <div className="col-sm-4">
        <Link href="/biodata/" className="btn btn-info">
          <a className="btn btn-primary"> Admitted Student</a>
        </Link>
      </div>
    </div>
  );
}
