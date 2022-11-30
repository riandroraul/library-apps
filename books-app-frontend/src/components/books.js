import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import Swal from "sweetalert2";
import ButtonAdd from "./auth-content/ButtonAdd";
import Aksi from "./auth-content/Aksi";
import { Header } from "./header";
// import ProtectedContent from "./ProtectedContent";

const Books = () => {
  let [books, setBooks] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [sortJudul, setSortJudul] = useState("");

  const getAllBooks = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URI}/books`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const { books } = await response.json();
    setBooks(books);
  };

  const deleteBook = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      onClick: (event) => event.preventDefault(),
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${process.env.REACT_APP_API_URI}/books/hapus/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }).then(async (res) => {
          // const books = await res.json();
          // console.log(books);
          Swal.fire("Deleted!", "Book has been deleted.", "success");
          getAllBooks();
        });
      }
    });
  };

  const onSearch = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URI}/books/search?namaBuku=${keyword}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const result = await response.json();
    setBooks(result);
  };

  useEffect(() => {
    localStorage.getItem("userLogin");
    localStorage.getItem("token");
    if (keyword === "") {
      getAllBooks();
    } else {
      onSearch();
    }
  }, [keyword, sortJudul]);

  const title = "Daftar Buku";
  // const onSorting = () => {
  if (sortJudul === "A-Z") {
    books = books.sort((a, b) => a.namaBuku.localeCompare(b.namaBuku));
  } else if (sortJudul === "Z-A") {
    books = books.sort((a, b) => b.namaBuku.localeCompare(a.namaBuku));
  } else {
    books = books.sort();
  }
  // };

  // console.log(process.env);
  return (
    <div>
      <Navbar />
      <div className="container p-5 mb-4 ">
        <Header title={title} />
        <div className="bg-light rounded-3">
          <div className="row mx-5">
            <div className="col-6">
              <ButtonAdd path="/tambah" />
            </div>
          </div>
          <div className="col-lg-6 my-3 justify-content-center d-block">
            <div className="input-group mb-3 ">
              <input
                type="text"
                className="form-control mx-5"
                placeholder="cari nama buku ..."
                aria-label="cari nama buku"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
            </div>
          </div>
          <div className="table table-responsive p-5 mb-4 bg-blue-200 rounded-3">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">
                    Judul Buku
                    <select
                      className="form-select-sm float-end"
                      aria-label="Default select example"
                      name="sortJudul"
                      onChange={(event) => {
                        setSortJudul(event.target.value);
                      }}
                    >
                      <option selected value={sortJudul}>
                        {sortJudul}
                      </option>
                      <option value={"none"}>none</option>
                      <option value={"A-Z"}>A-Z</option>
                      <option value={"Z-A"}>Z-A</option>
                    </select>
                  </th>
                  <th scope="col">Penerbit</th>
                  <th scope="col">Pengarang</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {books.map((book, index) => {
                  return (
                    <tr key={book._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{book.namaBuku}</td>
                      <td>{book.penerbit}</td>
                      <td>{book.pengarang}</td>
                      <Aksi
                        pathdetail={`/detail/${book._id}`}
                        pathedit={`/ubah/${book._id}`}
                        onclick={() => {
                          deleteBook(book._id);
                        }}
                      />
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
