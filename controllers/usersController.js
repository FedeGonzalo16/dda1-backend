const UsersService = require('../services/usersService');
const authenticationService = require("../services/authService");

const getUsers = async (req, res) => {
  try {
    const users = await UsersService.getUsers();
    return res.status(200).json({
      method: "getUsers",
      message: "Users retrieved successfully",
      users: users,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "getUsers",
      message: "Internal Server Error",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UsersService.getUserById(id);

    if (!user) {
      return res.status(404).json({
        method: "getUserById",
        message: "User not found",
      });
    }

    return res.status(200).json({
      method: "getUserById",
      message: "User details retrieved successfully",
      user: user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "getUserById",
      message: "Internal Server Error",
    });
  }
};

const getUsersNotifications = async (req, res) => {
  try {
    const { id } = req.params;
    const notifications = await UsersService.getUsersNotifications(id);
    return res.status(200).json({
      method: "getUsersNotifications",
      message: "Notifications retrieved successfully",
      notifications: notifications,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "getUsersNotifications",
      message: "Internal Server Error",
    });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await UsersService.createUser(req.body);
    return res.status(201).json({
      method: "createUser",
      message: "User created successfully",
      user: newUser,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "createUser",
      message: "Internal Server Error",
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    await UsersService.updateUser(req.body, id);
    const user = await UsersService.getUserById(id);

    if (!user) {
      return res.status(404).json({
        method: "updateUser",
        message: "User not found",
      });
    }

    return res.status(200).json({
      method: "updateUser",
      message: "User updated successfully",
      user: user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "updateUser",
      message: "Internal Server Error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UsersService.getUserByEmail(email);
    
    if (!user) {
      return res.status(401).json({
        method: "login",
        message: "Unauthorized. Invalid email or password",
      });
    }
    if (password != user.password) {
      return res.status(401).json({
        method: "login",
        message: "Unauthorized. Invalid email or password",
      });
    }

    return res.status(200).json({
      method: "login",
      message: "Login successful"
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "login",
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  getUsersNotifications,
  createUser,
  updateUser,
  login,
};
