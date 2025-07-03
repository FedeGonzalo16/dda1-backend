//Con Mongo
const User = require("../db/models/User"); // Ver que User sea un modelo Mongoose válido

const getUsers = async () => {
    return await User.find();
};

const getUserById = async (id) => {
    return await User.findById(id).populate({
      path: 'favorites',
      populate: {
        path: 'author',
        select: 'name', // o 'name', depende cómo se llame en tu modelo
      }
    });;
};

const getUsersNotifications = async (id) => {
    const user = await User.findById(id);
    return user.notifications || []; // Retorna un array vacío si no hay notificaciones
};

const updateUser = async (user, id) => {
    return await User.findByIdAndUpdate(id, user, { new: true }); 
};

const login = async (email, password) => {
    return await User.findOne({
        email: email,
        password: password, //encriptar y comparar contraseñas
  });
};

const createUser = async (user) => {
    return await User.create(user); // Mongoose maneja automáticamente la inserción
};

const getUserByEmail = async (email) => {
    return await User.findOne({ email: email }).populate('favorites');
};

const addFavorite = async (userId, recipeId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('Usuario no encontrado');

  if (!user.favorites.includes(recipeId)) {
    user.favorites.push(recipeId);
    await user.save();
  }

  return user;
};

const removeFavorite = async (userId, recipeId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('Usuario no encontrado');

  user.favorites = user.favorites.filter(
    (favId) => favId.toString() !== recipeId
  );
  await user.save();

  return user;
};

const getFavorites = async (userId) => {
    const user = await User.findById(userId)
    .populate({
      path: 'favorites',
      populate: {
        path: 'author'
      }
    });
  if (!user) throw new Error('Usuario no encontrado');

  return user.favorites;
};

module.exports = {
    getUsers,
    getUserById,
    getUsersNotifications,
    login,
    createUser,
    updateUser,
    getUserByEmail,
    addFavorite,
    removeFavorite,
    getFavorites
};