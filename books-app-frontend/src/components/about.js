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
        <div class="container py-4">
          <Header title={title} />

          <div class="p-5 mb-4 bg-light rounded-3">
            <div class="container-fluid py-5">
              <h1 class="display-5 fw-bold">Tentang Perpustakaan</h1>
              <p class="col-md-8 fs-4">
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

          <div class="row align-items-md-stretch">
            <div class="col-md-6">
              <div class="h-100 p-5 text-bg-dark rounded-3">
                <h2>member perpustakaan</h2>
                <p>
                  berisi anggota member perpustakaan .... <br />
                  Swap the background-color utility and add a `.text-*` color
                  utility to mix up the jumbotron look. Then, mix and match with
                  additional component themes and more.
                </p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="h-100 p-5 bg-light border rounded-3">
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

          <footer class="pt-3 mt-4 text-muted border-top">
            &copy; Copyright 2022
          </footer>
        </div>
      </main>
      <Outlet />
    </div>
  );
};

export default About;
