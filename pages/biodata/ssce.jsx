import React from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import { v4 as uuid } from "uuid";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { PrismaClient } from "@prisma/client";
function Secondary(props) {
  // const { data: session, status } = useSession();

  console.log(props);
  const router = useRouter();
  const { pid } = router.query;

  const [show, setShow] = React.useState(true);
  const { register, control, getValues, handleSubmit } = useForm({
    defaultValues: {
      ssce: [
        {
          id: Math.floor(Math.random() * 10) + 1,
          subject: "",
          grade: "",
          examType: "",
          pid: pid,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ssce",
  });

  const onSubmit = (data) => {
    const wasc = data.ssce;
    console.log(wasc);
    console.log(data);
    if (data.ssce.pid === undefined) {
      data.ssce.pid = parseFloat(pid);
    }

    data.ssce.forEach((element) => {
      element.pid = parseFloat(pid);
    });

    axios
      .post(`/api/personal_data/ssce?${pid}`, wasc)
      .then((response) => {
        if (!response.data.error) {
          router.push(`/biodata/referee?pid=${pid}`);
        }
      })
      .catch(function (error) {
        return error;
      });
  };

  // if (status === "authenticated") {
  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul>
          {fields.map((item, index) => {
            return (
              <div className="row" key={item.id}>
                <input type="hidden" className="form-control" name="pid" value={pid}/>
                <label>Subject</label>
                <select
                  className="form-select"
                  {...register(`ssce.${index}.subject`, {
                    required: true,
                  })}>
                  <option selected value="">
                    Select Subject
                  </option>
                  <option>COMMERCE</option>
                  <option>FINANCIAL ACCOUNTING</option>
                  <option>CRK</option>
                  <option>ECONOMICS</option>
                  <option>GEOGRAPHY</option>
                  <option>GOVERNMENT</option>
                  <option>HISTORY</option>
                  <option>ISLAMIC STUDIES</option>
                  <option>LITERATURE IN ENGLISH</option>
                  <option>CIVIC EDUCATION</option>
                  <option>ARABIC</option>
                  <option>ENGLISH LANGUAGE</option>
                  <option>FRENCH</option>
                  <option>HAUSA</option>
                  <option>IGBO</option>
                  <option>YORUBA</option>
                  <option>FURTHER MATHEMATICS</option>
                  <option>GENERAL MATHEMATICS</option>
                  <option>AGRICULTURAL SCIENCE</option>
                  <option>BIOLOGY</option>
                  <option>CHEMISTRY</option>
                  <option>PHYSICAL EDUCATION</option>
                  <option>PHYSICS</option>
                  <option>HEALTH EDUCATION</option>
                  <option>AUTO MECHANICS</option>
                  <option>BUILDING CONSTRUCTION</option>
                  <option>METAL WORK</option>
                  <option>TECHNICAL DRAWING</option>
                  <option>WOODWORK</option>
                  <option>BASIC ELECTRICITY</option>
                  <option>BASIC ELECTRONICS</option>
                  <option>CLOTHING AND TEXTILES</option>
                  <option>FOODS AND NUTRITION</option>
                  <option>HOME MANAGEMENT</option>
                  <option>MUSIC</option>
                  <option>VISUAL ART</option>
                </select>
                <label>Grade</label>
                <select
                  type="text"
                  className="form-control col-3"
                  {...register(`ssce.${index}.grade`)}>
                  <option value="">select</option>
                  <option value="a1">A1</option>
                  <option value="b2">B2</option>
                  <option value="b3">B3</option>
                  <option value="c4">C4</option>
                  <option value="c5">C5</option>
                  <option value="c6">C6</option>
                  <option value="d7">D7</option>
                  <option value="e8">E8</option>
                  <option value="f9">F9</option>
                </select>
                <label>Institution</label>
                <select
                  as="select"
                  className="form-control col-3"
                  {...register(`ssce.${index}.examType`)}>
                  <option value="">Select</option>
                  <option value="wase">WASE</option>
                  <option value="neco">NECO</option>
                  <option value="gcew">GCE/WASE</option>
                  <option value="gcen">HCE/NECO</option>
                  <option value="others">Others</option>
                </select>

                <button type="button" onClick={() => remove(index)}>
                  Delete
                </button>
              </div>
            );
          })}
        </ul>

        <section>
          <button
            type="button"
            onClick={() =>
              append({
                subject: "",
                grade: "",
                examType: "",
                pid: pid,
              })
            }>
            Add more Input
          </button>
        </section>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
  //   } else {
  //     return (
  //       <>
  //         <Link className="btn btn-primary m-3" href="/api/auth/signin">
  //           Sign in
  //         </Link>
  //         ;
  //       </>
  //     );
  //   }
}

export async function getServerSideProps({ query }) {
  const prisma = new PrismaClient();
  const { pid } = query;
  const ssceCert = await prisma.qualification.findMany({
    where: {
      pid: parseFloat(pid),
    },
  });

  for (const iterator of ssceCert) {
    if (iterator.certificateObtained == "ssce/gce") {
      const qid = iterator.id;
      return {
        props: {
          qid,
          pid,
        },
      };
    }
  }
}

export default Secondary;
