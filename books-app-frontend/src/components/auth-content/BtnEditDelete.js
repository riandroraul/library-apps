import { View, Text } from "react-native";
import React from "react";
import { Link } from "react-router-dom";

const BtnEditDelete = (props) => {
  return (
    <>
      <Link to={props.pathedit}>
        <button type="button" className="btn btn-outline-success btn-sm mx-2">
          Ubah
        </button>
      </Link>
      <button
        type="button"
        className="btn  btn-outline-danger btn-sm"
        onClick={props.onclick}
      >
        Hapus
      </button>
    </>
  );
};

export default BtnEditDelete;
