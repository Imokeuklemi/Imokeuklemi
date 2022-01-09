import Link from "next/link";
import React from "react";

export default function about() {
  return (
    <div>
       <div className="row">
        <div className="col-md-3">
          <h5>
            &#x20; KM 3 Calabar-Unicem Factory Road, <br />
            Cross River State
          </h5>
        </div>
        <div className="col-md-5 flex-lg-row flex-fill">
          <div className="row d-flex ">
            <div className="col-md-6">
              <Link href="/" passHref>
                <div>
                  <h6>
                    <i className="fas fa-wrench pe-2"></i>
                    <b>Basic Studies</b>
                  </h6>
                </div>
              </Link>
              <Link href="/" passHref>
                <div>
                  <h6 className="m-2">
                    <i className="fas fa-cog pe-2"></i>
                    <b>National Diploma (ND)</b>
                  </h6>
                </div>
              </Link>
            </div>
            <div className="col-md-6">
              <Link href="/" passHref>
                <div>
                  <h6 className="m-2">
                    <i className="fas fa-users-cog pe-2"></i>
                    <b>Higher National Diploma (HND)</b>
                  </h6>
                </div>
              </Link>
              <Link href="/" passHref>
                <div>
                  <h6 className="m-2">
                    <i className="fas fa-cogs pe-2"></i> <b>Degree </b>
                  </h6>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 d-flex flex-lg-row">
          <div className="col-md-4 m-2">
            <h5>You Can reach us:</h5>
            <hr />
          </div>
          <div className="col-md-8">
            <div className="row d-flex flex-fill flex-md-row">
              <div className="col-md-6 d-flex flex-md-column">
                <span className="mb-2 mt-0">
                  <i className="fas fa-phone pe-2"></i>
                  09055588668
                </span>
                <span className="ms-2">
                  <i className="fas fa-phone pe-2"></i>08097447754
                </span>
              </div>
              <div className="col-md-6 d-flex flex-md-olumn">
                <span className="ms-2 flex-fill">
                  <i className="fab fa-facebook-square pe-2"></i>
                  mctcalabar
                </span>
                <span className="ms-2 flex-fill">
                  <i className="fab fa-instagram-square pe-2"></i>
                  mct_calabar
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
