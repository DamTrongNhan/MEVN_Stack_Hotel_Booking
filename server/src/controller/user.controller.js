import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { userModel } from "../model/model";
import config from "../config/config";

function encodedToken(userID) {
  return jwt.sign(
    {
      iss: "TrongNhan",
      sub: userID,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 3),
    },
    config.jwt.ACCESS_TOKEN_SECRET
  );
}

const signIn = async (req, res, next) => {
  const { email, password, role } = req.body;
  await userModel.findOne({ email: email }).then((user, err) => {
    if (err) return res.status(500).json({ message: "Lỗi server", error: err });

    if (!user) return res.status(401).json({ message: "User not found." });

    if (!bcrypt.compareSync(password, user.password))
      return res.status(401).json({
        message: "Login failed! Incorrect password.",
      });

    if (role === "admin" && user.role !== role) {
      const token = encodedToken(user._id);
      return res.status(200).json({
        message: "Login as customer successfully.",
        token: token,
        checkAdmin: false,
        user: { userName: user.name, userRole: user.role },
      });
    }

    if (!user.open)
      return res.status(401).json({ message: "Your account has been locked" });

    const token = encodedToken(user._id);
    return res.status(200).json({
      message: "Login successfully.",
      token: token,
      checkAdmin: true,
      user: { userName: user.name, userRole: user.role },
    });
  });
};

const signUp = async (req, res, next) => {
  const { email, password } = req.body;
  await userModel.findOne({ email: email }).then(async (user, err) => {
    if (!user) {
      const hashPassword = bcrypt.hashSync(password, 10);
      await userModel
        .create({ email: email, password: hashPassword })
        .then(async (user, err) => {
          if (err) {
            return res.status(500).json({
              message:
                "Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại.",
            });
          }
        });
      res.status(200).json({
        status: true,
        message: "Tạo tài khoản thành công",
      });
    } else
      return res.status(400).json({
        message: "Email is already in use.",
      });
    if (err) {
      return res.status(500).json({
        message: "Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại.",
      });
    }
  });
};
const create = async (req, res, next) => {
  const data = JSON.parse(req.body.data);
  console.log(req.file);
  if (req.file) {
    const file = req.file;
    const { email, password } = data;
    if (!email && !password)
      return res.status(400).json({
        message: "Vui lòng cung cấp email and password",
        status: false,
      });
    delete data.password;
    await userModel.findOne({ email: email }).then(async (user, err) => {
      if (!user) {
        const hashPassword = bcrypt.hashSync(password, 10);
        await userModel
          .create({ password: hashPassword, ...data, avatar: file.filename })
          .then(async (user, err) => {
            if (user) {
              return res.status(200).json({
                status: true,
                message: "Tạo tài khoản thành công",
              });
            }
            if (err) {
              return res.status(500).json({
                message:
                  "Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại.",
              });
            }
          });
      } else
        return res
          .status(400)
          .json({ status: false, message: "Email is already in use." });
      if (err) {
        return res.status(500).json({
          message: "Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại.",
        });
      }
    });
  } else {
    const { email, password } = data;
    if (!email && !password)
      return res.status(400).json({
        message: "Vui lòng cung cấp email and password",
        status: false,
      });
    delete data.password;
    await userModel.findOne({ email: email }).then(async (user, err) => {
      if (!user) {
        const hashPassword = bcrypt.hashSync(password, 10);
        await userModel
          .create({ password: hashPassword, ...data })
          .then(async (user, err) => {
            if (user) {
              return res.status(200).json({
                status: true,
                message: "Tạo tài khoản thành công",
              });
            }
            if (err) {
              return res.status(500).json({
                message:
                  "Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại.",
              });
            }
          });
      } else
        return res
          .status(400)
          .json({ status: false, message: "Email is already in use." });
      if (err) {
        return res.status(500).json({
          message: "Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại.",
        });
      }
    });
  }
};
const checkUser = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send("Please, login!");
  }
  jwt.verify(token, config.jwt.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (decoded) {
      try {
        const result = await userModel.findById(decoded.sub);
        if (result)
          return res
            .status(200)
            .json({ role: result.role, name: result.name, id: result._id });
      } catch (err) {
        console.log(err);
      }
    }
  });
};
const getAllUser = async (req, res) => {
  try {
    const result = await userModel.find({ role: "user" });
    // .sort({ updatedAt: 1 });
    if (result) {
      return res.status(200).json({ users: result });
    }
  } catch (e) {
    return res.status(500).json({
      message: "Có lỗi trong quá trình get all, vui lòng thử lại.",
    });
  }
};
const getAllAdmin = async (req, res) => {
  try {
    const result = await userModel.find({ role: "admin" });
    // .sort({ updatedAt: 1 });
    if (result) {
      return res.status(200).json({ users: result });
    }
  } catch (e) {
    return res.status(500).json({
      message: "Có lỗi trong quá trình get all, vui lòng thử lại.",
    });
  }
};
const getOne = async (req, res) => {
  try {
    const result = await userModel.findById(req.params.id);
    if (result) {
      return res.status(200).json({
        user: result,
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: "Có lỗi trong quá trình get all, vui lòng thử lại.",
      err: e,
    });
  }
};
const deleteOne = async (req, res, next) => {
  const userId = req.params.userId;
  await userModel
    .findByIdAndDelete(userId)
    .then(async () => {
      return res.status(200).json({ message: "Delete user successfully." });
    })
    .catch((err) => res.status(500).json(err));
};
const update = async (req, res, next) => {
  const userId = req.params.userId;
  const data = JSON.parse(req.body.data);
  if (req.file) {
    const file = req.file;
    try {
      const result = await userModel.findOneAndUpdate(
        { _id: userId },
        { ...data, avatar: file.filename }
      );
      if (result) {
        res
          .status(200)
          .json({ message: "Update user successfully. ", status: true });
      }
    } catch (err) {
      return res.status(500).json({ err: err });
    }
  } else {
    try {
      const result = await userModel.findOneAndUpdate(
        { _id: userId },
        { ...data }
      );
      if (result) {
        res
          .status(200)
          .json({ message: "Update user successfully. ", status: true });
      }
    } catch (e) {
      return res.status(500).json({ e: e });
    }
  }
};
// const search = async (req, res, next) => {
//   const value = req.query.data;
//   await userModel
//     .find({
//       $or: [
//         { name: { $regex: new RegExp(value), $options: "i" } },
//         { email: { $regex: new RegExp(value), $options: "i" } },
//       ],
//     })
//     .then((user) => res.status(200).json({user}))
//     .catch((e) => res.status(500).json({e}));
// };
const toggle = async (req, res) => {
  try {
    await userModel.findOneAndUpdate({ _id: req.params.userId }, req.body);
    if (req.body.open)
      return res
        .status(200)
        .json({ status: true, message: "Tài khoản đã được mở" });
    else
      return res
        .status(200)
        .json({ status: false, message: "Tài khoản đã khóa" });
  } catch (err) {
    return res.status(500).json({ err: err });
  }
};
module.exports = {
  signIn,
  signUp,
  create,
  update,
  checkUser,
  getAllUser,
  getAllAdmin,
  getOne,
  deleteOne,
  // search,
  toggle,
};
