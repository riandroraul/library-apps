import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "./dropdown";
import NavUser from "./NavUser";

const Navbar = () => {
  return (
    <nav className="navbar sticky-top navbar-expand-lg bg-secondary">
      <div className="container">
        <Link className="navbar-brand text-light" to="/">
          Beranda
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-2">
            <li className="nav-item">
              <Link
                className="nav-link text-light"
                aria-current="page"
                to="/books"
              >
                Daftar Buku
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/about">
                Tentang Perpus
              </Link>
            </li>
            <NavUser nama={"Users"} path={"/users"} />
            <Dropdown />
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
