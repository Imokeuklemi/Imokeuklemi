import React from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";

function Qualification() {
  const router = useRouter();
  const { pid } = router.query;
  const { register, control, getValues, handleSubmit } = useForm({
    defaultValues: {
      qualification: [
        {
          pid: pid,
          institute: "",
          yearGraduated: "",
          certificateObtained: "",
          specialty: "",
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "qualification",
  });

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    const edu = data.qualification;
    const sscegce = data.qualification.some(
      (x) => x.certificateObtained === "ssce/gce"
    );

    if (data.qualification.pid === undefined) {
      data.qualification.pid = parseFloat(pid);
    }

    data.qualification.forEach((element) => {
      element.pid = parseFloat(pid);
      element.yearGraduated = parseFloat(element.yearGraduated);
    });

    axios
      .post(`/api/personal_data/qualifications`, data.qualification)
      .then((response) => {
        if (response.data.error) {
          alert(JSON.stringify(response.data.error));
        }
        if (sscegce) {
          router.push(`/biodata/ssce?pid=${pid}`);
        } else {
          router.push(`/biodata/referee?pid=${pid}`);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="d-flex flex-row">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul>
          {fields.map((item, index) => {
            return (
              <div className="d-flex flex-row" key={item.id}>
                <div className="col-2">
                  <label>Certificate Obtained</label>
                  <input
                    type="hidden"
                    {...register(`qualification.${index}.pid`)}
                    defaultValue={pid}
                  />
                  <select
                    className="form-select"
                    {...register(`qualification.${index}.certificateObtained`, {
                      required: true,
                    })}
                  >
                    <option value="">Select</option>
                    <option value="ssce/gce">SSCE/GCE</option>
                    <option value="nce/nd">NCE/ND</option>
                    <option value="bsc/hnd">BSC/HND</option>
                    <option value="pgd/msc">PGD/MSC</option>
                    <option value="others">Others</option>
                  </select>
                </div>
                <div className="col-3">
                  <label>Year Graduated</label>
                  <input
                    type="number"
                    className="form-control"
                    {...register(`qualification.${index}.yearGraduated`, {
                      required: true,
                      max: 2019,
                      min: 1980,
                      maxLength: 4,
                    })}
                  />
                </div>
                <div className="col-3">
                  <label>Institution</label>
                  <input
                    className="form-control"
                    {...register(`qualification.${index}.institute`)}
                  />
                </div>
                <div className="col-3">
                  <label>Specialty</label>
                  <input
                    className="form-control"
                    {...register(`qualification.${index}.specialty`)}
                  />
                </div>

                <div className="col-1">
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </ul>
        <div className="row">
          <div className="col-2">
            <div className="d-grid">
              <button className="btn btn-primary col-lg-6" type="submit">
                Submit
              </button>
            </div>
          </div>
          <div className="col-2">
            <div className="d-grid">
              <button
                className="btn btn-info"
                type="button"
                onClick={() =>
                  append({
                    institute: "",
                    yearGraduated: "",
                    certificateObtained: "",
                    specialty: "",
                  })
                }
              >
                Add more Input
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Qualification;
