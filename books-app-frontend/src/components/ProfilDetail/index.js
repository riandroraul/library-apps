import React from "react";
import { Header } from "../header";

const ProfilDetail = () => {
  return (
    <>
      <main>
        <div className="container py-4">
          <Header />

          <div className=" bg-light rounded-3">
            <div className="container-fluid py-2">
              <h6 className="display-5 fw-bold">Custom jumbotron</h6>

              <button className="btn btn-primary btn-sm" type="button">
                Example button
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfilDetail;
