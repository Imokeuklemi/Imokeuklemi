import React from "react";

export default function card(props) {
  return (
    <div className="card">
      <button type="button" className="btn btn-primary">
        Messages <span className="badge bg-danger">{props.badge}</span>
      </button>
      <div className="card-header">{props.cardhead}</div>
      <div className="card-body">
        <h2>{props.title}</h2>
        <p>{props.body}</p>
      </div>
      <div className="card-footer">{props.footer}</div>
    </div>
  );
}
