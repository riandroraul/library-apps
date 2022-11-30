import React, { useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const changePassword = async (event) => {
    event.preventDefault();
    if (email === "") {
      return Swal.fire({
        icon: "error",
        text: "field email must be fill",
        title: "Email is Required!",
      });
    }
    const data = {
      email,
      url: `${process.env.REACT_APP_BASE_URI}`,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_URI}/req-reset-password`,
      requestOptions
    );
    const { message } = await response.json();
    // console.log(response.json());
    if (response.status !== 200) {
      return Swal.fire({
        icon: "error",
        text: "your email not registered!",
        title: message,
      });
    }
    navigate("/login");
    return Swal.fire({
      icon: "success",
      text: message,
      title: "Success",
    });
    // }
  };

  const title = "Lupa Password ?";
  return (
    <div className="min-vh-100 bg-secondary bg-opacity-50">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col col-md-6">
            <div className="card p-3 my-5">
              <h1 className="my-3 text-center">{title}</h1>
              <div className="card-body">
                <form onSubmit={changePassword}>
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="input email ..."
                        name="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                      <div className="message">
                        <p className="text-start text-primary">
                          Pastikan email yang anda masukkan email yang aktif
                        </p>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="form-control btn btn-primary my-2"
                    >
                      Send
                    </button>
                  </div>
                </form>
                <Link to={"/login"}>Kembali</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
