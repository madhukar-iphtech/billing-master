import "./navbar.css";
import { useEffect, useCallback } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { NavDropdown, Button } from "react-bootstrap";
export default function Navbar() {
  const navigate = useNavigate;
  let users = JSON.parse(localStorage.getItem("user-info"));
  function logOut() {
    localStorage.clear("user-info4343657897");
    navigate("/Signup");
  }
  console.warn("2323", users);
  const documentScroll = useCallback((event) => {
    event.preventDefault();
    let header = document.querySelector(".topnav");
    if (window.scrollY > 50) {
      header?.classList.add("custom-bg");
    } else {
      header?.classList.remove("custom-bg");
    }
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", documentScroll);
    return () => {
      document.removeEventListener("scroll", documentScroll);
    };
  }, [documentScroll]);

  return (
    <div>
      <nav
        className={
          "topnav navbar navbar-expand-md shadow justify-content-between justify-content-sm-start navbar-light"
        }
        id="sidenavAccordion"
      >
        <div className="container-fluid">
          <div className="navbar-brand d-flex justify-content-between ">
            <a href="/">
              <img
                src="/images/IPH-LOGO.png"
                alt="Logo"
                className="logoImage"
              />
            </a>
            <button
              className="navbar-toggler text-white"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon navbar-dark"></span>
            </button>
          </div>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav align-items-center ml-auto col-auto px-4">
              {localStorage.getItem("user-info4343657897") ? (
                <>
                  <li className="nav-item   me-3  ">
                    <a className="nav-link" href="/Home">
                      <div className=" fw-bold text-white fs-6">Home</div>
                    </a>
                  </li>
                  <li className="nav-item   me-3  ">
                    <a className="nav-link" href="/">
                      <div
                        className=" fw-bold text-white fs-6"
                        onClick={logOut}
                      >
                        Log Out
                      </div>
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item   me-3  ">
                    <a className="nav-link" href="/Signup">
                      <div className=" fw-bold text-white fs-6">Signup</div>
                    </a>
                  </li>
                  <li className="nav-item   me-3  ">
                    <a className="nav-link" href="/">
                      <div className=" fw-bold text-white fs-6">Login</div>
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
