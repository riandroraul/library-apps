import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./header";
// import { Outlet } from "react-router-dom";
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
              <h1 class="display-5 fw-bold">Custom jumbotron</h1>
              <p class="col-md-8 fs-4">
                Using a series of utilities, you can create this jumbotron, just
                like the one in previous versions of Bootstrap. Check out the
                examples below for how you can remix and restyle it to your
                liking.
              </p>
              <img src={img1} alt="" />
            </div>
          </div>

          <div class="row align-items-md-stretch">
            <div class="col-md-6">
              <div class="h-100 p-5 text-bg-dark rounded-3">
                <h2>Change the background</h2>
                <p>
                  Swap the background-color utility and add a `.text-*` color
                  utility to mix up the jumbotron look. Then, mix and match with
                  additional component themes and more.
                </p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="h-100 p-5 bg-light border rounded-3">
                <h2>Add borders</h2>
                <p>
                  Or, keep it light and add a border for some added definition
                  to the boundaries of your content. Be sure to look under the
                  hood at the source HTML here as we've adjusted the alignment
                  and sizing of both column's content for equal-height.
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
