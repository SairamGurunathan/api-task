import React from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt } from "react-icons/fa";
import { Image } from "../Assects/Img/Img";
import Header from "./Header";
import UserTable from "./UserTable";


const SideBar = () => {

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2 d-none d-lg-block p-0 bg-light">
            <div className="d-flex  vh-100">
              <div
                className="nav flex-column border-0 w-100"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <img
                  src={Image.logo}
                  alt="logo"
                  className="img img-responsive w-100 img-logo"
                />
                <hr className="w-100"/>
                  <ul className="nav nav-pills flex-column mb-auto mx-3 flex-inline">
                    <li>
                      <Link to="#" className="nav-link active d-flex align-items-center flex-inline">
                        <FaTachometerAlt className="me-2"/>
                        Dashboard
                      </Link>
                    </li>
                  </ul>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-10  p-0">
            <div>
              <Header />
              <UserTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
