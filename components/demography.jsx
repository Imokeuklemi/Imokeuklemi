import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function Demography(props) {
  return (
    <div>
      <Field
        as="select"
        className="form-select"
        name={props.name}
        onChange={props.changeHandler}
        value={props.selectValue}
      >
        <option>Select</option>
        {props.arrayList
          .filter(
            (filterByCountry) =>
              filterByCountry.country_id === contactCountrySelected
          )
          .map((state) => (
            <option value={state.id} key={state.id}>
              {country.name}
            </option>
          ))}
        {props.arrayList.map((country) => (
          <option value={country.id} key={country.id}>
            {country.name}
          </option>
        ))}
      </Field>
    </div>
  );
}
