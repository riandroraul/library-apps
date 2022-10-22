const emailValidator = require("email-validator");
const User = require("../models/users");
const Token = require("../models/token");
const sendEmail = require("../utils/helper");
const jwt = require("jsonwebtoken");
const {
  hashPassword,
  comparePassword,
} = require("../validate/hashNComparePwd");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(
      {},
      { _id: "$_id", nama: "$nama", email: "$email", role: "$role" }
    );
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

const searchUser = async (req, res) => {
  try {
    if (!req.query.nama) {
      return res.status(400).json({ message: "Wrong Query", status: 400 });
    }
    const result = await User.find(
      {
        nama: { $regex: req.query.nama, $options: "i" },
      },
      { _id: "$_id", nama: "$nama", email: "$email", role: "$role" }
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findOne(
      { _id: req.params.id },
      { _id: "$_id", nama: "$nama", email: "$email", role: "$role" }
    );
    // console.log(user);
    res.status(200).json({
      user,
      message: "user ditemukan",
    });
  } catch (err) {
    res.status(404).json({
      message: "id not found",
    });
  }
};

const addUser = async (req, res) => {
  const user = new User({
    nama: req.body.nama,
    email: req.body.email,
    password: await hashPassword(req.body.password),
    role: 3,
  });
  try {
    const duplikat = await User.findOne({ email: user.email });
    if (duplikat) {
      throw new Error("email sudah digunakan");
    }
    if (emailValidator.validate(user.email) === false) {
      throw new Error("email not valid");
    }
    const addUser = await user.save();
    res.status(201).json({ addUser, message: "Registrasi Berhasil" });
  } catch (err) {
    res.status(400).json({ message: err.message, status: 400 });
  }
};

const deleteUser = async (req, res) => {
  try {
    const cekUser = await User.findOne({ _id: req.params.id });
    if (cekUser) {
      User.deleteOne(cekUser).then((result) => {
        res
          .status(200)
          .json({ result, message: "Data User Berhasil Di hapus" });
      });
    } else {
      res.status(400).json({ message: "id not found", status: 400 });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const ubahRoleUser = async (req, res) => {
  try {
    const cekUser = await User.findOne({ _id: req.params.id });
    // console.log(cekUser);
    if (!cekUser) {
      throw new Error("id not found");
    }
    if (req.body.role > 3 || req.body.role < 1) {
      throw new Error("User role not allowed");
    }
    const roleUpdated = await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          role: req.body.role,
        },
      }
    );
    res.status(200).json(roleUpdated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const cekUser = await User.findOne({ email: req.body.email });
    if (!cekUser) {
      throw new Error("email atau password salah!");
    } else if (cekUser) {
      const matchPass = await comparePassword(
        req.body.password,
        cekUser.password
      );
      if (!matchPass) {
        throw new Error("email atau password salah!");
      }
      if (matchPass) {
        const dataUser = {
          nama: cekUser.nama,
          email: cekUser.email,
          role: cekUser.role,
        };

        const token = jwt.sign(dataUser, "secret", { expiresIn: "2h" });
        res.status(200).json({ dataUser, token, message: "login berhasil" });
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const reqPasswordReset = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(400)
        .json({ status: 400, message: "user with given does not exist" });
    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: jwt.sign({ id: user._id }, "secretkey", { expiresIn: "20m" }),
      }).save();
    }
    const url = req.body.url;
    const html = `<h3>Hallo ${user.nama} &#128512;</h3>
    <p>silahkan klik link dibawah untuk mengganti password anda atau salin tautan dan buka di browser</p>
    <p style="color: red; font-size: 12px; font-weight: bold;">&#9888; link waktu terbatas, segera ganti password anda</p>
    <a href='${url}/change-password/${user._id}/${token.token}'>Ganti Password</a>
    <p>link tautan : ${url}/change-password/${user._id}/${token.token}</p>
    <p>link expired : 20 Menit</p>
    `;
    sendEmail(user.email, "Reset Password", html);
    // req.link = link;
    // next();
    res
      .status(200)
      .json({ message: "password reset link sent to your email account" });
  } catch (error) {
    res.send("An Error Occured");
    console.log(error);
  }
};

const resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    // console.log(user);
    if (!user) {
      const error = new Error("invalid link or expired", res.status(400));
      error.statusCode = 400;
      throw error;
    }

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) {
      const error = new Error("invalid link or expired", res.status(400));
      error.statusCode = 400;
      throw error;
    }

    jwt.verify(token.token, "secretkey", (err, decode) => {
      if (err) {
        err.message = "link not valid or expired";
        const error = new Error(err.message, res.status(400));
        error.status = 400;

        token
          .delete()
          .then((err, result) => {
            if (err) throw err;
            console.log(result);
          })
          .catch((err) => console.log(err));
        throw error;
      }
    });

    // const decode = jwt.verify(token.token, "secretkey");
    // console.log(decode);
    // console.log(Date.now());
    // console.log(decode.exp * 1000);
    // if (decode.exp * 1000 < Date.now()) {
    //   await token.delete();
    //   const error = new Error("invalid link or expired", res.status(400));
    //   error.statusCode = 400;
    //   throw error;
    // }
    user.password = await hashPassword(req.body.password);
    await user.save();
    await token.delete();

    res.status(200).json({ message: "Password changed succesfully" });
  } catch (error) {
    res.status(400).json({ status: error.statusCode, message: error.message });
    console.log(error);
  }
};

const reqError = (req, res) => {
  res
    .status(404)
    .json({ status: 404, message: "cannot request with this endpoint" });
};

module.exports = {
  getAllUsers,
  addUser,
  deleteUser,
  reqError,
  login,
  ubahRoleUser,
  getUserById,
  searchUser,
  reqPasswordReset,
  resetPassword,
};
