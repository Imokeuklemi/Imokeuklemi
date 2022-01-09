import React from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

export default function Mainbar(props) {
  const { user, error, isLoading } = useUser();

  return (
    <div className="d-flex row">
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            <a> Home</a>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav me-auto">
              <li className="nav-item px-2 py-2">
                <Link className="nav-link" href="/about">
                  <a>About</a>
                </Link>
              </li>
              <li className="nav-item  px-2 py-2">
                <Link className="nav-link" href="/contact">
                  <a>Contact</a>
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Programmes
                </a>
                <ul className="dropdown-menu">
                  <li className="dropdown-item">
                    <Link href="/nd" className="nav-link" passRef>
                      <a>Pre-ND/ND</a>
                    </Link>
                  </li>
                  <li className="dropdown-item">
                    <Link href="/prend" className="nav-link" passRef>
                      <a>Pre-ND/ND</a>
                    </Link>
                  </li>
                  <li className="dropdown-item">
                    <Link href="/hnd" className="nav-link" passRef>
                      <a>HND</a>
                    </Link>
                  </li>
                  <li className="dropdown-item">
                    <Link href="/degree" className="nav-link" passRef>
                      <a>Degree</a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li className="dropdown-item">
                    <Link
                      href="/biodata/Acceptance"
                      className="nav-link"
                      passRef
                    >
                      <a> Acceptance Form</a>
                    </Link>
                  </li>
                  <li className="dropdown-item">
                    <Link href="/biodata/project" className="nav-link" passRef>
                      <a> Project Suppervision</a>
                    </Link>
                  </li>

                  <li className="dropdown-item">
                    <Link className="nav-link" href="/biodata/defence">
                      <a> Project Defence</a>
                    </Link>
                  </li>
                  <li className="dropdown-item">
                    <Link className="nav-link" href="/biodata/register" passRef>
                      <a> Registration Form</a>
                    </Link>
                  </li>
                  <li className="dropdown-item">
                    <Link className="nav-link" href="/biodata/defence">
                      <a> Tuition/Semester</a>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="navbar-nav d-flex justify-content-end">
              {user ? (
                <>
                  <li className="nav-item  px-2 py-2">
                    <Link href="/api/auth/logout" className="nav-link">
                      <a> Log Out</a>
                    </Link>
                  </li>
                  <li className="nav-item  px-2 py-2">
                    <Link href="/profile" className="nav-link">
                      <a>Dashboard</a>
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link href="/api/auth/login">
                    <a className="nav-link pe-2"> Login</a>
                  </Link>
                  <Link href="/auth/signup" className="nav-link">
                    <a className="nav-link pe-2"> Sign-up</a>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
