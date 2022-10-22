import React from "react";
import { Link } from "react-router-dom";
import userlogin from "../userlogin";

const Aksi = (props) => {
  const { role: roleUser } = userlogin();
  if (roleUser === "3") {
    return (
      <td className="d-grid gap-2 d-md-block mx-auto">
        <Link to={props.pathdetail}>
          <button type="button" className="btn btn-outline-info btn-sm pl">
            Detail
          </button>
        </Link>
      </td>
    );
  } else {
    return (
      <td className="d-grid gap-2 d-md-block mx-auto">
        <Link to={props.pathdetail}>
          <button type="button" className="btn btn-outline-info btn-sm mx-2">
            Detail
          </button>
        </Link>
        <Link to={props.pathedit}>
          <button type="button" className="btn btn-outline-success btn-sm mx-2">
            Ubah
          </button>
        </Link>
        <button
          type="button"
          className="btn  btn-outline-danger btn-sm mx-2"
          onClick={props.onclick}
        >
          Hapus
        </button>
      </td>
    );
  }
  // case "2":
  //   case "1": {
  //     );
  //   }
  // }
  // }
};

export default Aksi;
