const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return res.json({ msg: "Email already exists", status: false });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const savedUser = await User.create({
    username: username,
    email: email,
    password: hashedPassword,
  });

  delete savedUser.password;
  return res.json(savedUser);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ msg: "Email is not registered", status: false });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.json({ msg: "Password does not match", status: false });
  }
  delete user.password;
  return res.json(user);
};

const allUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "_id",
      "email",
      "username",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports = { login, register, allUsers };
