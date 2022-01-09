import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link";

// export async function getServerSideProps(context) {
//   const { session } = getSession(context);

//   console.log(context);

//   return {
//     props: {
//       studentList: JSON.parse(JSON.stringify(studentList)),
//     },
//   };
// }

export default function Student() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    axios.get(`/api/personal_data?pid=${data.regNumber}`).then((res) => {
      if (res.data.error) {
        alert(
          "there is a problem completing you transaction. check and try again"
        );
        return false;
      }
      if (res.data.message) {
        alert("the registration number is invalid, check and try again");
        return false;
      }
      router.push(`/profile?id=${res.data.id}&pid=${res.data.pid}`);
    });
  };

  return (
    <div className="container w-50">
      <div className="card">
        <button type="button" className="btn btn-primary">
          Completed Payment<span className="badge bg-danger"></span>
        </button>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="form-label">Enter your payment Id</label>
            <input
              className="form-control"
              type="text"
              placeholder="regNumber"
              {...register("regNumber", { required: true })}
            />

            <div className="input-group mt-2">
              <button type="submit" className="btn btn-success btn-lg">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="card-footer">
          <Link href="/api/auth/login">
            <>
              Not sign in <a>click here</a>
            </>
          </Link>
        </div>
      </div>
    </div>
  );
}
