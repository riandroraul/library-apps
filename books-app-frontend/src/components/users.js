import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Header } from "./header";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");

  const getUsers = () => {
    fetch(`${process.env.REACT_APP_API_URI}/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setUsers(res);
      });
  };

  const deleteUser = (id) => {
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
        fetch(`${process.env.REACT_APP_API_URI}/hapusUser/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }).then(async (res) => {
          const {
            result: { deletedCount },
            message,
          } = await res.json();
          console.log(deletedCount);
          if (deletedCount === 1) {
            Swal.fire("Deleted!", message, "success");
            return getUsers();
          } else {
            Swal.fire("Deleted Failed!", message, "error");
            return getUsers();
          }
        });
      }
    });
  };

  const searchUser = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URI}/searchUser?nama=${keyword}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const result = await response.json();
    setUsers(result);
  };

  useEffect(() => {
    if (keyword === "") {
      getUsers(); // dijalankan saat halaman users ini di render
    } else {
      searchUser();
    }
  }, [keyword]);
  const title = "Daftar Users";
  return (
    <div>
      <Navbar />
      <div className="container p-5 mb-4">
        <Header title={title} />
        <div className="bg-light rounded-3">
          <div className="col-md-6 my-3">
            <div className="input-group mb-3 mx-3">
              <input
                type="text"
                className="form-control mt-3"
                placeholder="cari nama user ..."
                aria-label="cari nama user"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
            </div>
          </div>
          <div className="table table-responsive">
            <div className="col-md-6">
              <table className="table table-hover align-self-center">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => {
                    return (
                      <tr key={user._id}>
                        <th scope="row" key={index}>
                          {index + 1}
                        </th>
                        <td>{user.nama}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td className=" d-grid gap-2 d-lg-block mx-auto">
                          <Link to={`/ubahRoleUser/${user._id}`}>
                            <button
                              type="button"
                              className="btn btn-outline-success btn-sm mx-2"
                            >
                              Ubah
                            </button>
                          </Link>
                          <button
                            type="submit"
                            className="btn btn-outline-danger btn-sm mx-2"
                            onClick={() => {
                              deleteUser(user._id);
                            }}
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
