import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Navbar from "./navbar";
import { Link, useNavigate, useParams } from "react-router-dom";

const UbahBuku = () => {
  const [namaBuku, setNamaBuku] = useState("");
  const [penerbit, setPenerbit] = useState("");
  const [pengarang, setPengarang] = useState("");
  const [tahunTerbit, setTahunTerbit] = useState();
  const [tempatTerbit, setTempatTerbit] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();

  const handleEdit = async (event) => {
    event.preventDefault();
    const userLogin = localStorage.getItem("userLogin");
    // console.log(userLogin);
    if (!userLogin) {
      return navigate("/login");
    }
    // console.log(typeof id);
    const data = {
      namaBuku,
      penerbit,
      pengarang,
      tahunTerbit,
      tempatTerbit,
    };

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(
      `${process.env.REACT_APP_API_URI}/books/ubah/${id}`,
      requestOptions
    );
    const books = await response.json();
    if (response.status === 200) {
      navigate("/books");
      Swal.fire({
        icon: "success",
        type: "success",
        title: books.message,
      });
    } else {
      Swal.fire({
        icon: "warning",
        type: "warning",
        title: books.message,
      });
      // navigate("/ubah/:id");
    }
  };

  const getBookById = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URI}/books/id/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const { book } = await response.json();
    setNamaBuku(book.namaBuku);
    setPenerbit(book.penerbit);
    setPengarang(book.pengarang);
    setTahunTerbit(book.tahunTerbit);
    setTempatTerbit(book.tempatTerbit);
  };

  useEffect(() => {
    getBookById();
    localStorage.getItem("userLogin");
    localStorage.getItem("token");
  }, []);

  const title = "Ubah Data Buku";
  // if (id === ":id") {
  //   return <Navigate to={"/books"} />;
  // }
  return (
    <div>
      <Navbar />
      <div className="min-vh-100 bg-secondary bg-opacity-50">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col col-md-6">
              <div className="card p-3 my-5">
                <h1 className="text-center">{title}</h1>
                <form onSubmit={handleEdit}>
                  <div className="mb-3">
                    <label htmlFor="namaBuku" className="form-label">
                      Nama Buku
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="namaBuku"
                      id="namaBuku"
                      placeholder="masukkan nama Buku..."
                      required
                      value={namaBuku}
                      onChange={(event) => setNamaBuku(event.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="penerbit" className="form-label">
                      Nama Penerbit
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="penerbit"
                      id="penerbit"
                      placeholder="masukkan nama penerbit.. "
                      required
                      value={penerbit}
                      onChange={(event) => setPenerbit(event.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="pengarang" className="form-label">
                      Nama Pengarang
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="pengarang"
                      id="pengarang"
                      placeholder="masukkan nama pengarang.. "
                      required
                      value={pengarang}
                      onChange={(event) => setPengarang(event.target.value)}
                    />
                  </div>
                  <div className="mb-3 ">
                    <label htmlFor="pengarang" className="form-label">
                      Tahun Terbit
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="tahunTerbit"
                      id="tahunTerbit"
                      placeholder="masukkan nama tahun terbit.. "
                      value={tahunTerbit}
                      onChange={(event) => setTahunTerbit(event.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3 ">
                    <label htmlFor="tempatTerbit" className="form-label">
                      Tempat Terbit
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="tempatTerbit"
                      id="tempatTerbit"
                      placeholder="masukkan nama tempat terbit.. "
                      value={tempatTerbit}
                      onChange={(event) => setTempatTerbit(event.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <button
                      type="submit"
                      className="form-control btn btn-primary"
                    >
                      Ubah
                    </button>
                  </div>
                </form>
                <Link to={"/books"}>Kembali</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UbahBuku;
