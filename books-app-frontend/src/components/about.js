import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./header";
import Navbar from "./navbar";
import img1 from "../Assets/img/foto_dokumentasi5.jpeg";

const About = () => {
  const title = "Tentang Perpus";
  return (
    <div>
      <Navbar />
      <main>
        <div className="container py-4">
          <Header title={title} />
          <div className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5">
              <h1 className="display-5 fw-bold">Tentang Perpustakaan</h1>
              <p className="col-md-8 fs-4">
                berisi informasi tentang ... <br /> Lorem ipsum dolor sit, amet
                consectetur adipisicing elit. Repellat vel est accusantium
                repudiandae explicabo necessitatibus nostrum iusto ut aliquid
                laborum minima perferendis quas, ducimus reiciendis!
              </p>
              <img
                src={img1}
                alt="Gambar Perpustakaan"
                className="img-fluid img-thumbnail rounded"
              />
            </div>
          </div>

          <div className="row align-items-md-stretch">
            <div className="col-md-6">
              <div className="h-100 p-5 text-bg-dark rounded-3">
                <h2>member perpustakaan</h2>
                <p>
                  berisi anggota member perpustakaan .... <br />
                  Swap the background-color utility and add a `.text-*` color
                  utility to mix up the jumbotron look. Then, mix and match with
                  additional component themes and more.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="h-100 p-5 bg-light border rounded-3">
                <h2>Jadwal</h2>
                <p>
                  Berisi informasi jadwal perpustakaan .... <br />
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Deleniti, ipsum placeat! Beatae corporis illo, modi amet, quod
                  repellat quibusdam, iste voluptatum earum autem sint ab.
                </p>
                {/* <img src={img1} alt="" /> */}
              </div>
            </div>
          </div>

          <footer className="pt-3 mt-4 text-muted border-top">
            &copy; Copyright {new Date().getFullYear()}
          </footer>
        </div>
      </main>
      <Outlet />
    </div>
  );
};

export default About;
