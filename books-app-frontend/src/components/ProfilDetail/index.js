import React from "react";
import Navbar from "../navbar";
import { Header } from "../header";
import userlogin from "../userlogin";

const ProfilDetail = () => {
  const user = userlogin();
  return (
    <div>
      <Navbar />
      <main>
        <div className="container py-4">
          <Header title={"Profil Saya"} />
          <div className="row ">
            <div className="col-6 bg-light rounded-3">
              <h6 className="display-5 fw-bold">Profile</h6>
              <p className="display-6">Nama: {user.nama}</p>
              <p className="display-6">Email: {user.email}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilDetail;
