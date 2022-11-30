import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import { Link, useParams } from "react-router-dom";

const DetailBook = () => {
  const [book, getBook] = useState("");
  const { id } = useParams();

  const getBookById = async () => {
    const response = await fetch(`${window.env.REACT_API_URI}/books/id/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const { book } = await response.json();
    getBook(book);
  };

  useEffect(() => {
    getBookById();
  }, []);

  console.log();
  return (
    <div>
      <Navbar />
      <div className="min-vh-100 bg-secondary bg-opacity-50">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col col-md-8">
              <div className="card p-3 my-5">
                <h2 className="text-center">Detail Buku</h2>
                <div className="row">
                  <div className="mb-3 col-5">
                    <font size={5}>Kode Barcode</font>
                  </div>
                  <div className="mb-3 col-1">
                    <font size={5}>: </font>
                  </div>
                  <div className="mb-3 col-6">
                    <font size={5}>{book._id}</font>
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-5">
                    <font size={5}>Judul Buku</font>
                  </div>
                  <div className="mb-3 col-1">
                    <font size={5}>: </font>
                  </div>
                  <div className="mb-3 col-6">
                    <font size={5}>{book.namaBuku}</font>
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-5">
                    <font size={5}>Penerbit</font>
                  </div>
                  <div className="mb-3 col-1">
                    <font size={5}>: </font>
                  </div>
                  <div className="mb-3 col-6">
                    <font size={5}>{book.penerbit}</font>
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-5">
                    <font size={5}>Pengarang</font>
                  </div>
                  <div className="mb-3 col-1">
                    <font size={5}>: </font>
                  </div>
                  <div className="mb-3 col-6">
                    <font size={5}>{book.pengarang}</font>
                  </div>
                </div>
                {/* <div className="row">
                  <div className="mb-3 col-3">
                    <font size={5}>Birthdate </font>
                  </div>
                  <div className="mb-3 col-8">
                    <font size={5}>{`${d} ${monthNames[m - 1]} ${y}`}</font>
                  </div>
                </div> */}
                <div className="row">
                  <div className="mb-3 col-5">
                    <font size={5}>Tahun Terbit</font>
                  </div>
                  <div className="mb-3 col-1">
                    <font size={5}>: </font>
                  </div>
                  <div className="mb-3 col-6">
                    <font size={5}>{book.tahunTerbit}</font>
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-5">
                    <font size={5}>Tempat Terbit</font>
                  </div>
                  <div className="mb-3 col-1">
                    <font size={5}>: </font>
                  </div>
                  <div className="mb-3 col-6">
                    <font size={5}>{book.tempatTerbit}</font>
                  </div>
                </div>
                <div className="my-3">
                  <div className="float-end mx-5">
                    <Link to={"/books"}>Kembali</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBook;
