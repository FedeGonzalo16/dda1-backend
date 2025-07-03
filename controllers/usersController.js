const UsersService = require('../services/usersService');
const Cloudinary = require('../services/cloudinary');

const getUsers = async (req, res) => {
  try {
    const users = await UsersService.getUsers();
    return res.status(200).json({ method: "getUsers", message: "Users retrieved successfully", users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ method: "getUsers", message: "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UsersService.getUserById(id);
    if (!user) return res.status(404).json({ method: "getUserById", message: "User not found" });
    return res.status(200).json({ method: "getUserById", message: "User details retrieved successfully", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ method: "getUserById", message: "Internal Server Error" });
  }
};

const getUsersNotifications = async (req, res) => {
  try {
    const { id } = req.params;
    const notifications = await UsersService.getUsersNotifications(id);
    return res.status(200).json({ method: "getUsersNotifications", message: "Notifications retrieved successfully", notifications });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ method: "getUsersNotifications", message: "Internal Server Error" });
  }
};

const createUser = async (req, res) => {
  try {
    const existingUser = await UsersService.getUserByEmail(req.body.email);
    if (existingUser) return res.status(400).json({ method: "createUser", message: "User already exists with this email" });

    let imgUrl = null;
    if (req.file) {
      const fileBuffer = req.file.buffer;
      imgUrl = await Cloudinary.uploadImage(fileBuffer);
    }

    const newUser = await UsersService.createUser({ ...req.body, imgUrl });
    return res.status(201).json({ method: "createUser", message: "User created successfully", user: newUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ method: "createUser", message: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const updateData = { name: req.body.username, email: req.body.email };
    if (req.file) {
      const fileBuffer = req.file.buffer;
      updateData.imgUrl = await Cloudinary.uploadImage(fileBuffer);
    }

    await UsersService.updateUser(updateData, id);
    const user = await UsersService.getUserById(id);
    if (!user) return res.status(404).json({ method: "updateUser", message: "User not found" });

    return res.status(200).json({ method: "updateUser", message: "User updated successfully", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ method: "updateUser", message: "Internal Server Error" });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await UsersService.getUserByEmail(email);
    if (!user) return res.status(404).json({ method: "getUserByEmail", message: "User not found" });
    return res.status(200).json({ method: "getUserByEmail", message: "User details retrieved successfully", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ method: "getUserByEmail", message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UsersService.login(email, password);
    if (!user) return res.status(401).json({ method: "login", message: "Unauthorized. Invalid email or password" });
    return res.status(200).json({ method: "login", message: "Login successful", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ method: "login", message: "Internal Server Error" });
  }
};

const addFavorite = async (req, res) => {
  const { userId, recipeId } = req.body;
  try {
    await UsersService.addFavorite(userId, recipeId);
    res.status(200).json({ message: 'Receta guardada en favoritos' });
  } catch (err) {
    console.error('Error al agregar favorito:', err);
    res.status(500).json({ message: err.message });
  }
};

const removeFavorite = async (req, res) => {
  const { recipeId, userId } = req.body;
  try {
    await UsersService.removeFavorite(userId, recipeId);
    res.status(200).json({ message: 'Receta eliminada de favoritos' });
  } catch (err) {
    console.error('Error al quitar favorito:', err);
    res.status(500).json({ message: err.message });
  }
};

const getFavorites = async (req, res) => {
  const { id: userId } = req.params;
  try {
    const favorites = await UsersService.getFavorites(userId);
    res.status(200).json({ favorites });
  } catch (err) {
    console.error('Error al obtener favoritos:', err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  getUsersNotifications,
  createUser,
  updateUser,
  login,
  getUserByEmail,
  addFavorite,
  removeFavorite,
  getFavorites
};
