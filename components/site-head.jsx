import React from "react";

export default function SiteHeader(){
  return (
    <div className="d-flex row">
      <div className="px-2 bg-info flex-fill col-lg-6 col-sm-12">
        <h2>EDU-HUB AFRICA</h2>
        <spa className="p-3">Mainland</spa>
      </div>
      <div className="p-2 bg-warning flex-fill d-flex col-sm-12 col-lg-6">
        <div className="flex-fill justify-content-center align-content-center">
          <i
            className="topIcon fab fa-facebook-square me-3"
            style={{ fontSize: "30px" }}
          ></i>
          <i
            className="topIcon fab fa-instagram-square me-3"
            style={{ fontSize: "30px" }}
          ></i>
          <i
            className="topIcon fab fa-pinterest-square me-3"
            style={{ fontSize: "30px" }}
          ></i>
          <i
            className="topIcon fab fa-twitter-square"
            style={{ fontSize: "30px" }}
          ></i>
        </div>

        <form>
          <div className="d-flex flex-row">
            <input
              type="search"
              placeholder="Search"
              className="me-2 form-control"
              aria-label="Search"
            />
            <button variant="outline-success">Search</button>
          </div>
        </form>
      </div>
    </div>
  );
};

