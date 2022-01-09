import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Card from "./sitecard";

export default function Settings() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <div className="row">
      <div className="card col-md-8">
        <button type="button" className="btn btn-primary">
          Update Your Account <span className="badge bg-danger"></span>
        </button>
        <div className="card-header"></div>
        <div className="card-body" min-width="500px">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex-column d-flex">
              <div className="card-img d-flex align-items-lg-center">
                <Image
                  src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                  width="100"
                  height="100"
                />
                <label htmlFor="fileInput">
                  <i className="settingsPPIcon far fa-user-circle"></i>{" "}
                </label>
                <input
                  className="form-control mt-3"
                  id="fileInput"
                  type="file"
                />
              </div>
            </div>
            <label>Profile Picture</label>

            <input
              className="form-control  mt-3"
              type="text"
              placeholder="User Name"
              {...register("User Name", { required: true, maxLength: 50 })}
            />
            <input
              className="form-control  mt-3"
              type="text"
              placeholder="Email"
              {...register("Email", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
            />
            <input
              className="form-control  mt-3"
              type="password"
              placeholder="Password"
              {...register("Password", { required: true, maxLength: 15 })}
            />

            <button className="settingsSubmitButton" type="submit">
              Update
            </button>
          </form>
        </div>
        <div className="card-footer">Footer</div>
      </div>
      <div className="col-md-4">
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About Us</a>
            </Link>
          </li>
          <li>
            <Link href="/blog/hello-world">
              <a>Blog Post</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
