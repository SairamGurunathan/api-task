import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Dropdown, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { FaTachometerAlt } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { Image } from "../Assects/Img/Img";

const Header = () => {
  const navigate = useNavigate();
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const closeOffcanvas = () => {
    setShowOffcanvas(false);
  };

  return (
    <>
      <Navbar bg="light" expand="md" data-bs-theme="light">
        <Container fluid>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="d-lg-none d-md-block me-2"
            onClick={() => setShowOffcanvas(!showOffcanvas)}
          />
          <Offcanvas
            placement="start"
            show={showOffcanvas}
            onHide={closeOffcanvas}
            className="off-canvas"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div className="d-flex vh-100">
                <div
                  className="nav flex-column border-0 w-100"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <img
                    src={Image.logo}
                    alt="logo"
                    className="img w-100 img-logo"
                  />
                  <hr className="w-100" />
                  <ul className="nav nav-pills flex-column mb-auto mx-3 flex-inline">
                    <li>
                      <Link
                        to="/dashboard"
                        className="nav-link active d-flex align-items-center flex-inline"
                      >
                        <FaTachometerAlt className="me-2" />
                        Dashboard
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
          <Navbar.Collapse className="d-flex justify-content-between">
            <nav className="bread">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <Link
                    to="/dashboard"
                    className="text-decoration-none icon-color"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  User Table
                </li>
              </ol>
            </nav>
            <Nav className="text-end">
              <Dropdown>
                <Dropdown.Toggle
                  className="badge d-flex align-items-center p-1 border rounded-pill icon-color border-color"
                >
                  <img
                    className="rounded-circle me-1"
                    width="24"
                    height="24"
                    src="https://github.com/mdo.png"
                    alt="pro"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>
                    <h6>Admin</h6>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => navigate("/")}>
                    <TbLogout /> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
