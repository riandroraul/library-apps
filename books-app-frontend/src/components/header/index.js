import React from "react";
import { Link } from "react-router-dom";
import logo from "../../Assets/img/logo-smk.png";

export const Header = (props) => {
  return (
    <header class="pb-3 mb-3 border-bottom">
      <Link
        to="/"
        class="d-flex align-items-center text-dark text-decoration-none"
      >
        <img src={logo} width="50" height="40" className="mx-4" alt="" />
        <span class="fs-4">{props.title} | Perpustakaan SMK Al - Amanah</span>
      </Link>
    </header>
  );
};
