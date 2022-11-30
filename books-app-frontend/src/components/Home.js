import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./header";
import Navbar from "./navbar";
import imgDescrib from "../Assets/img/foto_dokumentasi18.jpeg";
import imgKegiatan from "../Assets/img/foto_dokumentasi13.jpeg";
import imgKegiatan2 from "../Assets/img/foto_dokumentasi14.jpeg";

function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <div className="container py-4">
          <Header title={"Beranda"} />

          <div className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5">
              <h1 className="display-5 fw-bold">Deskripsi Perpustakaan</h1>
              <p className="col-md fs-4">
                Perpustakaan digital adalah perpustakaan yang mempunyai koleksi
                buku sebagian besar dalam bentuk format digital dan yang bisa
                diakses dengan komputer. Jenis perpustakaan ini berbeda dengan
                jenis perpustakaan konvensional yang berupa kumpulan buku
                tercetak, film mikro (microform dan microfiche), ataupun
                kumpulan kaset audio, video, dll. Isi dari perpustakaan digital
                berada dalam suatu komputer server yang bisa ditempatkan secara
                lokal, maupun di lokasi yang jauh, namun dapat diakses dengan
                cepat dan mudah lewat jaringan komputer.
              </p>
              <img
                src={imgDescrib}
                alt="Gambar Perpustakaan"
                className="img-fluid img-thumbnail rounded"
              />
            </div>
          </div>

          <div className="row align-items-md-stretch">
            <div className="col-md-6">
              <div className="h-100 p-5 text-bg-dark rounded-3">
                <h2>Kegiatan</h2>
                <p>
                  Siswa SMK AL AMANAH yang senang membaca buku seperti novel,
                  komik atau terkait pelajaran menyempatkan diri untuk datang ke
                  perpustakaan
                </p>
                <img
                  src={imgKegiatan}
                  alt="Gambar Perpustakaan"
                  className="img-fluid img-thumbnail rounded"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="h-100 p-5 bg-light border rounded-3">
                <h2>Informasi</h2>
                <p>
                  Berisi informasi tentang perpustakaan ... <br />
                  Or, keep it light and add a border for some added definition
                  to the boundaries of your content. Be sure to look under the
                  hood at the source HTML here as we've adjusted the alignment
                  and sizing of both column's content for equal-height.
                </p>
                <img
                  src={imgKegiatan2}
                  alt="Gambar Perpustakaan"
                  className="img-fluid img-thumbnail rounded"
                />
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
}

export default Home;
