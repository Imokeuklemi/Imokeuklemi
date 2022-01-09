import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";

function Sidebar(props) {
  const { user, error, isLoading } = useUser();

  return (
    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
        <Link href="/profile" target="_blank" passHref>
          <a className="d-flex align-items-center ">
            <i className="fs-1 bi-house"></i>
            <span className="fs-5 ms-2">Home</span>
          </a>
        </Link>
        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
        >
          <li>
            <a
              href="#submenu1"
              data-bs-toggle="collapse"
              className="nav-link px-0 align-middle"
            >
              <i className="fs-1 bi-speedometer2"></i>
              <span className="ms-1 d-none d-sm-inline">Dashboard</span>
            </a>
            <ul
              className="collapse show nav flex-column ms-1"
              id="submenu1"
              data-bs-parent="#menu"
            >
              <li className="w-100">
                <Link href="/activity/ewallet" passHref>
                  <a className="nav-link">
                    <i className="fs-5 bi-wallet-fill"></i>
                    <span className="d-none ps-2 d-sm-inline">E-Wallet</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/activity/course" passHref>
                  <div>
                    <a href="#" className="nav-link">
                      <i className="fs-5 bi-journals"></i>
                      <span className="d-none  ps-2 d-sm-inline">Coures</span>
                    </a>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/activity/course/assignment" passHref>
                  <div>
                    <a href="#" className="nav-link">
                      <i className="fs-5 bi-pencil-square"></i>
                      <span className="d-none ps-2 d-sm-inline">
                        Assignment
                      </span>
                    </a>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/activity/course/exams" passHref>
                  <div>
                    <a href="#" className="nav-link">
                      <i className="fs-5 bi-pen-fill"></i>
                      <span className="d-none ps-2 d-sm-inline">Exams</span>
                    </a>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/activity/course/result" passHref>
                  <div>
                    <a href="#" className="nav-link">
                      <i className="fs-5 bi-folder2-open"></i>
                      <span className="d-none ps-2 d-sm-inline">
                        View Result
                      </span>
                    </a>
                  </div>
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <a
              href="#submenu2"
              data-bs-toggle="collapse"
              className="nav-link px-0 align-middle "
            >
              <i className="fs-1 bi-calendar-plus"></i>
              <span className="ps-2 d-none d-sm-inline">Events</span>
            </a>
            <ul
              className="collapse nav flex-column ms-1"
              id="submenu2"
              data-bs-parent="#menu"
            >
              <li className="w-100">
                <Link href="/events/dat" passHref>
                  <a className="nav-link">
                    <i className=" fs-5 bi-alarm"></i>
                    <span className="ps-2 d-none d-sm-inline">Dates</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/events/announcement" passHref>
                  <a className="nav-link">
                    <i className="fs-5 bi-info-square-fill"></i>
                    <span className="d-none ps-2 d-sm-inline">
                      Announcement
                    </span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/events/sug" passHref>
                  <a className="nav-link">
                    <i className="fs-4 bi-people"></i>
                    <span className="d-none ps-2 d-sm-inline">SUG</span>
                  </a>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="#submenu3"
              data-bs-toggle="collapse"
              className="nav-link px-0 align-middle"
            >
              <i className="fs-1 bi-grid"></i>
              <span className="ms-1 d-none d-sm-inline">Projects</span>
            </a>
            <ul
              className="collapse nav flex-column ms-1"
              id="submenu3"
              data-bs-parent="#menu"
            >
              <li className="w-100">
                <Link href="/projects" passHref>
                  <a className="nav-link px-0">
                    <span className="d-none d-sm-inline">Product</span> 1
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/projects" passHref>
                  <a href="#" className="nav-link px-0">
                    <span className="d-none d-sm-inline">Product</span> 2
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/projects" passHref>
                  <div>
                    <a href="#" className="nav-link px-0">
                      <span className="d-none d-sm-inline">Product</span> 3
                    </a>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/projects" passHref>
                  <div>
                    <a href="#" className="nav-link px-0">
                      <span className="d-none d-sm-inline">Product</span> 4
                    </a>
                  </div>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="/projects" passHref>
              <div>
                <a href="#" className="nav-link px-0 align-middle">
                  <i className="fs-1 bi-people"></i>
                  <span className="ms-1 d-none d-sm-inline">Socials</span>
                </a>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/lectures" passHref>
              <div>
                <a href="#" className="nav-link px-0 align-middle">
                  <i className="fs-1 bi-people"></i>
                  <span className="ms-1 d-none d-sm-inline">Lectures</span>
                </a>
              </div>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="dropdown pb-4">
          <a
            href="#"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <Image
              src="/images/mdo.png"
              alt=""
              width="30"
              height="30"
              className="rounded-circle"
            />

            {user && (
              <>
                <span className="d-none d-sm-inline mx-1">{user.name}</span>
              </>
            )}
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <li>
              <a className="dropdown-item" href="#">
                New project...
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
