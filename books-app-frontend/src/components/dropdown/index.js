import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Dropdown = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Your session will be removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Logout Success!", "", "success");
        localStorage.clear("userLogin");
        localStorage.clear("token");
        navigate("/login");
      }
    });
  };
  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Pengaturan
      </button>
      <ul className="dropdown-menu">
        <li>
          <Link className="dropdown-item" to="/profil">
            Profil
          </Link>
        </li>
        <li>
          <Link
            to={"/login"}
            className="dropdown-item"
            onClick={(event) => {
              event.preventDefault();
              onLogout();
            }}
          >
            Keluar
          </Link>
        </li>
      </ul>
    </div>
  );
};
