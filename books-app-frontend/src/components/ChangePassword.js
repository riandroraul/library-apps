import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const ChangePassword = () => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();
  const id = useParams();
  const token = useParams();

  const changePassword = async (event) => {
    event.preventDefault();
    if (password1 === "" || password2 === "") {
      return Swal.fire({
        icon: "error",
        text: "field password must be fill",
        title: "Failed",
      });
    }
    if (password1.length < 5 || password2.length < 5) {
      return Swal.fire({
        icon: "error",
        text: "password must be 5 characters or more",
        title: "Failed",
      });
    }
    if (password1.localeCompare(password2) < 0) {
      return Swal.fire({
        icon: "error",
        text: "password must be matching",
        title: "Failed",
      });
    }
    const cekPassword = {
      password: password1,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cekPassword),
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_URI}/change-password/${id.id}/${token.token}`,
      requestOptions
    );
    const { message } = await response.json();
    if (response.status !== 200) {
      Swal.fire({
        icon: "error",
        text: message,
        title: "Failed!",
      });
      return navigate("/login");
    }
    Swal.fire({
      icon: "success",
      text: message,
      title: "Success",
    });
    return navigate("/login");
    // }
  };

  const title = "Forgot Password";
  return (
    <div className="min-vh-100 bg-secondary bg-opacity-50">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col col-md-6">
            <div className="card p-3 my-5">
              <h1 className="my-3">{title}</h1>
              <div className="card-body">
                <form onSubmit={changePassword}>
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="password1" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password1"
                        placeholder="type password ..."
                        name="password1"
                        value={password1}
                        onChange={(event) => setPassword1(event.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password1" className="form-label">
                        re-type password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password2"
                        placeholder="re-type password ..."
                        name="password2"
                        value={password2}
                        onChange={(event) => setPassword2(event.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      className="form-control btn btn-primary my-2"
                    >
                      Change Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
