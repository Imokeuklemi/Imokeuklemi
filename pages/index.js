import Image from "next/image";

import { useSession, signIn, signOut } from "next-auth/react";
import { useUser } from "@auth0/nextjs-auth0";

export default function Home() {
  const { user, error, isLoading } = useUser();

  return (
    <>
      <h1 className="visually-hidden">Features examples</h1>
      <div className="container px-4 py-2" id="featured-3">
        <h2 className="pb-2 border-bottom">
          {" "}
          <i className="bi bi-Home"></i>EDU-HUB Africa:{" "}
          <span>Learning at your space and affordibly</span>
        </h2>
        <div className="row g-4 py-2 row-cols-1 row-cols-lg-3">
          <div className="feature col">
            <div className="feature-icon bg-primary bg-gradient">
              <svg className="bi" width="1em" height="1em">
                <use xlinkHref="#collection" />
              </svg>
            </div>
            <div className="ratio ratio-16x9">
              <iframe src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>
            </div>

            <h2>Innovative Center</h2>

            <p>
              To Offer and connect you the World Best academic Programmine that
              provide you comprehensive technical know-how to to compete and
              excel in your choosen career.
            </p>
            <a href="#" className="icon-link btn btn-primary bg-warning">
              Call to action
              <svg className="bi" width="1em" height="1em">
                <use xlinkHref="#chevron-right" />
              </svg>
            </a>
          </div>
          <div className="feature col">
            <div className="feature-icon bg-primary bg-gradient">
              <svg className="bi" width="1em" height="1em">
                <use xlinkHref="#people-circle" />
              </svg>
            </div>
            <div className="ratio ratio-16x9">
              <iframe src="  https://www.youtube.com/embed/PKATJiyz0iI"></iframe>
            </div>
            <h2>Speaking the Language of the World</h2>
            <p>
              Programmes that combines the power of verious professions that
              would reposition you for the dynamic World of Technology and data
              science Learn More
            </p>
            <a href="#" className="icon-link btn btn-primary bg-warning">
              Call to action
              <svg className="bi" width="1em" height="1em">
                <use xlinkHref="#chevron-right" />
              </svg>
            </a>
          </div>
          <div className="feature col">
            <div className="feature-icon bg-primary bg-gradient">
              <svg className="bi" width="1em" height="1em">
                <use xlinkHref="#toggles2" />
              </svg>
            </div>
            <div className="ratio ratio-16x9">
              <iframe src="  https://www.youtube.com/embed/j6EB9HO6acE"></iframe>
            </div>

            <h2>AI and Expert system</h2>

            <p>
              Innovative ecploration of IT in the transformation of the
              worldIndustries and increate technical and innovative capabilities
              through the world knoledge and application of Artificial
              technology and Experts system
            </p>
            <a href="#" className="icon-link btn btn-primary bg-warning">
              Call to action
              <svg className="bi" width="1em" height="1em">
                <use xlinkHref="#chevron-right" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <hr />
      <div className="container px-4 py-2" id="hanging-icons">
        <h2 className="pb-2 border-bottom">Academic Programmes</h2>
        <div className="row g-4 py-2 row-cols-1 row-cols-lg-3">
          <div className="col d-flex align-items-start">
            <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
              <svg className="bi" width="1em" height="1em">
                <use xlinkHref="#toggles2" />
              </svg>
            </div>
            <div>
              <h2>Business Informatics</h2>
              <p>
                Paragraph of text beneath the heading to explain the heading.
                We&aposll add onto it with another sentence and probably just
                keep going until we run out of words.
              </p>
              <a href="#" className="btn btn-primary">
                Primary button
              </a>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
              <svg className="bi" width="1em" height="1em">
                <use xlinkHref="#cpu-fill" />
              </svg>
            </div>
            <div>
              <h2>Big Data Analytics</h2>
              <p>
                Comprehensive programmes, consisting of multiple courses needed
                for the business analytics to teach you all you need to know
                about business Informatic/analytics. This is drawnout from tools
                like Python to machine learning algorithms and other in-demand
                courses.
              </p>
              <a href="#" className="btn btn-primary">
                Primary button
              </a>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
              <svg className="bi" width="1em" height="1em">
                <use xlinkHref="#tools" />
              </svg>
            </div>
            <div>
              <h2>Full Stack Programmining Courses</h2>
              <p>
                Become expert and full stack programmer in our innocative and
                acontemporarrly software development technology that create the
                free ecosystem of interactive and distributed business options.
                Such as ReactJS, NEXTJS, NODEJS, JAVA, Bootstrap, HTML, CSS, and
                JavaScript ...
              </p>
              <a href="#" className="btn btn-primary">
                Primary button
              </a>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="container px-4 py-2" id="custom-cards">
        <h2 className="pb-2 border-bottom">Special Programmes for you...</h2>

        <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-2">
          <div className="col">
            <div className="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg">
              <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                  Bootstrap for Web Application Front-end Development
                </h2>
                <ul className="d-flex list-unstyled mt-auto">
                  <li className="me-auto">
                    <Image
                      src="/public/images/003.jpg"
                      alt="Bootstrap"
                      width="32"
                      height="32"
                      className="rounded-circle border border-white"
                    />
                  </li>
                  <li className="d-flex align-items-center me-3">
                    <svg className="bi me-2" width="1em" height="1em">
                      <use xlinkHref="#geo-fill" />
                    </svg>
                    <small>Earth</small>
                  </li>
                  <li className="d-flex align-items-center">
                    <svg className="bi me-2" width="1em" height="1em">
                      <use xlinkHref="#calendar3" />
                    </svg>
                    <small>3d</small>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg">
              <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                  Degree Programmes driven by the World best organizational need
                  and requirement.
                </h2>
                <ul className="d-flex list-unstyled mt-auto">
                  <li className="me-auto">
                    <Image
                      src="/public/images/Annotation 2020-09-05 203518.png"
                      alt="Bootstrap"
                      width="32"
                      height="32"
                      className="rounded-circle border border-white"
                    />
                  </li>
                  <li className="d-flex align-items-center me-3">
                    <svg className="bi me-2" width="1em" height="1em">
                      <use xlinkHref="#geo-fill" />
                    </svg>
                    <small>Country Best</small>
                  </li>
                  <li className="d-flex align-items-center">
                    <svg className="bi me-2" width="1em" height="1em">
                      <use xlinkHref="#calendar3" />
                    </svg>
                    <small>4d</small>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg">
              <div className="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                  Business and organizational Capacity need
                </h2>
                <ul className="d-flex list-unstyled mt-auto">
                  <li className="me-auto">
                    <Image
                      src="/public/images/background.png"
                      alt="Bootstrap"
                      width="32"
                      height="32"
                      className="rounded-circle border border-white"
                    />
                  </li>
                  <li className="d-flex align-items-center me-3">
                    <svg className="bi me-2" width="1em" height="1em">
                      <use xlinkHref="#geo-fill" />
                    </svg>
                    <small>Mainland</small>
                  </li>
                  <li className="d-flex align-items-center">
                    <svg className="bi me-2" width="1em" height="1em">
                      <use xlinkHref="#calendar3" />
                    </svg>
                    <small>5d</small>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="b-example-divider"></div>
      {/* 
      <div className="container px-4 py-2" id="icon-grid">
        <h2 className="pb-2 border-bottom">Icon grid</h2>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-2">
          <div className="col d-flex align-items-start">
            <svg
              className="bi text-muted flex-shrink-0 me-3"
              width="1.75em"
              height="1.75em">
              <use xlinkHref="#bootstrap" />
            </svg>
            <div>
              <h4 className="fw-bold mb-0">Featured title</h4>
              <p>
                Paragraph of text beneath the heading to explain the heading.
              </p>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <svg
              className="bi text-muted flex-shrink-0 me-3"
              width="1.75em"
              height="1.75em">
              <use xlinkHref="#cpu-fill" />
            </svg>
            <div>
              <h4 className="fw-bold mb-0">Featured title</h4>
              <p>
                Paragraph of text beneath the heading to explain the heading.
              </p>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <svg
              className="bi text-muted flex-shrink-0 me-3"
              width="1.75em"
              height="1.75em">
              <use xlinkHref="#calendar3" />
            </svg>
            <div>
              <h4 className="fw-bold mb-0">Featured title</h4>
              <p>
                Paragraph of text beneath the heading to explain the heading.
              </p>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <svg
              className="bi text-muted flex-shrink-0 me-3"
              width="1.75em"
              height="1.75em">
              <use xlinkHref="#home" />
            </svg>
            <div>
              <h4 className="fw-bold mb-0">Featured title</h4>
              <p>
                Paragraph of text beneath the heading to explain the heading.
              </p>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <svg
              className="bi text-muted flex-shrink-0 me-3"
              width="1.75em"
              height="1.75em">
              <use xlinkHref="#speedometer2" />
            </svg>
            <div>
              <h4 className="fw-bold mb-0">Featured title</h4>
              <p>
                Paragraph of text beneath the heading to explain the heading.
              </p>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <svg
              className="bi text-muted flex-shrink-0 me-3"
              width="1.75em"
              height="1.75em">
              <use xlinkHref="#toggles2" />
            </svg>
            <div>
              <h4 className="fw-bold mb-0">Featured title</h4>
              <p>
                Paragraph of text beneath the heading to explain the heading.
              </p>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <svg
              className="bi text-muted flex-shrink-0 me-3"
              width="1.75em"
              height="1.75em">
              <use xlinkHref="#geo-fill" />
            </svg>
            <div>
              <h4 className="fw-bold mb-0">Featured title</h4>
              <p>
                Paragraph of text beneath the heading to explain the heading.
              </p>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <svg
              className="bi text-muted flex-shrink-0 me-3"
              width="1.75em"
              height="1.75em">
              <use xlinkHref="#tools" />
            </svg>
            <div>
              <h4 className="fw-bold mb-0">Featured title</h4>
              <p>
                Paragraph of text beneath the heading to explain the heading.
              </p>
            </div>
          </div>
        </div> 
      </div>*/}
    </>
  );
}
