const UsersService = require('../services/usersService');
const jwt = require("jsonwebtoken");//ver si implementar
const authenticationService = require("../services/authService");
const bycrypt = require("bcrypt");

class UsersController {

  async getUsers(req, res) {
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
}

async getUserById(req, res) {
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
}

async getUsersNotifications(req, res) {
  try {
    const notifications = await UsersService.getUsersNotifications();
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
}

async createUser(req, res) {
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
}

async updateUser(req, res) {
  const { id } = req.params;
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    await UsersService.updateUser(req.body, Number(id));
    const user = await UsersService.getUserById(Number(id));

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
}

async login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UsersService.getUserByEmail(email);
    
    if (!user) {
      return res.status(401).json({
        method: "login",
        message: "Unauthorized. Invalid email or password",
      });
    }

    // Comparar la contraseña usando bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        method: "login",
        message: "Unauthorized. Invalid email or password",
      });
    }

    // Generar token JWT
    const token = jwt.sign(user.toJSON(), process.env.PRIVATE_KEY, {
      expiresIn: '1d',
    });

    return res.status(200).json({
      method: "login",
      message: "Login successful",
      token: token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "login",
      message: "Internal Server Error",
    });
  }
}
}

module.exports = new UsersController();