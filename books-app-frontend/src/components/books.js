import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import Swal from "sweetalert2";
import ButtonAdd from "./auth-content/ButtonAdd";
import Aksi from "./auth-content/Aksi";
// import ProtectedContent from "./ProtectedContent";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [keyword, setKeyword] = useState("");

  const getAllBooks = async () => {
    const response = await fetch(`http://localhost:5000/books`, {
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
        fetch(`http://localhost:5000/books/hapus/${id}`, {
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
      "http://localhost:5000/books/search?namaBuku=" + keyword,
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
      getAllBooks(); // dijalankan saat halaman books ini di render
    } else {
      onSearch();
    }
  }, [keyword]);

  const title = "Halaman Buku";
  // console.log(totalPage);
  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>{title}</h1>
        <div className="row">
          <div className="col-6">
            <ButtonAdd path="/tambah" />
          </div>
        </div>
        <div className="col-lg-6 my-3 justify-content-center d-block">
          <div className="input-group mb-3 ">
            <input
              type="text"
              className="form-control"
              placeholder="cari nama buku ..."
              aria-label="cari nama buku"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
            {/* <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={() => {
                onSearch();
              }}
              >
              search
            </button> */}
          </div>
        </div>
        <div className="table table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Judul Buku</th>
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
                    {/* <td>
                    <Link to={`/ubah/${book._id}`}>
                    <span className="badge text-bg-success">ubah</span>
                    </Link>
                    <button
                    type="submit"
                    className="badge text-bg-danger tombol-hapus"
                    onClick={() => {
                      deleteBook(book._id);
                    }}
                    >
                    hapus
                    </button>
                  </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Books;
