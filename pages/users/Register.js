import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";

export default function Register() {
  const initialValues = {
    username: "",
    password: "",
    email: "",
    surname: "",
    othername: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().min(6).required(),
    email: Yup.string().required(),
    surname: Yup.string().required(),
    othername: Yup.string().required(),
  });

  const signupHandler = (data) => {
    console.log(JSON.stringify(data, null, 2));
    axios
      .post("/api/user/signup", data)
      .then((response) => {
        if (response.data.error) {
          console.log(response.error);
        }
        //history.push("../userProfile/Dashboard.js");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="container" style={{ maxWidth: "500px" }}>
      <div className="card-header text-center">Sign-up</div>
      <div className="card-body align-content-center">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={signupHandler}>
          <Form>
            <div>
              <label className="form-label" htmlFor="username">
                Surname
              </label>
              <Field className="form-control" name="surname" type="text" />
              <ErrorMessage name="surname" />
            </div>
            <div>
              <label className="form-label" htmlFor="othername">
                Other Name
              </label>
              <Field className="form-control" name="othername" type="text" />
              <ErrorMessage name="othername" />
            </div>
            <div>
              <label className="form-label" htmlFor="email">
                Working Email
              </label>
              <Field className="form-control" name="email" type="email" />
              <ErrorMessage name="email" />
            </div>
            <div>
              <label className="form-label" htmlFor="username">
                Username
              </label>
              <Field className="form-control" name="username" type="text" />
              <ErrorMessage name="username" />
            </div>
            <div>
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <Field className="form-control" name="password" type="password" />
              <ErrorMessage name="password" />
            </div>
            <div>
              <label className="form-label" htmlFor="comfirmpassword">
                Comfirm Password
              </label>
              <Field
                className="form-control"
                name="comfirmpassword"
                type="password"
              />
              <ErrorMessage name="comfirmpassword" />
            </div>
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
